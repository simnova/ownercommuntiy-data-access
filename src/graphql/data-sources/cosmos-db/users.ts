import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class Users<TData> extends DataSource<GraphqlContext> {

  async getUserById(userId : string): Promise<TData> {
    return this.context.applicationServices.userDatastoreApi.getUserById(userId);
  }
  async getByExternalId(externalId : string): Promise<TData> {
    return this.context.applicationServices.userDatastoreApi.getByExternalId(externalId);
  }
  async getUsers(): Promise<TData[]> {
    return this.context.applicationServices.userDatastoreApi.getUsers();
  }
}