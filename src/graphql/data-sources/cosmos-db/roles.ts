/** @format */

import { RoleDataStructure } from "../../../app/application-services/datastore";
import { GraphqlContext } from "../../graphql-context";
import { DataSource } from "../data-source";

export class Roles extends DataSource<GraphqlContext> {

  async getRoleById(id: string): Promise<RoleDataStructure> {
    const roles = await this.context.applicationServices.roleDatastoreApi.getRolesByCommunityId(this.context.community);
    return roles.find(role => role.id === id);
  }
  async getRoles(): Promise<RoleDataStructure[]> {
    return this.context.applicationServices.roleDatastoreApi.getRolesByCommunityId(this.context.community);
  }
  async getRolesByCommunityId(communityId: string): Promise<RoleDataStructure[]> {
    return this.context.applicationServices.roleDatastoreApi.getRolesByCommunityId(communityId);
  }
}
