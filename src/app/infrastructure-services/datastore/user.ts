import { FindQueries } from "./_base";

export interface UserDatastoreInfrastructureService<TDataUser> extends FindQueries<TDataUser> {
  getAll(): Promise<TDataUser[]>;
}