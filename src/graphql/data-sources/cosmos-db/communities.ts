import { GraphqlContext } from '../../graphql-context';
import { CommunityDataStructure } from '../../../app/application-services/datastore';
import { DataSource } from '../data-source';

export class Communities extends DataSource<GraphqlContext> {

  async getCurrentCommunity(): Promise<CommunityDataStructure> {
    return this.context.applicationServices.communityDatastoreApi.getCurrentCommunity();
  }
  async getCommunityById(id: string): Promise<CommunityDataStructure> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityById(id);
  }
  async getCommunityByHandle(handle: string): Promise<CommunityDataStructure> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityByHandle(handle);
  }
  async getCommunityByDomain(domain: string): Promise<CommunityDataStructure> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityByDomain(domain);
  }
  async getCommunityByHeader(header: string): Promise<CommunityDataStructure> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityByHeader(header);
  }
  async userIsAdmin(communityId: string): Promise<boolean> {
    return this.context.applicationServices.communityDatastoreApi.userIsAdmin(communityId);
  }
  async getCommunitiesForCurrentUser(): Promise<CommunityDataStructure[]> {
    return this.context.applicationServices.communityDatastoreApi.getCommunitiesForCurrentUser();
  }
}
