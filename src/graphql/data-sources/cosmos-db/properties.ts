import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';
import { PropertyDataStructure } from '../../../app/application-services/datastore';

export class Properties extends DataSource<GraphqlContext> {
  async getPropertiesByCommunityId(communityId: string): Promise<PropertyDataStructure[]> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertiesByCommunityId(communityId);
  }
  async getPropertiesByIds(propertyIds: string[]): Promise<PropertyDataStructure[]> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertiesByIds(propertyIds);
  }
  async getAllProperties(): Promise<PropertyDataStructure[]> {
    return this.context.applicationServices.propertyDatastoreApi.getAllProperties();
  }
  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyDataStructure[]> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertiesForCurrentUserByCommunityId(communityId, userId);
  }
  async getPropertyById(id: string): Promise<PropertyDataStructure> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertyById(id);
  }
  async getPropertyByIdWithCommunityOwner(id: string): Promise<PropertyDataStructure> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertyByIdWithCommunityOwner(id);
  }
}
