export interface MemberDatastoreApplicationService<TDataMember> {
  getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<TDataMember>;
  getMembers(): Promise<TDataMember[]>;
  getMembersByCommunityId(communityId: string): Promise<TDataMember[]>;
  getMembersAssignableToTickets(): Promise<TDataMember[]>;
  getMemberByIdWithCommunity(memberId: string): Promise<TDataMember>;
  getMemberById(memberId: string): Promise<TDataMember>;
  getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<TDataMember>;
}