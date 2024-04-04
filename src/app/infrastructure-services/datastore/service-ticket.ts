import { FindQueries, Fields } from "./_base";

export interface ServiceTicketDatastoreInfrastructureService<TDataServiceTicket> extends FindQueries<TDataServiceTicket> {
  findByFieldsWithPopulatedValues(fields: Fields): Promise<TDataServiceTicket[]>;
}