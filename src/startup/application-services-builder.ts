import { ApplicationServices } from "../app/application-services";
import { AppContext } from "../app/app-context";
import {
  CommunityBlobStorageAPI,
  MemberBlobStorageAPI,
  PropertyBlobStorageAPI,
  PropertyCognitiveSearchAPI,
  ServiceTicketCognitiveSearchAPI,
  UserDatastoreAPI,
  RoleDatastoreAPI,
  ServiceDatastoreAPI,
  ServiceTicketDatastoreAPI,
  MemberDatastoreAPI,
  CommunityDatastoreAPI,
  PropertyDatastoreAPI,
  UserDomainAPI,
  CommunityDomainAPI,
  MemberDomainAPI,
  RoleDomainAPI,
  PropertyDomainAPI,
  ServiceDomainAPI,
  ServiceTicketDomainAPI,
  PropertyMapsAPI,
  CommunityVercelAPI
} from "../app/application-services";

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
 } from "../application-services-impl";
import { MongoUserUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/user.uow";
import { MongoCommunityUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/community.mongo-uow";
import { MongoMemberUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/member.mongo-uow";
import { MongoRoleUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/role.mongo-uow";
import { MongoPropertyUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/property.mongo-uow";
import { MongoServiceUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/service.uow";
import { MongoServiceTicketUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/service-ticket.uow";

export class ApplicationServicesBuilder implements ApplicationServices{
  communityBlobStorageApi: CommunityBlobStorageAPI;
  memberBlobStorageApi: MemberBlobStorageAPI;
  propertyBlobStorageApi: PropertyBlobStorageAPI;
  propertyCognitiveSearchApi: PropertyCognitiveSearchAPI;
  serviceTicketCognitiveSearchApi: ServiceTicketCognitiveSearchAPI;
  userDatastoreApi: UserDatastoreAPI;
  roleDatastoreApi: RoleDatastoreAPI;
  serviceDatastoreApi: ServiceDatastoreAPI;
  serviceTicketDatastoreApi: ServiceTicketDatastoreAPI;
  memberDatastoreApi: MemberDatastoreAPI;
  communityDatastoreApi: CommunityDatastoreAPI;
  propertyDatastoreApi: PropertyDatastoreAPI;
  userDomainApi: UserDomainAPI;
  communityDomainApi: CommunityDomainAPI;
  memberDomainApi: MemberDomainAPI;
  roleDomainApi: RoleDomainAPI;
  propertyDomainApi: PropertyDomainAPI;
  serviceDomainApi: ServiceDomainAPI;
  serviceTicketDomainApi: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapsAPI;
  communityVercelApi: CommunityVercelAPI;

  constructor(context: AppContext) {
    this.communityBlobStorageApi = new CommunityBlobApiImpl({ context });
    this.memberBlobStorageApi = new MemberBlobApiImpl({ context });
    this.propertyBlobStorageApi = new PropertyBlobApiImpl({ context });
    this.propertyCognitiveSearchApi = new PropertySearchApiImpl({ context });
    this.serviceTicketCognitiveSearchApi = new ServiceTicketSearchApiImpl({ context });
    this.userDatastoreApi = new UserDataApiImpl({ context });
    this.roleDatastoreApi = new RoleDataApiImpl({ context });
    this.serviceDatastoreApi = new ServiceDataApiImpl({ context });
    this.serviceTicketDatastoreApi = new ServiceTicketDataApiImpl({ context });
    this.memberDatastoreApi = new MemberDataApiImpl({ context });
    this.communityDatastoreApi = new CommunityDataApiImpl({ context });
    this.propertyDatastoreApi = new PropertyDataApiImpl({ context });
    this.userDomainApi = new UserDomainApiImpl({unitOfWork: MongoUserUnitOfWork, context });
    this.communityDomainApi = new CommunityDomainApiImpl({ unitOfWork: MongoCommunityUnitOfWork, context });
    this.memberDomainApi = new MemberDomainApiImpl({ unitOfWork: MongoMemberUnitOfWork,context });
    this.roleDomainApi = new RoleDomainApiImpl({ unitOfWork: MongoRoleUnitOfWork,context });
    this.propertyDomainApi = new PropertyDomainApiImpl({ unitOfWork: MongoPropertyUnitOfWork,context });
    this.serviceDomainApi = new ServiceDomainApiImpl({ unitOfWork: MongoServiceUnitOfWork,context });
    this.serviceTicketDomainApi = new ServiceTicketDomainApiImpl({ unitOfWork: MongoServiceTicketUnitOfWork,context });
    this.propertyMapApi = new PropertyMapsApiImpl({ context });
    this.communityVercelApi = new CommunityVercelApiImpl({ context });
  }

}