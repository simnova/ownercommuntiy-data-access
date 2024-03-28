import { PropertyDataStructure } from "../../infrastructure-impl/datastore/data-structures/property";

export interface PropertyDatastoreApplicationService {
  getPropertiesByCommunityId(communityId: string): Promise<PropertyDataStructure[]>;
  getPropertiesByIds(propertyIds: string[]): Promise<PropertyDataStructure[]>;
  getAllProperties(): Promise<PropertyDataStructure[]>;
  getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyDataStructure[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyDataStructure>;
}