import { FindQueries } from "./_base";

export interface MemberDatastoreInfrastructureService<TDataMember> extends FindQueries<TDataMember> {
  getMembersAssignableToTickets(communityId: string): Promise<TDataMember[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<TDataMember>;
  getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<TDataMember>;
}