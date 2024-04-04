import { MemberModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';
import { Property, PropertyModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/property';
import { GraphqlContext } from '../../graphql-context';
import { Types } from 'mongoose';
import { CosmosDataSource } from './cosmos-data-source';

export class Properties extends CosmosDataSource<Property, GraphqlContext> {
  async getPropertiesByCommunityId(communityId: string): Promise<Property[]> {
    const result = await this.context.applicationServices.propertyDataApi.getPropertiesByCommunityId(communityId);
    return result.map((r) => PropertyModel.hydrate(r));
  }

  async getPropertiesByIds(propertyIds: string[]): Promise<Property[]> {
    const result = await this.context.applicationServices.propertyDataApi.getPropertiesByIds(propertyIds);
    return result.map((r) => PropertyModel.hydrate(r));
  }

  async getAllProperties(): Promise<Property[]> {
    const result = await this.context.applicationServices.propertyDataApi.getAllProperties();
    return result.map((r) => PropertyModel.hydrate(r));
  }

  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<Property[]> {
    const result = await this.context.applicationServices.propertyDataApi.getPropertiesForCurrentUserByCommunityId(communityId, userId);
    return result.map((r) => PropertyModel.hydrate(r));
  }
}
