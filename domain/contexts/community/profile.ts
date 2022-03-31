import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { CommunityVisa } from '../iam/community-visa';
import * as ValueObjects from './profile-value-objects';

export interface ProfileProps extends EntityProps {
  name: string;
  email: string;
  bio: string;
  avatarDocumentId: string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showProfile: boolean;
  showProperties: boolean;
}

export interface ProfileEntityReference extends Readonly<ProfileProps> {}

export class Profile extends Entity<ProfileProps> implements ProfileEntityReference {
  constructor(props: ProfileProps, private readonly visa: CommunityVisa) { super(props); }

  get name() {return this.props.name;}
  get email() {return this.props.email;}
  get bio() {return this.props.bio;}
  get avatarDocumentId() {return this.props.avatarDocumentId;}
  get interests() {return this.props.interests;}
  get showInterests() {return this.props.showInterests;}
  get showEmail() {return this.props.showEmail;}
  get showPhone() {return this.props.showPhone;}
  get showLocation() {return this.props.showLocation;}
  get showProfile() {return this.props.showProfile;}
  get showProperties() {return this.props.showProperties;}

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.canManageMembers ||
      (permissions.canEditOwnMemberProfile && permissions.isEditingOwnMemberAccount))) {
      throw new Error('You do not have permission to update this profile');
    }
  }

  requestSetName(name: ValueObjects.Name) {
    this.validateVisa();
    this.props.name = name.valueOf();
  }
  requestSetEmail(email: ValueObjects.Email) {
    this.validateVisa();
    this.props.email = email.valueOf();
  }
  requestSetBio(bio: ValueObjects.Bio) {
    this.validateVisa();
    this.props.bio = bio.valueOf();
  }
  requestSetAvatarDocumentId(avatarDocumentId: string) {
    this.validateVisa();
    this.props.avatarDocumentId = avatarDocumentId;
  }
  requestSetInterests(interests: ValueObjects.Interests) {
    this.validateVisa();
    this.props.interests = interests.valueOf();
  }
  requestSetShowInterests(showInterests: boolean) {
    this.validateVisa();
    this.props.showInterests = showInterests;
  }
  requestSetShowEmail(showEmail: boolean) {
    this.validateVisa();
    this.props.showEmail = showEmail;
  }
  requestSetShowPhone(showPhone: boolean) {
    this.validateVisa();
    this.props.showPhone = showPhone;
  }
  requestSetShowLocation(showLocation: boolean) {
    this.validateVisa();
    this.props.showLocation = showLocation;
  }
  requestSetShowProfile(showProfile: boolean) {
    this.validateVisa();
    this.props.showProfile = showProfile;
  }
  requestSetShowProperties(showProperties: boolean) {
    this.validateVisa();
    this.props.showProperties = showProperties;
  }
  
}