export interface UserDatastoreApplicationService<TDataUser> {
  getUserById(userId : string): Promise<TDataUser>;
  getByExternalId(externalId : string): Promise<TDataUser>;
  getUsers(): Promise<TDataUser[]>;
}