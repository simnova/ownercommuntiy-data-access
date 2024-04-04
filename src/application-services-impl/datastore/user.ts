import { UserDatastoreApplicationService } from '../../app/application-services/datastore/user.interface';
import { AppContext } from '../../app/app-context-builder';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class UserDatastoreApplicationServiceImpl<TData>
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements UserDatastoreApplicationService<TData>
{
  
  async getUserById(userId : string): Promise<TData> {
    let userToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      userToReturn = await datastore.userDatastore.findOneById(userId);
    });
    return userToReturn;
  }

  async getByExternalId(externalId : string): Promise<TData> {
    let userToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      userToReturn = (await datastore.userDatastore.findByFields({externalId: externalId}))?.[0];
    });
    return userToReturn;
  }

  async getUsers(): Promise<TData[]> {
    let userToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      userToReturn = await datastore.userDatastore.getAll();
    });
    return userToReturn;
  }
  
}