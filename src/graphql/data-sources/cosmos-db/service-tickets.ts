import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class ServiceTickets<TData> extends DataSource<GraphqlContext> {
  async getServiceTicketsByCommunityId(communityId: string): Promise<TData[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsByCommunityId(communityId);
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<TData[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsOpenByRequestor(memberId);
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<TData[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsClosedByRequestor(memberId);
  }
  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<TData[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsByAssignedTo(communityId, memberId);
  }
  async getServiceTicketById(id: string): Promise<TData> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketById(id);
  }
}
