import { FindQueries } from "./_base";

export interface CommunityDatastoreInfrastructureService<TDataCommunity> extends FindQueries<TDataCommunity> {
  getCommunityByHeader(header: string): Promise<TDataCommunity>;
  isUserAdmin(communityId: string, externalId: string): Promise<boolean>;
  getCommunitiesForUser(externalId: string): Promise<TDataCommunity[]>;
}
