import { ServiceTicketDatastoreApplicationService } from '../../app/application-services/datastore/service-ticket.interface';
import { ServiceTicketEntityReference } from '../../app/domain/contexts/service-ticket/service-ticket';
import { AppContext } from '../../app/app-context-builder';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class ServiceTicketDatastoreApplicationServiceImpl<TData>
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements ServiceTicketDatastoreApplicationService<TData>
{

  async getServiceTicketById(id: string): Promise<TData> {
    let serviceTicketToReturn: TData;
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findOneById(id);
    });
    return serviceTicketToReturn;
    // return this.applyPermissionFilter([serviceTicketToReturn], this.context)[0];
  }
  
  async getServiceTicketsByCommunityId(communityId: string): Promise<TData[]> {
    let serviceTicketToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFieldsWithPopulatedValues({ community: communityId });
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<TData[]> {
    let serviceTicketToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFieldsWithPopulatedValues({ requestor: memberId });
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<TData[]> {
    let serviceTicketToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFieldsWithPopulatedValues({ requestor: memberId , status: 'CLOSED'});
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<TData[]> {
    let serviceTicketToReturn: TData[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceTicketToReturn = await datastore.serviceTicketDatastore.findByFields({ community: communityId, assignedTo: memberId});
    });
    return this.applyPermissionFilter(serviceTicketToReturn, this.context);
  }

  private async applyPermissionFilter(serviceTickets: TData[], context: AppContext): Promise<TData[]> {
    return (await Promise.all(serviceTickets.map((ticket) => ticket)))
      .map((ticket) => ticket as unknown as ServiceTicketEntityReference) // [MG-TBD] remove unknown
      .filter((ticket) =>
        context.passport
          .forServiceTicket(ticket)
          .determineIf(
            (permissions) =>
              permissions.canManageTickets ||
              permissions.canAssignTickets ||
              (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
              (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket)
          )
      )
      .map((ticket) => ticket as unknown as TData); // [MG-TBD] remove unknown
  }
}
