import { GraphqlContext } from '../../graphql-context';
import { MemberDataStructure } from '../../../app/application-services/datastore';
import { DataSource } from '../data-source';

export class Members extends DataSource<GraphqlContext> {
  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<MemberDataStructure> {
    return this.context.applicationServices.memberDatastoreApi.getMemberByCommunityIdUserId(communityId, userId);
  }
  async getMembers(): Promise<MemberDataStructure[]> {
    return this.context.applicationServices.memberDatastoreApi.getMembers();
  }
  async getMembersByCommunityId(communityId: string): Promise<MemberDataStructure[]> {
    return this.context.applicationServices.memberDatastoreApi.getMembersByCommunityId(communityId);
  }
  async getMembersAssignableToTickets(): Promise<MemberDataStructure[]> {
    return this.context.applicationServices.memberDatastoreApi.getMembersAssignableToTickets();
  }
  async getMemberById(memberId: string): Promise<MemberDataStructure> {
    return this.context.applicationServices.memberDatastoreApi.getMemberById(memberId);
  }
}
