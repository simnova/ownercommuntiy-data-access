export interface ServiceTicketDatastoreApplicationService<TDataServiceTicket> {
  getServiceTicketsByCommunityId(communityId: string): Promise<TDataServiceTicket[]>;
  getServiceTicketsOpenByRequestor(memberId: string): Promise<TDataServiceTicket[]>;
  getServiceTicketsClosedByRequestor(memberId: string): Promise<TDataServiceTicket[]>;
  getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<TDataServiceTicket[]>; 
  getServiceTicketById(id: string): Promise<TDataServiceTicket>;
}