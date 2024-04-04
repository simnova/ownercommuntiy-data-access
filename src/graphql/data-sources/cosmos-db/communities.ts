import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class Communities<TData> extends DataSource<GraphqlContext> {

  async getCurrentCommunity(): Promise<TData> {
    return this.context.applicationServices.communityDatastoreApi.getCurrentCommunity();
  }
  async getCommunityById(id: string): Promise<TData> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityById(id);
  }
  async getCommunityByHandle(handle: string): Promise<TData> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityByHandle(handle);
  }
  async getCommunityByDomain(domain: string): Promise<TData> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityByDomain(domain);
  }
  async getCommunityByHeader(header: string): Promise<TData> {
    return this.context.applicationServices.communityDatastoreApi.getCommunityByHeader(header);
  }
  async userIsAdmin(communityId: string): Promise<boolean> {
    return this.context.applicationServices.communityDatastoreApi.userIsAdmin(communityId);
  }
  async getCommunitiesForCurrentUser(): Promise<TData[]> {
    return this.context.applicationServices.communityDatastoreApi.getCommunitiesForCurrentUser();
  }
}
