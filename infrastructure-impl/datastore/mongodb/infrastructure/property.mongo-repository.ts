import { Property as PropertyDO, PropertyProps } from '../../../../domain/contexts/property/property';
import { PropertyRepository } from '../../../../domain/contexts/property/property.repository';
import { Property } from '../models/property';
import { MongoRepositoryBase } from '../../../../services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../domain/contexts/execution-context';
import { CommunityEntityReference } from '../../../../domain/contexts/community/community';

export class MongoPropertyRepository<PropType extends PropertyProps>
  extends MongoRepositoryBase<DomainExecutionContext, Property, PropType, PropertyDO<PropType>>
  implements PropertyRepository<PropType>
{
  async getNewInstance(propertyName: string, community: CommunityEntityReference): Promise<PropertyDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return PropertyDO.getNewInstance(adapter, propertyName, community, this.context);
  }

  async getById(id: string): Promise<PropertyDO<PropType>> {
    let propertyDTO = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(propertyDTO, this.context);
  }

  async getAll(): Promise<PropertyDO<PropType>[]> {
    let propertiesDTO = await this.model.find().populate('community').exec();
    return propertiesDTO.map((property) => this.typeConverter.toDomain(property, this.context));
  }
}
