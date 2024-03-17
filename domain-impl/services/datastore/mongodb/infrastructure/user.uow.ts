import { MongoUnitOfWork } from '../../../../../services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { UserModel } from '../models/user';
import { UserConverter } from './user.domain-adapter';
import { MongoUserRepository } from './user.mongo-repository';
import { NodeEventBusInstance, InProcEventBusInstance } from '../../../../../event-bus-seedwork-node';

export const MongoUserUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, UserModel, new UserConverter(), MongoUserRepository);