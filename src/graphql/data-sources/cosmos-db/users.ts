import { UserDataStructure } from '../../../app/application-services/datastore';
import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class Users extends DataSource<GraphqlContext> {

  async getUserById(userId : string): Promise<UserDataStructure> {
    return this.context.applicationServices.userDatastoreApi.getUserById(userId);
  }
  async getByExternalId(externalId : string): Promise<UserDataStructure> {
    return this.context.applicationServices.userDatastoreApi.getByExternalId(externalId);
  }
  async getUsers(): Promise<UserDataStructure[]> {
    return this.context.applicationServices.userDatastoreApi.getUsers();
  }
}