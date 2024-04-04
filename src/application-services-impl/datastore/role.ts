/** @format */

import { RoleDatastoreApplicationService } from "../../app/application-services/datastore/role.interface";
import { AppContext } from '../../app/app-context-builder';
import { DatastoreApplicationServiceImpl } from "./_datastore.application-service";

export class RoleDatastoreApplicationServiceImpl<TData>
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements RoleDatastoreApplicationService<TData>
{

  async getRoleById(roleId: string): Promise<TData> {
    let roleToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = (await datastore.roleDatastore.findByFields({ id: roleId, community: this.context.communityId }))?.[0];
    });
    return roleToReturn;
  }

  async getRoles(): Promise<TData[]> {
    let roleToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = await datastore.roleDatastore.findByFields({ community: this.context.communityId });
    });
    return roleToReturn;
  }

  async getRolesByCommunityId(communityId: string): Promise<TData[]> {
    let roleToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = await datastore.roleDatastore.findByFields({ community: communityId });
    });
    return roleToReturn;
  }
}
