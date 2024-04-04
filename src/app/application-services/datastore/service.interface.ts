export interface ServiceDatastoreApplicationService<TDataService> {
  getServiceById(id: string): Promise<TDataService>;
  getServices(): Promise<TDataService[]>;
  getServicesByCommunityId(communityId: string): Promise<TDataService[]>;
}