import { ActivityDetail, ServiceTicket, Photo } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../contexts/service-ticket/service-ticket';
import { MongooseDomainAdapter, MongoosePropArray } from '../core/mongo/mongo-domain-adapter';
import { MongoTypeConverter } from '../core/mongo/mongo-type-converter';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference, CommunityProps } from '../../contexts/community/community';
import { CommunityDomainAdapter } from './community.domain-adapter';
import { PropertyDomainAdapter } from './property.domain-adapter';
import { PropertyEntityReference, PropertyProps } from '../../contexts/property/property';
import { MemberEntityReference, MemberProps } from '../../contexts/community/member';
import { MemberDomainAdapter } from './member.domain-adapter';
import { ActivityDetailProps } from '../../contexts/service-ticket/activity-detail';
import { PhotoProps } from '../../contexts/service-ticket/photo';
import { UserDomainAdapter } from './user.domain-adapter';
import { UserProps } from '../../contexts/user/user';
import { nanoid } from 'nanoid';


export class ServiceTicketConverter extends MongoTypeConverter<DomainExecutionContext,ServiceTicket,ServiceTicketDomainAdapter,ServiceTicketDO<ServiceTicketDomainAdapter>> {
  constructor() {
    super(ServiceTicketDomainAdapter, ServiceTicketDO);
  }
}

export class ServiceTicketDomainAdapter extends MongooseDomainAdapter<ServiceTicket> implements ServiceTicketProps {
  constructor(doc: ServiceTicket) { super(doc); }

  get community() {
    if(this.doc.community) {return new CommunityDomainAdapter(this.doc.community);}
  }
  public setCommunityRef(community:CommunityEntityReference) {
    this.doc.set('community',community.id);
  }

  get property() {
    if(this.doc.property) {return new PropertyDomainAdapter(this.doc.property);}
  }
  public setPropertyRef(property:PropertyEntityReference) {
    this.doc.set('property',property.id);
  }

  get requestor() {
    if(this.doc.requestor) {return new MemberDomainAdapter(this.doc.requestor);}
  }
  public setRequestorRef(requestor:MemberEntityReference) {
    this.doc.set('requestor',requestor?requestor['props']['doc']:null);
  }

  get assignedTo() {
    if(this.doc.assignedTo) {return this.doc.assignedTo?new MemberDomainAdapter(this.doc.assignedTo):undefined;}
  }
  public setAssignedToRef(assignedTo:MemberEntityReference) {
    this.doc.set('assignedTo',assignedTo?assignedTo['props']['doc']:null);
  }

  get title() {return this.doc.title;}
  set title(title) {this.doc.title = title;}

  get description() {return this.doc.description;}
  set description(description) {this.doc.description = description;}

  get status() {return this.doc.status;}
  set status(status) {this.doc.status = status;}

  get priority() {return this.doc.priority;}
  set priority(priority) {this.doc.priority = priority;}

  get activityLog() {return new MongoosePropArray(this.doc.activityLog, ActivityDetailDomainAdapter) }

  get photos() {return new MongoosePropArray(this.doc.photos, PhotoDomainAdapter) }
}


export class ActivityDetailDomainAdapter implements ActivityDetailProps {
  constructor(public readonly props: ActivityDetail) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get activityType() {return this.props.activityType;}
  set activityType(activityType) {this.props.activityType = activityType;}

  get activityDescription() {return this.props.activityDescription;}
  set activityDescription(description) {this.props.activityDescription = description;}

  get activityBy(){
    if(this.props.activityBy) { return new MemberDomainAdapter(this.props.activityBy);}
  }
  public setActivityByRef (activityBy: MemberEntityReference) {
    this.props.set('activityBy', activityBy['props']['doc']);
  }
}

export class PhotoDomainAdapter implements PhotoProps {
  constructor(public readonly props: Photo) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get documentId() {return this.props.documentId;}
  set documentId(documentId) {this.props.documentId = documentId;}

  get description() {return this.props.description;}
  set description(description) {this.props.description = description;}

  getNewDocumentId(): string {
    return nanoid();
  }
}