import { Passport, PassportImpl, ReadOnlyPassport } from "./domain/contexts/iam/passport";
import { UserEntityReference } from "./domain/contexts/user/user";
import { MemberEntityReference } from "./domain/contexts/community/member";
import { CommunityDataStructure } from "./application-services/datastore";
import { CommunityEntityReference } from "./domain/contexts/community/community";
import { ApplicationServices } from "./application-services";
import { InfrastructureServices } from "./infrastructure-services";
import { BaseApplicationServiceExecutionContext } from "../application-services-impl/_base.application-service";
import { ApplicationServicesBuilder } from "../startup/application-services-builder";
import { DomainImpl } from "./domain/domain-impl";

export type VerifiedUser = {
  verifiedJWT: any;
  openIdConfigKey: string;
};

export interface AppContext extends BaseApplicationServiceExecutionContext{
  verifiedUser: VerifiedUser;
  communityId: string;
  passport: Passport;
  applicationServices: ApplicationServices;
  infrastructureServices: InfrastructureServices;
  init(): Promise<void>;
}

export class AppContextImpl implements AppContext {
  private _verifiedUser: VerifiedUser;
  private _communityHeader: string;
  private _communityData: CommunityDataStructure
  private _passport: Passport;
  private _applicationServices: ApplicationServices;
  private _infrastructureServices: InfrastructureServices;

  constructor(
    verifiedUser: VerifiedUser, 
    communityHeader: string,
    infrastructureServices: InfrastructureServices
    ) {
      this._verifiedUser = verifiedUser;
      this._communityHeader = communityHeader;
      this._applicationServices = new ApplicationServicesBuilder(this);
      this._infrastructureServices = infrastructureServices;
  }

  get verifiedUser(): VerifiedUser {
    return this._verifiedUser;
  }

  get communityId(): string {
    return this._communityData.id;
  }

  get passport(): Passport {
    return this._passport;
  }

  get applicationServices(): ApplicationServices {
    return this._applicationServices;
  }

  get infrastructureServices(): InfrastructureServices {
    return this._infrastructureServices;
  }

  async init(): Promise<void> {
    await this.setDefaultPassport();
    await this.setCommunityData();
    await this.setPassport();
    await this.initializeDomain();
    console.log('AppContext initialized...');
  }

  private async initializeDomain() {
    const DomainImplInstance = new DomainImpl(
      this._infrastructureServices.datastore,
      this._infrastructureServices.cognitiveSearch,
      this._infrastructureServices.blobStorage,
      this._infrastructureServices.vercel
    );
    await DomainImplInstance.startup();
  }
  
  private async setDefaultPassport(): Promise<void> {
    this._passport = ReadOnlyPassport.GetInstance();
  }
  
  private async setCommunityData(): Promise<void>{
    if (this._communityHeader) {
      this._communityData = await this._applicationServices.communityDatastoreApi.getCommunityByHeader(this._communityHeader);
    }
  }

  private async setPassport(): Promise<void> {
    let userExternalId = this._verifiedUser.verifiedJWT.sub;
    if(userExternalId && this._communityData) {
      let userData = await this._applicationServices.userDatastoreApi.getByExternalId(userExternalId);
      let memberData = await this._applicationServices.memberDatastoreApi.getMemberByCommunityAccountWithCommunityAccountRole(this._communityData.id, userData.id);
      if(memberData && userData) {
        this._passport = new PassportImpl(userData as UserEntityReference, memberData as MemberEntityReference, this._communityData as CommunityEntityReference);
      }
    }
  }
}