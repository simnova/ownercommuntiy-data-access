import { UserUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/user.uow';
import { MongoCommunityUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/role.mongo-uow';
import { PropertyUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/property.uow';
import { ServiceUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/service.uow';
import { ServiceTicketUnitOfWork } from '../../../domain-services-impl/datastore-mongodb/service-ticket.uow';

import { Users } from './users';
import { Communities } from './communities';
import { Members } from './members';
import { Roles } from './roles';
import { Properties } from './properties';
import { Services } from './services';
import { ServiceTickets } from './service-tickets';

export {
  Users as UserDomainAPI,
  UserUnitOfWork,
  Communities as CommunityDomainAPI,
  MongoCommunityUnitOfWork as CommunityUnitOfWork,
  Members as MemberDomainAPI,
  MongoMemberUnitOfWork as MemberUnitOfWork,
  Roles as RoleDomainAPI,
  MongoRoleUnitOfWork as RoleUnitOfWork,
  Properties as PropertyDomainAPI,
  PropertyUnitOfWork,
  Services as ServiceDomainAPI,
  ServiceUnitOfWork,
  ServiceTickets as ServiceTicketDomainAPI,
  ServiceTicketUnitOfWork
}