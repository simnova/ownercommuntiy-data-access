import { CommunityBlobStorageAPI, MemberBlobStorageAPI, PropertyBlobStorageAPI } from "./blob-storage"
import { PropertyCognitiveSearchAPI, ServiceTicketCognitiveSearchAPI } from "./cognitive-search";
import { CommunityDatastoreAPI, MemberDatastoreAPI, PropertyDatastoreAPI, RoleDatastoreAPI, ServiceDatastoreAPI, ServiceTicketDatastoreAPI, UserDatastoreAPI } from "./datastore";
import { CommunityDomainAPI, MemberDomainAPI, PropertyDomainAPI, RoleDomainAPI, ServiceDomainAPI, ServiceTicketDomainAPI, UserDomainAPI } from "./domain";
import { PropertyMapsAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";

export interface ApplicationServices {
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
}

export {
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
}