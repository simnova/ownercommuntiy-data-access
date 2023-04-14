import { Visa } from "./passport";

export const hasPermission = {
  canManageRolesAndPermissions: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)),
  canManageCommunitySettings: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageCommunitySettings)),
  canManageSiteContent: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageSiteContent)),
  canManageMembers: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageMembers)),
  canEditOwnMemberProfile: ((visa: Visa) => visa.determineIf((permissions) => permissions.canEditOwnMemberProfile)),
  canEditOwnMemberAccounts: ((visa: Visa) => visa.determineIf((permissions) => permissions.canEditOwnMemberAccounts)),
  isEditingOwnMemberAccount: ((visa: Visa) => visa.determineIf((permissions) => permissions.isEditingOwnMemberAccount)),
  isSystemAccount: ((visa: Visa) => visa.determineIf((permissions) => permissions.isSystemAccount)),
  canManageProperties: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageProperties)),
  canEditOwnProperty: ((visa: Visa) => visa.determineIf((permissions) => permissions.canEditOwnProperty)),
  isEditingOwnProperty: ((visa: Visa) => visa.determineIf((permissions) => permissions.isEditingOwnProperty)),
  canCreateTickets: ((visa: Visa) => visa.determineIf((permissions) => permissions.canCreateTickets)),
  canManageTickets: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageTickets)),
  canAssignTickets: ((visa: Visa) => visa.determineIf((permissions) => permissions.canAssignTickets)),
  canWorkOnTickets: ((visa: Visa) => visa.determineIf((permissions) => permissions.canWorkOnTickets)),
  isEditingOwnTicket: ((visa: Visa) => visa.determineIf((permissions) => permissions.isEditingOwnTicket)),
  isEditingAssignedTicket: ((visa: Visa) => visa.determineIf((permissions) => permissions.isEditingAssignedTicket)),
  canManageServices: ((visa: Visa) => visa.determineIf((permissions) => permissions.canManageServices)),
}

export const isField = {
  new: ((isNew: boolean) => isNew),
  immutable: ((value: any) => value === undefined),
}