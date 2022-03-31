import { Member as MemberDO } from '../../../domain/contexts/community/member';
import { MemberConverter, MemberDomainAdapter }from '../../../domain/infrastructure/persistance/adapters/member-domain-adapter';
import { MongoMemberRepository } from '../../../domain/infrastructure/persistance/repositories/mongo-member-repository';
import { Context } from '../../context';
import { MemberAccountAddInput, MemberAccountRemoveInput, MemberCreateInput, MemberProfileUpdateInput, MemberRoleReassignInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Member } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { CommunityConverter } from '../../../domain/infrastructure/persistance/adapters/community-domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';
import { RoleConverter } from '../../../domain/infrastructure/persistance/adapters/role-domain-adapter';
import { UserConverter } from '../../../domain/infrastructure/persistance/adapters/user-domain-adapter';
import { Interests } from '../../../domain/contexts/community/profile-value-objects';

type PropType = MemberDomainAdapter;
type DomainType = MemberDO<PropType>;
type RepoType = MongoMemberRepository<PropType>;

export class Members extends DomainDataSource<Context,Member,PropType,DomainType,RepoType> {

  async memberCreate(input: MemberCreateInput) : Promise<Member> {
    console.log(`memberCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:memberCreate');
    }
    
    let memberToReturn : Member;
    let community = await this.context.dataSources.communityApi.getCommunityById(input.community);
    let communityDo = new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let newMember = await repo.getNewInstance(
        input.name,
        communityDo);
      memberToReturn = new MemberConverter().toMongo(await repo.save(newMember));
    });
    return memberToReturn;
  }

  async memberRoleReassign(input: MemberRoleReassignInput) : Promise<Member> {
    let memberToReturn : Member;
    let mongoRole = await this.context.dataSources.roleApi.findOneById(input.newRole);
    let roleDo = new RoleConverter().toDomain(mongoRole,{passport:ReadOnlyPassport.GetInstance()});
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      member.requestSetRole(roleDo);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberAccountAdd(input: MemberAccountAddInput) : Promise<Member> {
    let memberToReturn : Member;
    let mongoUser = await this.context.dataSources.userApi.findOneById(input.account.user);
    let userDo = new UserConverter().toDomain(mongoUser,{passport:ReadOnlyPassport.GetInstance()});
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let account = member.requestNewAccount();
      account.requestSetUser(userDo);
      account.requestSetFirstName(input.account.firstName);
      account.requestSetLastName(input.account.lastName);
      account.requestSetCreatedBy(userDo);
    //  member.requestAddAccount(account.props); // don't like this
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }
  
  async memberAccountRemove(input: MemberAccountRemoveInput) : Promise<Member> {
    let memberToReturn : Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let accountRef = member.accounts.find(a => a.id === input.accountId);
      member.requestRemoveAccount(accountRef.props);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }

  async memberProfileUpdate(input: MemberProfileUpdateInput) : Promise<Member> {
    let memberToReturn : Member;
    await this.withTransaction(async (repo) => {
      let member = await repo.getById(input.memberId);
      let profile = member.profile;
      profile.requestSetName(input.profile.name);
      profile.requestSetEmail(input.profile.email);
      profile.requestSetBio(input.profile.bio);
      profile.requestSetInterests(new Interests(input.profile.interests));
      profile.requestSetShowInterests(input.profile.showInterests);
      profile.requestSetShowEmail(input.profile.showEmail);
      profile.requestSetShowLocation(input.profile.showLocation);
      profile.requestSetShowProfile(input.profile.showProfile);
      profile.requestSetShowProperties(input.profile.showProperties);
      memberToReturn = new MemberConverter().toMongo(await repo.save(member));
    });
    return memberToReturn;
  }

  

  
}