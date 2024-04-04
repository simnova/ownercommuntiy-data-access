import { ServiceDatastoreApplicationService } from "../../app/application-services/datastore/service.interface";
import { AppContext } from '../../app/app-context-builder';
import { DatastoreApplicationServiceImpl } from "./_datastore.application-service";

export class ServiceDatastoreApplicationServiceImpl<TData>
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements ServiceDatastoreApplicationService<TData>
{
  async getServiceById(id: string): Promise<TData> {
    let serviceToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = (await datastore.serviceDatastore.findByFields({ id: id, community: this.context.communityId }))?.[0];
    });
    return serviceToReturn;
  }

  async getServices(): Promise<TData[]> {
    let serviceToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = await datastore.serviceDatastore.findByFields({ community: this.context.communityId });
    });
    return serviceToReturn;
  }

  async getServicesByCommunityId(communityId: string): Promise<TData[]> {
    let serviceToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = await datastore.serviceDatastore.findByFields({ community: communityId });
    });
    return serviceToReturn;
  }
}
