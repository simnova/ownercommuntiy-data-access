import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ServiceTicket } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { Context } from '../../context';

export class ServiceTickets extends MongoDataSource<ServiceTicket, Context> {

  async getServiceTicketsByCommunityId(communityId : string): Promise<ServiceTicket[]> {
    return this.findByFields({community: communityId});
  }
  async getServiceTicketsOpenByRequestor(propertyId : string): Promise<ServiceTicket[]> {
    return (await this.findByFields({requestor: propertyId})).filter(ticket => ticket.status !== 'CLOSED');
  }
  async getServiceTicketsClosedByRequestor(propertyId : string): Promise<ServiceTicket[]> {
    return (await this.findByFields({requestor: propertyId})).filter(ticket => ticket.status === 'CLOSED');
  }
  async getServiceTicketsByAssignedTo(communityId : string, memberId:string): Promise<ServiceTicket[]> {
    return this.findByFields({community: communityId, assignedTo: memberId});
  }

}