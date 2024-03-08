import { NodeEventBus } from '../core/events/node-event-bus';
import { InProcEventBus } from '../core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../core/mongo/mongo-unit-of-work';

import { PropertyModel } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { PropertyConverter } from './property.domain-adapter';
import { MongoPropertyRepository } from './property.mongo-repository';

export const PropertyUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, PropertyModel, new PropertyConverter(), MongoPropertyRepository);
