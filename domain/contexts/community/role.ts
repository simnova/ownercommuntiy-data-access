import { Entity, EntityProps } from "../../shared/entity";
import { Permissions, PermissionsEntityReference, PermissionsProps } from "./permissions";
import { Community, CommunityProps, CommunityEntityReference } from "./community";
import { CommunityVisa } from "../iam/community-visa";
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from "../context";
import { RoleDeletedReassignEvent } from "../../events/role-deleted-reassign";

export interface RoleProps extends EntityProps {
  roleName: string;
  readonly community: CommunityProps;
  setCommunityRef: (community: CommunityEntityReference) => void;
  isDefault: boolean;
  permissions: PermissionsProps;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface RoleEntityReference extends Readonly<Omit<RoleProps,
  'community' | 'setCommunityRef' | 
  'permissions'>>{
  readonly community: CommunityEntityReference;
  readonly permissions: PermissionsEntityReference;
}

export class Role<props extends RoleProps> extends AggregateRoot<props> implements RoleEntityReference{
  private isNew: boolean = false;
  private readonly visa : CommunityVisa;
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forRole(this);
  }

  get roleName() { return this.props.roleName; }
  get community(): CommunityEntityReference { return new Community(this.props.community, this.context); }
  get isDefault() { return this.props.isDefault; }
  get permissions() { return new Permissions(this.props.permissions,this.visa); }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }  
  get schemaVersion() {return this.props.schemaVersion;}

  public static getNewInstance<props extends RoleProps>(newProps: props, roleName:string,isDefault:boolean,community:CommunityEntityReference, context:DomainExecutionContext): Role<props> {
    var role = new Role(newProps,context);
    role.isNew = true;
    role.requestSetRoleName(roleName);
    role.requestSetCommunity(community);
    role.requestSetIsDefault(isDefault);
    role.isNew = false;
    return role
  }

  private requestSetCommunity(community:CommunityEntityReference): void {
    if(
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) { throw new Error('You do not have permission to update this role'); }
    this.props.setCommunityRef(community);
  }

  public requestDeleteAndReassignTo(roleRef:RoleEntityReference): void {
    
    if(
      !this.isDeleted &&
      !this.isDefault &&
      !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) { throw new Error('You do not have permission to delete this role'); }
    super.isDeleted = true;
    this.addIntegrationEvent(RoleDeletedReassignEvent,{deletedRoleId: this.props.id, newRoleId: roleRef.id});
  }
  
  public requestSetIsDefault(isDefault:boolean): void {
    if(
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount)) { throw new Error('You do not have permission to update this role'); }
    this.props.isDefault = isDefault;
  }

  public requestSetRoleName(roleName:string): void {
    if(
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {throw new Error('Cannot set role name');}
    this.props.roleName = roleName;
  }

}