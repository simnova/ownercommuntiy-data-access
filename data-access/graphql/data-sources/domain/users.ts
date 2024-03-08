import { User as UserDO } from '../../../domain/contexts/user/user';
import { UserConverter, UserDomainAdapter }from '../../../domain/infrastructure/persistence/user.domain-adapter';
import { MongoUserRepository } from '../../../domain/infrastructure/persistence/user.mongo-repository';
import { Context } from '../../context';
import { UserUpdateInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { User } from '../../../infrastructure/data-sources/cosmos-db/models/user';

type PropType = UserDomainAdapter;
type DomainType = UserDO<PropType>;
type RepoType = MongoUserRepository<PropType>;

export class Users extends DomainDataSource<Context,User,PropType,DomainType,RepoType> {

  

  async updateUser(user: UserUpdateInput) : Promise<User> {
    if(!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result : User;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(user.id);
      if(!domainObject || domainObject.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      domainObject.setFirstName(user.firstName);
      domainObject.setLastName(user.lastName);
      result = (new UserConverter()).toMongo(await repo.save(domainObject));
    });
    return result;
  }
  

  async addUser() : Promise<User> {
    console.log(`addUser`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized 99');
    }
    
    let userExternalId = this.context.verifiedUser.verifiedJWT.sub;
    let userFirstName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT.email;

    let userToReturn : User;
    await this.withTransaction(async (repo) => {
      let userConverter = new UserConverter();
      let userExists = await repo.getByExternalId(userExternalId);
      if(userExists) {
        userToReturn = userConverter.toMongo(userExists);
      }else{
        let newUser = await repo.getNewInstance(
          userExternalId,
          userFirstName,
          userLastName);
        if(userEmail) {
          newUser.setEmail(userEmail);
        }
        userToReturn = userConverter.toMongo(await repo.save(newUser));
      }
    });
    return userToReturn;
  }
  
}