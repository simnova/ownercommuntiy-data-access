import { BlobAuthHeader } from "../../../../seedwork/services-seedwork-blob-storage-interfaces";
import { MutationStatus } from "./_base.interfaces";

export interface MemberBlobStorageApplicationService<TDataMember> {
  memberProfileAvatarRemove(memberId: string): Promise<MutationStatus>;
  memberProfileAvatarCreateAuthHeader(memberId: string, fileName: string, contentType: string, contentLength: number): Promise<MemberAvatarImageAuthHeaderResult<TDataMember>>;
}


export type MemberAvatarImageAuthHeaderResult<TDataMember> = {
  authHeader?: BlobAuthHeader;
  member?: TDataMember;
  status: MutationStatus;
};

// export type Member = MemberDataStructure