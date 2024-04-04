import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class Members<TData> extends DataSource<GraphqlContext> {
  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<TData> {
    return this.context.applicationServices.memberDatastoreApi.getMemberByCommunityIdUserId(communityId, userId);
  }
  async getMembers(): Promise<TData[]> {
    return this.context.applicationServices.memberDatastoreApi.getMembers();
  }
  async getMembersByCommunityId(communityId: string): Promise<TData[]> {
    return this.context.applicationServices.memberDatastoreApi.getMembersByCommunityId(communityId);
  }
  async getMembersAssignableToTickets(): Promise<TData[]> {
    return this.context.applicationServices.memberDatastoreApi.getMembersAssignableToTickets();
  }
  async getMemberById(memberId: string): Promise<TData> {
    return this.context.applicationServices.memberDatastoreApi.getMemberById(memberId);
  }
}
