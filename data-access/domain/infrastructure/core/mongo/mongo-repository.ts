import { ClientSession, Document, Model } from 'mongoose';
import { AggregateRoot } from '../../../shared/aggregate-root';
import { DomainEvent } from '../../../shared/domain-event';
import { EntityProps } from '../../../shared/entity';
import { EventBus } from '../../../shared/event-bus';
import { ExecutionContext } from '../../../shared/execution-context';
import { Repository } from '../../../shared/repository';
import { TypeConverter } from '../../../shared/type-converter';

export abstract class MongoRepositoryBase<
  ContextType extends ExecutionContext,
  MongoType extends Document,
  PropType extends EntityProps,
  DomainType extends AggregateRoot<PropType>
> implements Repository<DomainType>
{
  protected itemsInTransaction: DomainType[] = [];
  constructor(
    protected eventBus: EventBus,
    protected model: Model<MongoType>,
    public typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
    protected session: ClientSession,
    protected context: ContextType
  ) {}

  async get(id: string): Promise<DomainType> {
    return this.typeConverter.toDomain(await this.model.findById(id).exec(), this.context);
  }

  async save(item: DomainType): Promise<DomainType> {
    item.onSave(this.typeConverter.toMongo(item).isModified());

    console.log('saving item');
    for await (let event of item.getDomainEvents()) {
      console.log(`Repo dispatching DomainEvent : ${JSON.stringify(event)}`);
      await this.eventBus.dispatch(event as any, event['payload']);
    }
    item.clearDomainEvents();
    this.itemsInTransaction.push(item);
    try {
      if (item.isDeleted === true) {
        await this.model.deleteOne({ _id: item.id }, { session: this.session }).exec();
        return item;
      } else {
        console.log('saving item id', item.id);
        const mongoObj = this.typeConverter.toMongo(item);
        return this.typeConverter.toDomain(await mongoObj.save({ session: this.session }), this.context);
      }
    } catch (error) {
      console.log(`Error saving item : ${error}`);
      throw error;
    }
  }

  async getIntegrationEvents(): Promise<DomainEvent[]> {
    const integrationEventsGroup = this.itemsInTransaction.map((item) => {
      const integrationEvents = item.getIntegrationEvents();
      item.clearIntegrationEvents();
      return integrationEvents;
    });
    return integrationEventsGroup.reduce((acc, curr) => acc.concat(curr), []);
  }

  static create<
    ContextType extends ExecutionContext,
    MongoType extends Document,
    PropType extends EntityProps,
    DomainType extends AggregateRoot<PropType>,
    RepoType extends MongoRepositoryBase<ContextType, MongoType, PropType, DomainType>
  >(
    bus: EventBus,
    model: Model<MongoType>,
    typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
    session: ClientSession,
    context: ContextType,
    repoClass: new (
      bus: EventBus,
      model: Model<MongoType>,
      typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
      session: ClientSession,
      context: ContextType
    ) => RepoType
  ): RepoType {
    return new repoClass(bus, model, typeConverter, session, context);
  }
}
