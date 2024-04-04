import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class Properties<TData> extends DataSource<GraphqlContext> {
  async getPropertiesByCommunityId(communityId: string): Promise<TData[]> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertiesByCommunityId(communityId);
  }
  async getPropertiesByIds(propertyIds: string[]): Promise<TData[]> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertiesByIds(propertyIds);
  }
  async getAllProperties(): Promise<TData[]> {
    return this.context.applicationServices.propertyDatastoreApi.getAllProperties();
  }
  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<TData[]> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertiesForCurrentUserByCommunityId(communityId, userId);
  }
  async getPropertyById(id: string): Promise<TData> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertyById(id);
  }
  async getPropertyByIdWithCommunityOwner(id: string): Promise<TData> {
    return this.context.applicationServices.propertyDatastoreApi.getPropertyByIdWithCommunityOwner(id);
  }
}
