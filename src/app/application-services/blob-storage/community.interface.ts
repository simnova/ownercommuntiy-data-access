import { BlobAuthHeader, FileInfo } from "../../../../seedwork/services-seedwork-blob-storage-interfaces";
import { MutationStatus } from "./_base.interfaces";

export interface CommunityBlobStorageApplicationService<TDataCommunity, TDataRole> {
  communityPublicFilesList(communityId: string): Promise<FileInfo[]>;
  communityPublicFilesListByType(communityId: string, type: string): Promise<FileInfo[]>;
  communityPublicFileCreateAuthHeader(communityId: string, fileName: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult<TDataCommunity, TDataRole>>;
  communityPublicFileRemove(communityId: string, fileName: string): Promise<void>;
  communityPublicContentCreateAuthHeader(communityId: string, contentType: string, contentLength: number): Promise<CommunityBlobContentAuthHeaderResult<TDataCommunity, TDataRole>>;
}

export type CommunityBlobContentAuthHeaderResult<TDataCommunity, TDataRole> = {
  authHeader?: BlobAuthHeader;
  community?: Community<TDataCommunity, TDataRole>;
  status: MutationStatus;
};



export type Community<TDataCommunity, TDataRole> = TDataCommunity & {
  domainStatus?: CommunityDomainResult;
  files?: FileInfo[];
  filesByType?: FileInfo[];
  publicContentBlobUrl?: string;
  roles?: TDataRole[];
  userIsAdmin?: boolean;
};


export type CommunityDomainResult = {
  verification?: CommunityDomainVerificationDetail[];
  verified?: boolean;
};

export type CommunityDomainVerificationDetail = {
  domain?: string;
  reason?: string;
  type?: string;
  value?: string;
};