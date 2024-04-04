import { FindQueries } from "./_base";

export interface PropertyDatastoreInfrastructureService<TDataProperty> extends FindQueries<TDataProperty> {
  getAll(): Promise<TDataProperty[]>;
  getPropertiesByCommunityIdUserId(communityId: string, userId: string): Promise<TDataProperty[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<TDataProperty>;
}