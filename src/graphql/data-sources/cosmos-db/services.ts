import { GraphqlContext } from "../../graphql-context";
import { DataSource } from "../data-source";

export class Services<TData> extends DataSource<GraphqlContext> {
  async getServiceById(id: string): Promise<TData> {
    return this.context.applicationServices.serviceDatastoreApi.getServiceById(id);
  }
  async getServices(): Promise<TData[]> {
    return this.context.applicationServices.serviceDatastoreApi.getServices();
  }
  async getServicesByCommunityId(communityId: string): Promise<TData[]> {
    return this.context.applicationServices.serviceDatastoreApi.getServicesByCommunityId(communityId);
  }
}
