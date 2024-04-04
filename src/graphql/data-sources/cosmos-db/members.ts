import { Member, MemberModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';
import { GraphqlContext } from '../../graphql-context';
import { CosmosDataSource } from './cosmos-data-source';

export class Members extends CosmosDataSource<Member, GraphqlContext> {
  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<Member> {
    const result = await this.context.applicationServices.memberDataApi.getMemberByCommunityIdUserId(communityId, userId);
    return MemberModel.hydrate(result);
  }
  async getMembers(): Promise<Member[]> {
    const result = await this.context.applicationServices.memberDataApi.getMembers();
    return result.map((r) => MemberModel.hydrate(r));    
  }
  async getMembersByCommunityId(communityId: string): Promise<Member[]> {
    const result = await this.context.applicationServices.memberDataApi.getMembersByCommunityId(communityId);
    return result.map((r) => MemberModel.hydrate(r));
  }
  async getMembersAssignableToTickets(): Promise<Member[]> {
    const result = await this.context.applicationServices.memberDataApi.getMembersAssignableToTickets();
    return result.map((r) => MemberModel.hydrate(r));
  }
}
