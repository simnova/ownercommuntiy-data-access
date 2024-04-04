// user
import { UserDatastoreApplicationService } from './user.interface';
// import { UserDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/user';
// community
import { CommunityDatastoreApplicationService } from './community.interface';
// import { CommunityDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/community';
// member
import { MemberDatastoreApplicationService } from './member.interface';
// import { MemberDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/member';
// role
import { RoleDatastoreApplicationService } from './role.interface';
// import { RoleDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/role';
// property
import { PropertyDatastoreApplicationService } from './property.interface';
// import { PropertyDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/property';
// service
import { ServiceDatastoreApplicationService } from './service.interface';
// import { ServiceDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/service';
// service-ticket
import { ServiceTicketDatastoreApplicationService } from './service-ticket.interface';
// import { ServiceTicketDataStructure } from '../../../infrastructure-services-impl/datastore/data-structures/service-ticket';

export {
  UserDatastoreApplicationService as UserDatastoreAPI,
  // UserDataStructure,
  CommunityDatastoreApplicationService as CommunityDatastoreAPI,
  // CommunityDataStructure,
  MemberDatastoreApplicationService as MemberDatastoreAPI,
  // MemberDataStructure,
  RoleDatastoreApplicationService as RoleDatastoreAPI,
  // RoleDataStructure,
  PropertyDatastoreApplicationService as PropertyDatastoreAPI,
  // PropertyDataStructure,
  ServiceDatastoreApplicationService as ServiceDatastoreAPI,
  // ServiceDataStructure,
  ServiceTicketDatastoreApplicationService as ServiceTicketDatastoreAPI,
  // ServiceTicketDataStructure,
}