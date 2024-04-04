/** @format */

import { Role, RoleModel } from "../../../infrastructure-services-impl/datastore/mongodb/models/role";
import { GraphqlContext } from "../../graphql-context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Roles extends CosmosDataSource<Role, GraphqlContext> {

  async getRoleById(id: string): Promise<Role> {
    const result = await this.context.applicationServices.roleDataApi.getRoleById(id);
    return RoleModel.hydrate(result);
  }

  async getRoles(): Promise<Role[]> {
    const result = await this.context.applicationServices.roleDataApi.getRoles();
    return result.map((r) => RoleModel.hydrate(r));
  }

  async getRolesByCommunityId(communityId: string): Promise<Role[]> {
    const result = await this.context.applicationServices.roleDataApi.getRolesByCommunityId(communityId);
    return result.map((r) => RoleModel.hydrate(r));
  }
}
