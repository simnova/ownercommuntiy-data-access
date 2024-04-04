import { DatastoreDomain , DatastoreDomainInitializeable} from "../../domain/infrastructure/datastore/interfaces";
import { CommunityDatastoreInfrastructureService } from "./community";
import { MemberDatastoreInfrastructureService } from "./member";
import { PropertyDatastoreInfrastructureService } from "./property";
import { RoleDatastoreInfrastructureService } from "./role";
import { ServiceDatastoreInfrastructureService } from "./service";
import { ServiceTicketDatastoreInfrastructureService } from "./service-ticket";
import { UserDatastoreInfrastructureService } from "./user";

export {
  CommunityDatastoreInfrastructureService,
  MemberDatastoreInfrastructureService,
  PropertyDatastoreInfrastructureService,
  RoleDatastoreInfrastructureService,
  ServiceDatastoreInfrastructureService,
  ServiceTicketDatastoreInfrastructureService,
  UserDatastoreInfrastructureService,
}
export interface DatastoreInfrastructureService extends DatastoreDomain, DatastoreDomainInitializeable {
  communityDatastore<TDataCommunity>(): CommunityDatastoreInfrastructureService<TDataCommunity>;
  memberDatastore<TDataMember>(): MemberDatastoreInfrastructureService<TDataMember>;
  roleDatastore<TDataRole>(): RoleDatastoreInfrastructureService<TDataRole>;
  propertyDatastore<TDataProperty>(): PropertyDatastoreInfrastructureService<TDataProperty>;
  serviceDatastore<TDataService>(): ServiceDatastoreInfrastructureService<TDataService>;
  serviceTicketDatastore<TDataServiceTicket>(): ServiceTicketDatastoreInfrastructureService<TDataServiceTicket>;
  userDatastore<TDataUser>(): UserDatastoreInfrastructureService<TDataUser>;
}