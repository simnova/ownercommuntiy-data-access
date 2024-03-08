import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../contexts/service-ticket/service-ticket';
import { ServiceTicketRepository } from '../../contexts/service-ticket/service-ticket.repository';
import { ServiceTicket } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { DomainExecutionContext } from '../../contexts/context';
import { MemberEntityReference } from '../../contexts/community/member';
import { CommunityEntityReference } from '../../contexts/community/community';
import { PropertyEntityReference } from '../../contexts/property/property';

export class MongoServiceTicketRepository<PropType extends ServiceTicketProps>
  extends MongoRepositoryBase<DomainExecutionContext, ServiceTicket, PropType, ServiceTicketDO<PropType>>
  implements ServiceTicketRepository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference
  ): Promise<ServiceTicketDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ServiceTicketDO.getNewInstance(adapter, title, description, community, property, requestor, this.context);
  }

  async getById(id: string): Promise<ServiceTicketDO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
