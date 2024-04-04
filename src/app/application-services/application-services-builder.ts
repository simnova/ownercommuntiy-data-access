import { CommunityBlobStorageAPI, MemberBlobStorageAPI, PropertyBlobStorageAPI } from "./blob-storage"
import { PropertyCognitiveSearchAPI, ServiceTicketCognitiveSearchAPI } from "./cognitive-search";
import { CommunityDatastoreAPI, MemberDatastoreAPI, PropertyDatastoreAPI, RoleDatastoreAPI, ServiceDatastoreAPI, ServiceTicketDatastoreAPI, UserDatastoreAPI } from "./datastore";
import { CommunityDomainAPI, MemberDomainAPI, PropertyDomainAPI, RoleDomainAPI, ServiceDomainAPI, ServiceTicketDomainAPI, UserDomainAPI } from "./domain";
import { PropertyMapsAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";

export interface ApplicationServices<
TDataCommunity,
TDataMember,
TDataProperty,
TDataRole,
TDataService,
TDataServiceTicket,
TDataUser,
> {
  communityBlobStorageApi: CommunityBlobStorageAPI<TDataCommunity, TDataRole>;
  memberBlobStorageApi: MemberBlobStorageAPI<TDataMember>;
  propertyBlobStorageApi: PropertyBlobStorageAPI<TDataProperty>;
  propertyCognitiveSearchApi: PropertyCognitiveSearchAPI;
  serviceTicketCognitiveSearchApi: ServiceTicketCognitiveSearchAPI;
  userDatastoreApi: UserDatastoreAPI<TDataUser>;
  roleDatastoreApi: RoleDatastoreAPI<TDataRole>;
  serviceDatastoreApi: ServiceDatastoreAPI<TDataService>;
  serviceTicketDatastoreApi: ServiceTicketDatastoreAPI<TDataServiceTicket>;
  memberDatastoreApi: MemberDatastoreAPI<TDataMember>;
  communityDatastoreApi: CommunityDatastoreAPI<TDataCommunity>;
  propertyDatastoreApi: PropertyDatastoreAPI<TDataProperty>;
  userDomainApi: UserDomainAPI;
  communityDomainApi: CommunityDomainAPI;
  memberDomainApi: MemberDomainAPI;
  roleDomainApi: RoleDomainAPI;
  propertyDomainApi: PropertyDomainAPI;
  serviceDomainApi: ServiceDomainAPI;
  serviceTicketDomainApi: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapsAPI;
  communityVercelApi: CommunityVercelAPI;
}


import { AppContext } from "../app-context-builder";


import { 
  CommunityBlobApiImpl,
  MemberBlobApiImpl,
  PropertyBlobApiImpl,
  PropertySearchApiImpl,
  ServiceTicketSearchApiImpl,
  UserDataApiImpl,
  RoleDataApiImpl,
  ServiceDataApiImpl,
  ServiceTicketDataApiImpl,
  MemberDataApiImpl,
  CommunityDataApiImpl,
  PropertyDataApiImpl,
  UserDomainApiImpl,
  CommunityDomainApiImpl,
  MemberDomainApiImpl,
  RoleDomainApiImpl,
  PropertyDomainApiImpl,
  ServiceDomainApiImpl,
  ServiceTicketDomainApiImpl,
  PropertyMapsApiImpl,
  CommunityVercelApiImpl,
 } from "../../application-services-impl";
import { UserUnitOfWork } from "../domain/contexts/user/user.uow";
import { CommunityUnitOfWork } from "../domain/contexts/community/community.uow";
import { MemberUnitOfWork } from "../domain/contexts/community/member.uow";
import { RoleUnitOfWork } from "../domain/contexts/community/role.uow";
import { PropertyUnitOfWork } from "../domain/contexts/property/property.uow";
import { ServiceUnitOfWork } from "../domain/contexts/service-ticket/service.uow";
import { ServiceTicketUnitOfWork } from "../domain/contexts/service-ticket/service-ticket.uow";

export class ApplicationServicesBuilder<
  TDataCommunity, TDataMember, TDataProperty, TDataRole, TDataService, TDataServiceTicket, TDataUser> 
  implements ApplicationServices<TDataCommunity, TDataMember, TDataProperty, TDataRole, TDataService, TDataServiceTicket, TDataUser>
{

  communityBlobStorageApi: CommunityBlobStorageAPI<TDataCommunity, TDataRole>;
  memberBlobStorageApi: MemberBlobStorageAPI<TDataMember>;
  propertyBlobStorageApi: PropertyBlobStorageAPI<TDataProperty>;
  propertyCognitiveSearchApi: PropertyCognitiveSearchAPI;
  serviceTicketCognitiveSearchApi: ServiceTicketCognitiveSearchAPI;
  userDatastoreApi: UserDatastoreAPI<TDataUser>;
  roleDatastoreApi: RoleDatastoreAPI<TDataRole>;
  serviceDatastoreApi: ServiceDatastoreAPI<TDataService>;
  serviceTicketDatastoreApi: ServiceTicketDatastoreAPI<TDataServiceTicket>;
  memberDatastoreApi: MemberDatastoreAPI<TDataMember>;
  communityDatastoreApi: CommunityDatastoreAPI<TDataCommunity>;
  propertyDatastoreApi: PropertyDatastoreAPI<TDataProperty>;
  userDomainApi: UserDomainAPI;
  communityDomainApi: CommunityDomainAPI;
  memberDomainApi: MemberDomainAPI;
  roleDomainApi: RoleDomainAPI;
  propertyDomainApi: PropertyDomainAPI;
  serviceDomainApi: ServiceDomainAPI;
  serviceTicketDomainApi: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapsAPI;
  communityVercelApi: CommunityVercelAPI;

  constructor(
    context: AppContext,
    communityUnitOfWork: CommunityUnitOfWork,
    memberUnitOfWork: MemberUnitOfWork,
    roleUnitOfWork: RoleUnitOfWork,
    propertyUnitOfWork: PropertyUnitOfWork,
    serviceUnitOfWork: ServiceUnitOfWork,
    serviceTicketUnitOfWork: ServiceTicketUnitOfWork,
    userUnitOfWork: UserUnitOfWork,
  ) {
    this.communityBlobStorageApi = new CommunityBlobApiImpl<TDataCommunity, TDataRole>({ context });
    this.memberBlobStorageApi = new MemberBlobApiImpl<TDataMember>({ context });
    this.propertyBlobStorageApi = new PropertyBlobApiImpl<TDataProperty>({ context });
    this.propertyCognitiveSearchApi = new PropertySearchApiImpl({ context });
    this.serviceTicketCognitiveSearchApi = new ServiceTicketSearchApiImpl({ context });
    this.userDatastoreApi = new UserDataApiImpl<TDataUser>({ context });
    this.roleDatastoreApi = new RoleDataApiImpl<TDataRole>({ context });
    this.serviceDatastoreApi = new ServiceDataApiImpl<TDataService>({ context });
    this.serviceTicketDatastoreApi = new ServiceTicketDataApiImpl<TDataServiceTicket>({ context });
    this.memberDatastoreApi = new MemberDataApiImpl<TDataMember>({ context });
    this.communityDatastoreApi = new CommunityDataApiImpl<TDataCommunity>({ context });
    this.propertyDatastoreApi = new PropertyDataApiImpl<TDataProperty>({ context });
    this.userDomainApi = new UserDomainApiImpl({unitOfWork: userUnitOfWork, context });
    this.communityDomainApi = new CommunityDomainApiImpl({ unitOfWork: communityUnitOfWork, context });
    this.memberDomainApi = new MemberDomainApiImpl({ unitOfWork: memberUnitOfWork,context });
    this.roleDomainApi = new RoleDomainApiImpl({ unitOfWork: roleUnitOfWork,context });
    this.propertyDomainApi = new PropertyDomainApiImpl({ unitOfWork: propertyUnitOfWork,context });
    this.serviceDomainApi = new ServiceDomainApiImpl({ unitOfWork: serviceUnitOfWork,context });
    this.serviceTicketDomainApi = new ServiceTicketDomainApiImpl({ unitOfWork: serviceTicketUnitOfWork,context });
    this.propertyMapApi = new PropertyMapsApiImpl({ context });
    this.communityVercelApi = new CommunityVercelApiImpl({ context });
  }
}