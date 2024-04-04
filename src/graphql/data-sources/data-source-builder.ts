import { GraphqlContext } from "../graphql-context";
import { CommunityBlobAPI, MemberBlobAPI, PropertyBlobAPI } from "./blob"
import { PropertySearchAPI, ServiceTicketsSearchAPI } from "./cognitive-search";
import { CommunityCosmosdbAPI, CommunityModel, MemberCosmosdbAPI, MemberModel, PropertyCosmosdbAPI, PropertyModel, RoleDatastoreDatasource, RoleModel, ServiceCosmosdbAPI, ServiceModel, ServiceTicketCosmosdbAPI, ServiceTicketModel, UserDatastoreDatasource, UserModel } from "./cosmos-db";
import { CommunityDomainAPI, CommunityUnitOfWork, MemberDomainAPI, MemberUnitOfWork, PropertyDomainAPI, PropertyUnitOfWork, RoleDomainAPI, RoleUnitOfWork, ServiceDomainAPI, ServiceTicketDomainAPI, ServiceTicketUnitOfWork, ServiceUnitOfWork, UserDomainAPI, UserUnitOfWork } from "./domain";
import { PropertyMapAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";
import { CommunityData, MemberData, RoleData, PropertyData, ServiceData, ServiceTicketData, UserData } from "../../startup/execution-types-builder";

export class DataSourceBuilder {
  communityBlobAPI: CommunityBlobAPI;
  memberBlobAPI: MemberBlobAPI;
  propertyBlobAPI: PropertyBlobAPI;
  propertySearchApi: PropertySearchAPI;
  serviceTicketsSearchApi: ServiceTicketsSearchAPI;
  userCosmosdbApi: UserDatastoreDatasource<UserData>;
  roleCosmosdbApi: RoleDatastoreDatasource<RoleData>;
  serviceCosmosdbApi: ServiceCosmosdbAPI<ServiceData>;
  serviceTicketCosmosdbApi: ServiceTicketCosmosdbAPI<ServiceTicketData>;
  memberCosmosdbApi: MemberCosmosdbAPI<MemberData>;
  communityCosmosdbApi: CommunityCosmosdbAPI<CommunityData>;
  propertyCosmosdbApi: PropertyCosmosdbAPI<PropertyData>;
  userDomainAPI: UserDomainAPI;
  communityDomainAPI: CommunityDomainAPI;
  memberDomainAPI: MemberDomainAPI;
  roleDomainAPI: RoleDomainAPI;
  propertyDomainAPI: PropertyDomainAPI;
  serviceDomainAPI: ServiceDomainAPI;
  serviceTicketDomainAPI: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapAPI;
  communityVercelApi: CommunityVercelAPI;

  constructor(context: GraphqlContext) {
    this.communityBlobAPI = new CommunityBlobAPI({ context });
    this.memberBlobAPI = new MemberBlobAPI({ context });
    this.propertyBlobAPI = new PropertyBlobAPI({ context });
    this.propertySearchApi = new PropertySearchAPI({ context });
    this.serviceTicketsSearchApi = new ServiceTicketsSearchAPI({ context });
    this.userCosmosdbApi = new UserDatastoreDatasource<UserData>({ context });//modelOrCollection: UserModel, 
    this.roleCosmosdbApi = new RoleDatastoreDatasource<RoleData>({ context });//modelOrCollection: RoleModel, 
    this.serviceCosmosdbApi = new ServiceCosmosdbAPI<ServiceData>({ context });//modelOrCollection: ServiceModel, 
    this.serviceTicketCosmosdbApi = new ServiceTicketCosmosdbAPI<ServiceTicketData>({ context });//modelOrCollection: ServiceTicketModel, 
    this.memberCosmosdbApi = new MemberCosmosdbAPI<MemberData>({ context });//modelOrCollection: MemberModel, 
    this.communityCosmosdbApi = new CommunityCosmosdbAPI<CommunityData>({  context });//modelOrCollection: CommunityModel,
    this.propertyCosmosdbApi = new PropertyCosmosdbAPI<PropertyData>({ context });//modelOrCollection: PropertyModel, 
    this.userDomainAPI = new UserDomainAPI({ unitOfWork: UserUnitOfWork, context });
    this.communityDomainAPI = new CommunityDomainAPI({ unitOfWork: CommunityUnitOfWork, context });
    this.memberDomainAPI = new MemberDomainAPI({ unitOfWork: MemberUnitOfWork, context });
    this.roleDomainAPI = new RoleDomainAPI({ unitOfWork: RoleUnitOfWork, context });
    this.propertyDomainAPI = new PropertyDomainAPI({ unitOfWork: PropertyUnitOfWork, context });
    this.serviceDomainAPI = new ServiceDomainAPI({ unitOfWork: ServiceUnitOfWork, context });
    this.serviceTicketDomainAPI = new ServiceTicketDomainAPI({ unitOfWork: ServiceTicketUnitOfWork, context });
    this.propertyMapApi = new PropertyMapAPI({ context });
    this.communityVercelApi = new CommunityVercelAPI({ context });
  }

}