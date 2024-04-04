export interface PropertyDatastoreApplicationService<TDataProperty> {
  getPropertiesByCommunityId(communityId: string): Promise<TDataProperty[]>;
  getPropertiesByIds(propertyIds: string[]): Promise<TDataProperty[]>;
  getAllProperties(): Promise<TDataProperty[]>;
  getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<TDataProperty[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<TDataProperty>;
  getPropertyById(propertyId: string): Promise<TDataProperty>;
}