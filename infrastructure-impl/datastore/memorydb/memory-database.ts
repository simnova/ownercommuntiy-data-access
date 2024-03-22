// core
import { EntityProps } from "../../../domain-seedwork/entity";
import { ExecutionContext } from "../../../domain-seedwork/execution-context";
import { MemoryUnitOfWork } from "../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryStore, ReadOnlyMemoryStore } from "../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
// community
import { Community, CommunityProps } from "../../../domain/contexts/community/community";
import { MemoryCommunityRepository } from "./infrastructure/community.memory-repository";
import { buildMemoryCommunityUnitOfWork } from "./infrastructure/community.memory-uow"
// user
import { User, UserProps } from "../../../domain/contexts/user/user";
import { MemoryUserRepository } from "./infrastructure/user.memory-repository";
import { buildMemoryUserUnitOfWork } from "./infrastructure/user.memory-uow";
// role
import { Role, RoleProps } from "../../../domain/contexts/community/role";
import { MemoryRoleRepository } from "./infrastructure/role.memory-repository";
import { buildMemoryRoleUnitOfWork } from "./infrastructure/role.memory-uow";

// member
import { Member, MemberProps } from "../../../domain/contexts/community/member";
import { MemoryMemberRepository } from "./infrastructure/member.memory-repository";
import { buildMemoryMemberUnitOfWork } from "./infrastructure/member.memory-uow";

// property
import { Property, PropertyProps } from "../../../domain/contexts/property/property";
import { MemoryPropertyRepository } from "./infrastructure/property.memory-repository";
import { buildMemoryPropertyUnitOfWork } from "./infrastructure/property.memory-uow";

// service
import { Service, ServiceProps } from "../../../domain/contexts/service-ticket/service";
import { MemoryServiceRepository } from "./infrastructure/service.memory-repository";
import { buildMemoryServiceUnitOfWork } from "./infrastructure/service.memory-uow";

// service-ticket
import { ServiceTicket, ServiceTicketProps } from "../../../domain/contexts/service-ticket/service-ticket";
import { MemoryServiceTicketRepository } from "./infrastructure/service-ticket.memory-repository";
import { buildMemoryServiceTicketUnitOfWork } from "./infrastructure/service-ticket.memory-uow";

export interface IMemoryDatabase {
  communityUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  communityMemoryStore: ReadOnlyMemoryStore<CommunityProps>;
  userUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  userMemoryStore: ReadOnlyMemoryStore<UserProps>;
  roleUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>>;
  roleMemoryStore: ReadOnlyMemoryStore<RoleProps>;
  memberUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  memberMemoryStore: ReadOnlyMemoryStore<MemberProps>;
  propertyUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  propertyMemoryStore: ReadOnlyMemoryStore<PropertyProps>;
  serviceUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>>;
  serviceMemoryStore: ReadOnlyMemoryStore<ServiceProps>;
  serviceTicketUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, ServiceTicket<ServiceTicketProps>, MemoryServiceTicketRepository<ServiceTicketProps, ServiceTicket<ServiceTicketProps>>>;
  serviceTicketMemoryStore: ReadOnlyMemoryStore<ServiceTicketProps>;
}


export class MemoryDatabase implements IMemoryDatabase{
  constructor() {}

  // community
  private _communityUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  private _communityMemoryStore: MemoryStore<CommunityProps>;
  public get communityUnitOfWork():  MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>{
    if(!this._communityUnitOfWork) {
      this._communityMemoryStore = new MemoryStore<CommunityProps>();
      this._communityUnitOfWork = buildMemoryCommunityUnitOfWork(this._communityMemoryStore);
    }
    return this._communityUnitOfWork;
  }
  public get communityMemoryStore(): ReadOnlyMemoryStore<CommunityProps> {
    return this._communityMemoryStore;
  }

  // user
  private _userUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  private _userMemoryStore: MemoryStore<UserProps>;
  public get userUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>> {
    if(!this._userUnitOfWork) {
      this._userMemoryStore = new MemoryStore<UserProps>();
      this._userUnitOfWork = buildMemoryUserUnitOfWork(this._userMemoryStore);
    }
    return this._userUnitOfWork;
  }
  public get userMemoryStore(): ReadOnlyMemoryStore<UserProps> {
    return this._userMemoryStore;
  }
  
  // role
  private _roleUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>>;
  private _roleMemoryStore: MemoryStore<RoleProps>;
  public get roleUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>> {
    if(!this._roleUnitOfWork) {
      this._roleMemoryStore = new MemoryStore<RoleProps>();
      this._roleUnitOfWork = buildMemoryRoleUnitOfWork(this._roleMemoryStore);
    }
    return this._roleUnitOfWork;
  }
  public get roleMemoryStore(): ReadOnlyMemoryStore<RoleProps> {
    return this._roleMemoryStore;
  }

  // member
  private _memberUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  private _memberMemoryStore: MemoryStore<MemberProps>;
  public get memberUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>> {
    if(!this._memberUnitOfWork) {
      this._memberMemoryStore = new MemoryStore<MemberProps>();
      this._memberUnitOfWork = buildMemoryMemberUnitOfWork(this._memberMemoryStore);
    }
    return this._memberUnitOfWork;
  }
  public get memberMemoryStore(): ReadOnlyMemoryStore<MemberProps> {
    return this._memberMemoryStore;
  }

  // property
  private _propertyUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  private _propertyMemoryStore: MemoryStore<PropertyProps>;
  public get propertyUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>> {
    if(!this._propertyUnitOfWork) {
      this._propertyMemoryStore = new MemoryStore<PropertyProps>();
      this._propertyUnitOfWork = buildMemoryPropertyUnitOfWork(this._propertyMemoryStore);
    }
    return this._propertyUnitOfWork;
  }
  public get propertyMemoryStore(): ReadOnlyMemoryStore<PropertyProps> {
    return this._propertyMemoryStore;
  }

  // service
  private _serviceUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>>;
  private _serviceMemoryStore: MemoryStore<ServiceProps>;
  public get serviceUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>> {
    if(!this._serviceUnitOfWork) {
      this._serviceMemoryStore = new MemoryStore<ServiceProps>();
      this._serviceUnitOfWork = buildMemoryServiceUnitOfWork(this._serviceMemoryStore);
    }
    return this._serviceUnitOfWork;
  }
  public get serviceMemoryStore(): ReadOnlyMemoryStore<ServiceProps> {
    return this._serviceMemoryStore;
  }

  // service-ticket
  private _serviceTicketUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, ServiceTicket<ServiceTicketProps>, MemoryServiceTicketRepository<ServiceTicketProps, ServiceTicket<ServiceTicketProps>>>;
  private _serviceTicketMemoryStore: MemoryStore<ServiceTicketProps>;
  public get serviceTicketUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, ServiceTicket<ServiceTicketProps>, MemoryServiceTicketRepository<ServiceTicketProps, ServiceTicket<ServiceTicketProps>>> {
    if(!this._serviceTicketUnitOfWork) {
      this._serviceTicketMemoryStore = new MemoryStore<ServiceTicketProps>();
      this._serviceTicketUnitOfWork = buildMemoryServiceTicketUnitOfWork(this._serviceTicketMemoryStore);
    }
    return this._serviceTicketUnitOfWork;
  }
  public get serviceTicketMemoryStore(): ReadOnlyMemoryStore<ServiceTicketProps> {
    return this._serviceTicketMemoryStore;
  }
}

