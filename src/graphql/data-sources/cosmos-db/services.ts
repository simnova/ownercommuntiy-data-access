import { ServiceDataStructure } from "../../../app/application-services/datastore";
import { GraphqlContext } from "../../graphql-context";
import { DataSource } from "../data-source";

export class Services extends DataSource<GraphqlContext> {
  async getServiceById(id: string): Promise<ServiceDataStructure> {
    return this.context.applicationServices.serviceDatastoreApi.getServiceById(id);
  }
  async getServices(): Promise<ServiceDataStructure[]> {
    return this.context.applicationServices.serviceDatastoreApi.getServices();
  }
  async getServicesByCommunityId(communityId: string): Promise<ServiceDataStructure[]> {
    return this.context.applicationServices.serviceDatastoreApi.getServicesByCommunityId(communityId);
  }
}
