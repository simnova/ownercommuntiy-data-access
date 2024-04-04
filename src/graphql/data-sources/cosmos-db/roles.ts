/** @format */

import { GraphqlContext } from "../../graphql-context";
import { DataSource } from "../data-source";

export class Roles<TData> extends DataSource<GraphqlContext> {

  async getRoleById(id: string): Promise<TData> {
    const roles = await this.context.applicationServices.roleDatastoreApi.getRolesByCommunityId(this.context.community);
    return roles.find(role => role.id === id);
  }
  async getRoles(): Promise<TData[]> {
    return this.context.applicationServices.roleDatastoreApi.getRolesByCommunityId(this.context.community);
  }
  async getRolesByCommunityId(communityId: string): Promise<TData[]> {
    return this.context.applicationServices.roleDatastoreApi.getRolesByCommunityId(communityId);
  }
}
