import { CommunityCreatedEvent } from '../../events/community-created';
import { CommunityDomainUpdatedEvent } from '../../events/community-domain-updated';
import { AggregateRoot } from '../../shared/aggregate-root';
import { EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { CommunityVisa } from '../iam/community-visa';
import { User, UserEntityReference, UserProps } from '../user/user';
import * as ValueObjects from './community.value-objects';

export interface CommunityProps extends EntityProps {
  name:string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
  readonly createdBy: UserProps;
  setCreatedByRef(user: UserEntityReference): void;
}

export interface CommunityEntityReference extends Readonly<Omit<CommunityProps,
  'createdBy' | 'setCreatedByRef'>> {
  readonly createdBy: UserEntityReference;
}

export class Community<props extends CommunityProps> extends AggregateRoot<props> implements CommunityEntityReference  {
  private readonly visa : CommunityVisa;
  private isNew:boolean = false;
  constructor(props: props,private readonly context: DomainExecutionContext) { 
    super(props); 
    this.visa =  context.passport.forCommunity(this);
  }

  get id() {return this.props.id;}
  get name() {return this.props.name;}
  get domain() {return this.props.domain;}
  get whiteLabelDomain() {return this.props.whiteLabelDomain;}
  get handle() {return this.props.handle;}
  get createdBy():UserEntityReference {return new User(this.props.createdBy,this.context);};
  get updatedAt() {return this.props.updatedAt;}
  get createdAt() {return this.props.createdAt;}
  get schemaVersion() {return this.props.schemaVersion;}

  public static getNewInstance<props extends CommunityProps> (
    newProps:props, name:string, createdBy:UserEntityReference, context: DomainExecutionContext): Community<props> {
    let community = new Community(newProps, context);
    community.MarkAsNew();
    community.requestSetName(name);
    community.requestSetCreatedBy(createdBy);
    community.isNew = false
    return community;
  }

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(CommunityCreatedEvent,{communityId: this.props.id});
  }

  public requestSetName(name:string): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the name of this community');}
    this.props.name = (new ValueObjects.Name(name)).valueOf();
  }
  public requestSetDomain(domain:ValueObjects.Domain): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the domain of this community');}
    var oldDomain = this.props.domain;
    if(oldDomain !== domain.valueOf()) {
      this.props.domain = domain.valueOf();
      this.addIntegrationEvent(CommunityDomainUpdatedEvent,{communityId: this.props.id, domain: domain.valueOf(), oldDomain: oldDomain});
    }
  }
  public requestSetWhiteLabelDomain(whiteLabelDomain:ValueObjects.WhiteLabelDomain): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the white label domain of this community');}
    this.props.whiteLabelDomain = whiteLabelDomain.valueOf();
  }
  public requestSetHandle(handle:ValueObjects.Handle): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the handle of this community');}
    this.props.handle = handle.valueOf();
  }
  public requestSetCreatedBy(createdBy:UserEntityReference): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the created by of this community');}
    if(createdBy === null || createdBy === undefined) {throw new Error('createdBy cannot be null or undefined');}
    this.props.setCreatedByRef(createdBy);
  }

}

