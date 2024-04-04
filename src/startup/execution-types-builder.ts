import { Community } from "../infrastructure-services-impl/datastore/mongodb/models/community";
import { Member } from "../infrastructure-services-impl/datastore/mongodb/models/member";
import { Role } from "../infrastructure-services-impl/datastore/mongodb/models/role";
import { Property } from "../infrastructure-services-impl/datastore/mongodb/models/property";
import { Service } from "../infrastructure-services-impl/datastore/mongodb/models/service";
import { ServiceTicket } from "../infrastructure-services-impl/datastore/mongodb/models/service-ticket";
import { User } from "../infrastructure-services-impl/datastore/mongodb/models/user";

export type CommunityData = Community
export type MemberData = Member
export type RoleData = Role
export type PropertyData = Property
export type ServiceData = Service
export type ServiceTicketData = ServiceTicket
export type UserData = User