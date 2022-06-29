import { Entity, EntityProps } from '../../shared/entity';
import { Community, CommunityProps, CommunityEntityReference } from '../community/community';
import { Property, PropertyEntityReference,PropertyProps } from '../property/property';
import { MemberEntityReference, Member, MemberProps } from '../community/member';
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from '../context';
import * as ActivityDetailValueObjects from './activity-detail-value-objects';
import * as ValueObjects from './service-ticket-value-objects';
import { PropArray, VariableTypePropArray } from '../../shared/prop-array';
import { ActivityDetail, ActivityDetailEntityReference, ActivityDetailProps } from './activity-detail';
import { Photo, PhotoEntityReference, PhotoProps } from './photo';
import { ServiceTicketVisa } from '../iam/service-ticket-visa';
import { RequestEntityReference } from './request';
import { HVACMaintenanceEntityReference, HVACMaintenanceProps } from './hvac-maintenance';
import { ApplianceMaintenance, ApplianceMaintenanceEntityReference, ApplianceMaintenanceProps } from './appliance-maintenance';

export interface ServiceTicketProps extends EntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference) : void;
  readonly property: PropertyProps;
  setPropertyRef (property: PropertyEntityReference) : void;
  readonly requestor: MemberProps;
  setRequestorRef (requestor: MemberEntityReference) :void;
  readonly assignedTo: MemberProps; 
  setAssignedToRef(assignedTo: MemberEntityReference) : void;
  readonly requestBundle: VariableTypePropArray<HVACMaintenanceEntityReference|ApplianceMaintenanceEntityReference>

  title: string;
  description: string;
  status: string;
  priority: number;
  readonly activityLog: PropArray<ActivityDetailProps>;
  readonly photos: PropArray<PhotoProps>;

  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface ServiceTicketEntityReference extends Readonly<Omit<ServiceTicketProps,
  'community' | 'setCommunityRef' | 
  'property' | 'setPropertyRef' | 
  'requestor' | 'setRequestorRef' |
  'assignedTo' | 'setAssignedToRef' | 
  'activityLog' |
  'requestBundle' | 
  'photos' >>{
  readonly community: CommunityEntityReference;
  readonly property: PropertyEntityReference;
  readonly requestor: MemberEntityReference;
  readonly assignedTo: MemberEntityReference;  
  readonly activityLog: ReadonlyArray<ActivityDetailEntityReference>;
  readonly photos: ReadonlyArray<PhotoEntityReference>;
}

export class ServiceTicket<props extends ServiceTicketProps> extends AggregateRoot<props> implements ServiceTicketEntityReference{
  private isNew: boolean = false;
  private visa: ServiceTicketVisa;
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forServiceTicket(this);
  }

  public static async getNewInstance<props extends ServiceTicketProps> (
      newProps:props,
      title:string,
      description:string,
      community:CommunityEntityReference, 
      property:PropertyEntityReference,
      requestor:MemberEntityReference,
      context:DomainExecutionContext): Promise<ServiceTicket<props>> {
    let serviceTicket = new ServiceTicket(newProps,context);
    serviceTicket.isNew = true;
    serviceTicket.requestSetTitle(title);
    serviceTicket.requestSetDescription(description);
    serviceTicket.requestSetCommunity(community);
    serviceTicket.requestSetProperty(property);
    serviceTicket.requestSetRequestor(requestor);
    serviceTicket.requestSetStatus(ValueObjects.StatusCodes.Draft);
    serviceTicket.requestSetPriority(5);
    let newActivity = serviceTicket.requestNewActivityDetail();
    newActivity.requestSetActivityType(ActivityDetailValueObjects.ActivityTypeCodes.Created);
    newActivity.requestSetActivityDescription('Created');
    newActivity.requestSetActivityBy(requestor);
    serviceTicket.isNew = false;
    return serviceTicket;
  }

  get community() { return new Community(this.props.community, this.context); }
  get property() { return new Property(this.props.property, this.context); }
  get requestor() { return new Member(this.props.requestor, this.context); }
  get assignedTo() { return this.props.assignedTo?new Member(this.props.assignedTo, this.context):undefined; }
  get title() { return this.props.title; }
  get description() { return this.props.description; }
  get status() { return this.props.status; }
  get priority() { return this.props.priority; }
  get activityLog(): ReadonlyArray<ActivityDetailEntityReference> { return this.props.activityLog.items.map(a => new ActivityDetail(a,this.context, this.visa)); }
  get photos(): ReadonlyArray<PhotoEntityReference> { return this.props.photos.items.map(p => new Photo(p,this.context, this.visa)); }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }  
  get schemaVersion(): string {return this.props.schemaVersion; }  

  private readonly validStatusTransitions = new Map<string,string[]>([ 
    [ValueObjects.StatusCodes.Draft,[ValueObjects.StatusCodes.Submitted]],
    [ValueObjects.StatusCodes.Submitted,[ValueObjects.StatusCodes.Draft, ValueObjects.StatusCodes.Assigned]],
    [ValueObjects.StatusCodes.Assigned,[ValueObjects.StatusCodes.Submitted, ValueObjects.StatusCodes.InProgress]],
    [ValueObjects.StatusCodes.InProgress, [ValueObjects.StatusCodes.Assigned, ValueObjects.StatusCodes.Completed]],
    [ValueObjects.StatusCodes.Completed, [ValueObjects.StatusCodes.InProgress, ValueObjects.StatusCodes.Closed]],
    [ValueObjects.StatusCodes.Closed, [ValueObjects.StatusCodes.InProgress]],
  ]);
  private readonly statusMappings = new Map<string,string>([
    [ValueObjects.StatusCodes.Draft, ActivityDetailValueObjects.ActivityTypeCodes.Created],
    [ValueObjects.StatusCodes.Submitted, ActivityDetailValueObjects.ActivityTypeCodes.Created],
    [ValueObjects.StatusCodes.Assigned, ActivityDetailValueObjects.ActivityTypeCodes.Assigned],
    [ValueObjects.StatusCodes.InProgress, ActivityDetailValueObjects.ActivityTypeCodes.Updated],
    [ValueObjects.StatusCodes.Completed, ActivityDetailValueObjects.ActivityTypeCodes.Completed],
    [ValueObjects.StatusCodes.Closed, ActivityDetailValueObjects.ActivityTypeCodes.Closed],
  ]);

  
  private requestSetCommunity(community:CommunityEntityReference):void{
    if(!this.isNew) { throw new Error('Unauthorized'); }
    this.props.setCommunityRef(community);
  }
  public requestSetProperty(property:PropertyEntityReference):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => 
        permissions.isSystemAccount || 
        permissions.canManageTickets || 
        (permissions.canCreateTickets && permissions.isEditingOwnTicket)
      )) { throw new Error('Unauthorized1'); }
    this.props.setPropertyRef(property);
  }
  private requestSetRequestor(requestor:MemberEntityReference):void{
    if(!this.isNew) { throw new Error('Unauthorized'); }
    this.props.setRequestorRef(requestor);
  }
  public requestDelete(): void {
    if(
      !this.isDeleted &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets)) { throw new Error('You do not have permission to delete this property'); }
    super.isDeleted = true;
  }
  public requestSetAssignedTo(assignedTo:MemberEntityReference):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canAssignTickets)) { throw new Error('Unauthorized2'); }
    this.props.setAssignedToRef(assignedTo);
  }
  public requestSetTitle(title:ValueObjects.Title):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized3'); }
    this.props.title = title.valueOf();
  }
  public requestSetDescription(description:ValueObjects.Description):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized4'); }
    this.props.description = description.valueOf();
  }
  public requestSetStatus(statusCode:ValueObjects.StatusCode):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount)) { throw new Error('Unauthorized5'); }
    this.props.status = statusCode.valueOf();
  }
  public requestSetPriority(priority:ValueObjects.Priority):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => 
      permissions.isSystemAccount || 
      (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
      permissions.canManageTickets
      )) { throw new Error('Unauthorized6'); }
    this.props.priority = priority.valueOf();
  }

  private requestNewActivityDetail():ActivityDetail{
    let activityDetail = this.props.activityLog.getNewItem();
    return(new ActivityDetail(activityDetail,this.context, this.visa));
  }

  public requestAddStatusUpdate(description:string, by:MemberEntityReference):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => 
      permissions.isSystemAccount || 
      (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
      (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
      permissions.canManageTickets ||
      permissions.canAssignTickets
    )) { throw new Error('Unauthorized7'); }
    var activityDetail = this.requestNewActivityDetail();
    activityDetail.requestSetActivityType(ActivityDetailValueObjects.ActivityTypeCodes.Updated);
    activityDetail.requestSetActivityDescription(description);
    activityDetail.requestSetActivityBy(by);
  }
  public requestAddStatusTransition(newStatus:ValueObjects.StatusCode,description:string, by:MemberEntityReference):void{
    if(
      !this.visa.determineIf(permissions => 
      permissions.isSystemAccount || 
      (
        this.validStatusTransitions.get(this.status.valueOf())?.includes(newStatus.valueOf()) &&
        (
          permissions.canManageTickets ||
          permissions.canAssignTickets ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) 
        )
      )
    )) { throw new Error('Unauthorized or Invalid Status Transition'); }
    
    this.props.status = newStatus.valueOf();
    var activityDetail = this.requestNewActivityDetail();
    activityDetail.requestSetActivityDescription(description);
    activityDetail.requestSetActivityType(this.statusMappings.get(newStatus.valueOf()));
    activityDetail.requestSetActivityBy(by);
  }
  public requestAddRequestItem(item: HVACMaintenanceProps | ApplianceMaintenanceProps): void {
      this.props.requestBundle.addItem(item);
  }
  public requestRemoveRequestItem(item: HVACMaintenanceProps | ApplianceMaintenanceProps): void {
      this.props.requestBundle.removeItem(item);
  }
  public requestNewHVACMaintenanceRequestItem(): HVACMaintenanceEntityReference {
      return this.props.requestBundle.getNewItem('HVACMaintenance') as HVACMaintenanceEntityReference;
  }
  public requestNewApplianceMaintenanceRequestItem(): ApplianceMaintenanceEntityReference {
      return this.props.requestBundle.getNewItem('ApplianceMaintenance') as ApplianceMaintenanceEntityReference;
  }
}

export interface ServiceTicketPermissions {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
} 