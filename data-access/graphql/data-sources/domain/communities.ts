import { Community as CommunityDO } from '../../../domain/contexts/community/community';
import { CommunityConverter, CommunityDomainAdapter }from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { MongoCommunityRepository } from '../../../domain/infrastructure/persistence/community.mongo-repository';
import { Context } from '../../context';
import { CommunityCreateInput, CommunityUpdateInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Community } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { UserConverter } from '../../../domain/infrastructure/persistence/user.domain-adapter';
import { ReadOnlyContext } from '../../../domain/infrastructure/execution-context';

type PropType = CommunityDomainAdapter;
type DomainType = CommunityDO<PropType>;
type RepoType = MongoCommunityRepository<PropType>;

export class Communities extends DomainDataSource<Context,Community,PropType,DomainType,RepoType> {

  async communityCreate(input: CommunityCreateInput) : Promise<Community> {
    console.log(`communityCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:communityCreate');
    }
    let mongoUser = await this.context.dataSources.userCosmosdbApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let userDo = new UserConverter().toDomain(mongoUser,ReadOnlyContext());

    let communityToReturn : Community;
    await this.withTransaction(async (repo) => {
      let newCommunity = await repo.getNewInstance(
        input.name,
        userDo);
      communityToReturn = new CommunityConverter().toMongo(await repo.save(newCommunity));
    });
    return communityToReturn;
  }

  async communityUpdate(community: CommunityUpdateInput) : Promise<Community> {
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result : Community;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(community.id);
      if(!domainObject) {
        throw new Error('invalid id');
      }
      domainObject.Name=(community.name);
      domainObject.Domain=(community.domain);
      domainObject.WhiteLabelDomain=(community.whiteLabelDomain);
      domainObject.Handle=(community.handle);
      result = (new CommunityConverter()).toMongo(await repo.save(domainObject));
    });
    return result;
  }
  
}