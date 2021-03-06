import { Entity, EntityProps } from '../../shared/entity';
import { CommunityPermissions, CommunityPermissionsEntityReference, CommunityPermissionsProps } from './community-permissions';
import { CommunityVisa } from '../iam/community-visa';
import { PropertyPermissions, PropertyPermissionsProps } from './property-permissions';
import { ServiceTicketPermissions, ServiceTicketPermissionsProps } from './service-ticket-permissions';

export interface PermissionsProps extends EntityProps {
  communityPermissions: CommunityPermissionsProps;
  propertyPermissions: PropertyPermissionsProps;
  serviceTicketPermissions: ServiceTicketPermissionsProps;
}

export interface PermissionsEntityReference extends Readonly<Omit<PermissionsProps, 'communityPermissions'>> {
  readonly communityPermissions: CommunityPermissionsEntityReference;
}

export class Permissions extends Entity<PermissionsProps> implements PermissionsEntityReference {
  constructor(props: PermissionsProps,private visa:CommunityVisa) { 
    super(props); 
  }

  get communityPermissions(): CommunityPermissions {
    return new CommunityPermissions(this.props.communityPermissions,this.visa);
  }
  get propertyPermissions(): PropertyPermissions {
    return new PropertyPermissions(this.props.propertyPermissions,this.visa);
  }
  get serviceTicketPermissions(): ServiceTicketPermissions {
    return new ServiceTicketPermissions(this.props.serviceTicketPermissions,this.visa);
  }
}