import { Property as PropertyDO, PropertyProps } from '../../contexts/property/property';
import { PropertyRepository } from '../../contexts/property/property.repository';
import { Property, PropertyModel }from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { TypeConverter } from '../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../shared/event-bus';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference } from '../../contexts/community/community';

export class MongoPropertyRepository<PropType extends PropertyProps> extends MongoRepositoryBase<DomainExecutionContext, Property,PropType,PropertyDO<PropType>> implements PropertyRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof PropertyModel, 
    typeConverter: TypeConverter<Property, PropertyDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }

  async getNewInstance(propertyName:string, community:CommunityEntityReference): Promise<PropertyDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return PropertyDO.getNewInstance(adapter,propertyName, community, this.context);
  }
  
  async getById(id: string): Promise<PropertyDO<PropType>> {
    let member = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(member, this.context);
  }

}