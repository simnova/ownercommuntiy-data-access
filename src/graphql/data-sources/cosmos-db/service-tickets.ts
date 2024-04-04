import { ServiceTicket, ServiceTicketModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/service-ticket';
import { GraphqlContext } from '../../graphql-context';
import { CosmosDataSource } from './cosmos-data-source';

export class ServiceTickets extends CosmosDataSource<ServiceTicket, GraphqlContext> {
  async getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicket[]> {
    const result = await this.context.applicationServices.serviceTicketDataApi.getServiceTicketsByCommunityId(communityId);
    return result.map((r) => ServiceTicketModel.hydrate(r));
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicket[]> {
    const result = await this.context.applicationServices.serviceTicketDataApi.getServiceTicketsOpenByRequestor(memberId);
    return result.map((r) => ServiceTicketModel.hydrate(r));
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicket[]> {
    const result = await this.context.applicationServices.serviceTicketDataApi.getServiceTicketsClosedByRequestor(memberId);
    return result.map((r) => ServiceTicketModel.hydrate(r));
  }

  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicket[]> {
    const result = await this.context.applicationServices.serviceTicketDataApi.getServiceTicketsByAssignedTo(communityId, memberId);
    return result.map((r) => ServiceTicketModel.hydrate(r));
  }
}
