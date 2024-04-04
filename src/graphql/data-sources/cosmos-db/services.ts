import { Service, ServiceModel } from "../../../infrastructure-services-impl/datastore/mongodb/models/service";
import { GraphqlContext } from "../../graphql-context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Services extends CosmosDataSource<Service, GraphqlContext> {
  async getServiceById(id: string): Promise<Service> {
    const result = await this.context.applicationServices.serviceDataApi.getServiceById(id);
    return ServiceModel.hydrate(result);
  }

  async getServices(): Promise<Service[]> {
    const result = await this.context.applicationServices.serviceDataApi.getServices();
    return result.map((r) => ServiceModel.hydrate(r));
  }

  async getServicesByCommunityId(communityId: string): Promise<Service[]> {
    const result = await this.context.applicationServices.serviceDataApi.getServicesByCommunityId(communityId);
    return result.map((r) => ServiceModel.hydrate(r));
  }
}
