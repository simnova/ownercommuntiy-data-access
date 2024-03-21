Feature: Creating a community

Scenario: Create a community
  Given ReggieTheOwner creates a community called LegoWorld
  Given ReggieTheOwner creates the LegoEmployee role in LegoWorld with the following permissions: 
    | memberPermissions         | canEditOwnMemberProfile |
    | communityPermissions      | canManageRolesAndPermissions, canManageSiteContent, canManageMembers |
    | serviceTicketPermissions  | canManageTickets, CanAssignTickets |
    | servicePermissions        | canManageServices|
  Given BobTheWorker is a member of LegoWorld
#  When ReggieTheOwner assigns the LegoEmployee role to BobTheWorker
#  Then BobTheWorker should have LegoEmployee permissions
