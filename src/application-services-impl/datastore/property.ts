import { AppContext } from '../../app/app-context-builder';
import { PropertyDatastoreApplicationService } from '../../app/application-services/datastore/property.interface';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class PropertyDatastoreApplicationServiceImpl<TData>
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements PropertyDatastoreApplicationService<TData>
{

  async getPropertiesByCommunityId(communityId: string): Promise<TData[]> {
    let propertyToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.findByFields({ community: communityId });
    });
    return propertyToReturn;
  }

  async getPropertiesByIds(propertyIds: string[]): Promise<TData[]> {
    let propertyToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.findManyByIds(propertyIds);
    });
    return propertyToReturn;
  }

  async getAllProperties(): Promise<TData[]> {
    let propertyToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.getAll();
    });
    return propertyToReturn;
  }

  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<TData[]> {
    let propertyToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.getPropertiesByCommunityIdUserId(communityId, userId);
    });
    return propertyToReturn;
  }
  
  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<TData> {
    let propertyToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.getPropertyByIdWithCommunityOwner(propertyId);
    });
    return propertyToReturn;
  }

  async getPropertyById(propertyId: string): Promise<TData> {
    let propertyToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      propertyToReturn = await datastore.propertyDatastore.findOneById(propertyId);
    });
    return propertyToReturn;
  }

}
