import { ServiceTicketDataStructure } from '../../../app/application-services/datastore';
import { GraphqlContext } from '../../graphql-context';
import { DataSource } from '../data-source';

export class ServiceTickets extends DataSource<GraphqlContext> {
  async getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketDataStructure[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsByCommunityId(communityId);
  }

  async getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketDataStructure[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsOpenByRequestor(memberId);
  }

  async getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketDataStructure[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsClosedByRequestor(memberId);
  }
  async getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketDataStructure[]> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketsByAssignedTo(communityId, memberId);
  }
  async getServiceTicketById(id: string): Promise<ServiceTicketDataStructure> {
    return this.context.applicationServices.serviceTicketDatastoreApi.getServiceTicketById(id);
  }
}
