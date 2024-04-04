import { UserDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/user";

export interface UserDatastoreApplicationService {
  getUserById(userId : string): Promise<UserDataStructure>;
  getUserByExternalId(externalId : string): Promise<UserDataStructure>;
  getUsers(): Promise<UserDataStructure[]>;
}