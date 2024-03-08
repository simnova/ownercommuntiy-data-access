import { Service as ServiceDO, ServiceProps } from '../../contexts/service-ticket/service';
import { ServiceRepository } from '../../contexts/service-ticket/service.repository';
import { Service } from '../../../infrastructure/data-sources/cosmos-db/models/service';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference } from '../../contexts/community/community';

export class MongoServiceRepository<PropType extends ServiceProps>
  extends MongoRepositoryBase<DomainExecutionContext, Service, PropType, ServiceDO<PropType>>
  implements ServiceRepository<PropType>
{
  async getNewInstance(serviceName: string, description: string, community: CommunityEntityReference): Promise<ServiceDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ServiceDO.getNewInstance(adapter, serviceName, description, community, this.context);
  }

  async getById(id: string): Promise<ServiceDO<PropType>> {
    let member = await this.model.findById(id).populate(['community']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
