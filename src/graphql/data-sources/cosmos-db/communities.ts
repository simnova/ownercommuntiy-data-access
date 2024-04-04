import { Community, CommunityModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/community';
import { GraphqlContext } from '../../graphql-context';
import { CosmosDataSource } from './cosmos-data-source';

export class Communities extends CosmosDataSource<Community, GraphqlContext> {

  async getCurrentCommunity(): Promise<Community> {
    const result = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.community);
    return CommunityModel.hydrate(result);
  }
  async getCommunityById(id: string): Promise<Community> {
    const result = await this.context.applicationServices.communityDataApi.getCommunityById(id);
    return CommunityModel.hydrate(result);
  }
  async getCommunityByHandle(handle: string): Promise<Community> {
    const result = await this.context.applicationServices.communityDataApi.getCommunityByHandle(handle);
    return CommunityModel.hydrate(result);
  }
  async getCommunityByDomain(domain: string): Promise<Community> {
    const result = await this.context.applicationServices.communityDataApi.getCommunityByDomain(domain);
    return CommunityModel.hydrate(result);
  }
  async getCommunityByHeader(header: string): Promise<Community> {
    const result = await this.context.applicationServices.communityDataApi.getCommunityByHeader(header);
    return CommunityModel.hydrate(result);
  }
  async userIsAdmin(communityId: string): Promise<boolean> {
    const result = await this.context.applicationServices.communityDataApi.userIsAdmin(communityId);
    return result;
  }

  async getCommunitiesForCurrentUser(): Promise<Community[]> {
    const result = await this.context.applicationServices.communityDataApi.getCommunitiesForCurrentUser();
    return result.map((r) => CommunityModel.hydrate(r));
  }
}
