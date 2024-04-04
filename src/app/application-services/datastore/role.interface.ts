export interface RoleDatastoreApplicationService<TDataRole> {
  getRoleById(id: string): Promise<TDataRole>;
  getRoles(): Promise<TDataRole[]>;
  getRolesByCommunityId(communityId: string): Promise<TDataRole[]>;
}