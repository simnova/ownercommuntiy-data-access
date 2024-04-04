import { AppContext } from '../../app/app-context-builder';
import { MemberDatastoreApplicationService } from '../../app/application-services/datastore/member.interface';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class MemberDatastoreApplicationServiceImpl<TData>
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements MemberDatastoreApplicationService<TData>
{

  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<TData> {
    let memberToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = (await datastore.memberDatastore().findByFields({ community: communityId, 'accounts.user': userId }))?.[0] as TData;
    });
    return memberToReturn;
  }

  async getMembers(): Promise<TData[]> {
    let memberToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore().findByFields({ community: this.context.communityId }) as TData[];
    });
    return memberToReturn;
  }

  async getMembersByCommunityId(communityId: string): Promise<TData[]> {
    let memberToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.findByFields({ community: communityId });
    });
    return memberToReturn;
  }

  async getMembersAssignableToTickets(): Promise<TData[]> {
    const communityId = this.context.communityId;
    let memberToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.getMembersAssignableToTickets(communityId);
    });
    return memberToReturn;
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<TData> {
    let memberToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.getMemberByIdWithCommunity(memberId);
    });
    return memberToReturn;
  }

  async getMemberById(memberId: string): Promise<TData> {
    let memberToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.findOneById(memberId);
    });
    return memberToReturn;
  }

  async getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<TData> {
    let memberToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.getMemberByCommunityAccountWithCommunityAccountRole(communityId, userId);
    });
    return memberToReturn;
  }
}
