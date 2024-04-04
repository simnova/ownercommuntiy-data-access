import { AppContext } from '../../app/app-context-builder';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';
import { CommunityDatastoreApplicationService } from '../../app/application-services/datastore/community.interface';
import { DatastoreInfrastructureService } from '../../app/infrastructure-services/datastore';

export class CommunityDatastoreApplicationServiceImpl<TData> 
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements CommunityDatastoreApplicationService<TData>
{

  async getCurrentCommunity<TData>(): Promise <TData>{
    let communityToReturn: TData;
    await this.withDatastore(async (_passport, datastore: DatastoreInfrastructureService) => {
      communityToReturn = await datastore.communityDatastore().findOneById(this.context.communityId) as TData;
    });
    return communityToReturn;
  }

  async getCommunityById(communityId: string): Promise<TData> {
    let communityToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = await datastore.communityDatastore().findOneById(communityId) as TData;
    });
    return communityToReturn;
  }

  async getCommunityByHandle(handle: string): Promise<TData> {
    let communityToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = (await datastore.communityDatastore().findByFields({ handle: handle }))?.[0] as TData;
    });
    return communityToReturn;
  }

  async getCommunityByDomain(domain: string): Promise<TData> {
    let communityToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = (await datastore.communityDatastore().findByFields({ domain: domain }))?.[0] as TData;
    });
    return communityToReturn;
  }

  async getCommunityByHeader(header: string): Promise<TData> {
    console.log('getCommunityByHeader > header: ', header);
    let communityToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = (await datastore.communityDatastore().getCommunityByHeader(header)) as TData;
    });
    console.log('getCommunityByHeader > communityToReturn: ', communityToReturn);
    return communityToReturn;
  }

  async userIsAdmin(communityId: string): Promise<boolean> {
    const externalId = this.context.verifiedUser.verifiedJWT.sub;
    let isUserAdmin: boolean;
    await this.withDatastore(async (_passport, datastore) => {
      isUserAdmin = await datastore.communityDatastore().isUserAdmin(communityId, externalId);
    });
    return isUserAdmin;
  }

  async getCommunitiesForCurrentUser(): Promise<TData[]> {
    const externalId = this.context.verifiedUser.verifiedJWT.sub;
    let communityToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = await datastore.communityDatastore().getCommunitiesForUser(externalId) as TData[];
    });
    return communityToReturn;
  }
}
