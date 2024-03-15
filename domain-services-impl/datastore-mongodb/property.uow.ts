import { NodeEventBus } from '../../domain-eventbus-impl-node/node-event-bus';
import { InProcEventBus } from '../../domain-eventbus-impl-node/in-proc-event-bus';
import { MongoUnitOfWork } from '../../domain-seedwork-mongodb/mongo-unit-of-work';

import { PropertyModel } from '../../infrastructure/data-sources/cosmos-db/models/property';
import { PropertyConverter } from './property.domain-adapter';
import { MongoPropertyRepository } from './property.mongo-repository';

export const PropertyUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, PropertyModel, new PropertyConverter(), MongoPropertyRepository);
