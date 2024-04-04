import { BlobAuthHeader } from "../../../../seedwork/services-seedwork-blob-storage-interfaces";
import { MutationStatus } from "./_base.interfaces";

export interface PropertyBlobStorageApplicationService<TDataProperty> {
  propertyPublicFileRemove(propertyId: string,memberId: string, fileName: string): Promise<void>;
  propertyListingImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult<TDataProperty>>;
  propertyFloorPlanImageCreateAuthHeader(propertyId: string, fileName: string, memberId:string, contentType: string, contentLength: number): Promise<PropertyBlobFileAuthHeaderResult<TDataProperty>>;
  propertyListingImageRemove(propertyId: string, memberId: string, blobName: string): Promise<MutationStatus>;
}

export type PropertyBlobFileAuthHeaderResult<TDataProperty> = {
  authHeader?: BlobAuthHeader;
  property?: Property<TDataProperty>;
  status: MutationStatus;
};

export type Property<TDataProperty> = TDataProperty & {
  mapSASToken?: string;
};