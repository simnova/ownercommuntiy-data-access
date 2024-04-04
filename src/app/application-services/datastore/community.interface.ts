export interface CommunityDatastoreApplicationService<TDataCommunity> {
    getCurrentCommunity(): Promise<TDataCommunity>;
    getCommunityById(communityId: string): Promise<TDataCommunity>;
    getCommunityByHandle(handle: string): Promise<TDataCommunity>;
    getCommunityByDomain(domain: string): Promise<TDataCommunity>;
    getCommunityByHeader(header: string): Promise<TDataCommunity>;
    userIsAdmin(communityId: string): Promise<boolean>;
    getCommunitiesForCurrentUser(): Promise<TDataCommunity[]>;
}
