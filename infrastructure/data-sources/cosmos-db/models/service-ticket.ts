import { Schema, model, Model, PopulatedDoc, ObjectId, Types } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase } from './interfaces/base';
import * as Community from './community';
import * as Property from './property';
import * as Member from './member';

export interface ActivityDetail extends EmbeddedBase {
  id: ObjectId;
  activityType: string;
  activityDescription: string;
  activityBy: PopulatedDoc<Member.Member>;
}

export interface Photo extends EmbeddedBase {
  id: ObjectId;
  documentId: string;
  description: string;
}

export interface ServiceTicket extends Base {
  community: PopulatedDoc<Community.Community>;
  property?: PopulatedDoc<Property.Property>;
  requestor: PopulatedDoc<Member.Member>;
  assignedTo?: PopulatedDoc<Member.Member>;
  title: string;
  description: string;
  requestBundle?: Types.DocumentArray<HVACMaintenance|ApplianceMaintenance>;
  status: string;
  priority: number;
  activityLog: Types.DocumentArray<ActivityDetail>;
  photos:Types.DocumentArray<Photo>
}

export interface Request extends EmbeddedBase {
  id: ObjectId;
  requestInfo: string;
  kind: string;
}

export const RequestModel = model<Request>('Request', new Schema<Request, Model<Request>, Request>(
  {
    requestInfo: {
      type: String,
      required: true,
    },
  },
  {
    discriminatorKey: 'kind',
  } 
));

export interface HVACMaintenance extends Request {
  hvacBrand: string;
}
export const HVACMaintenanceModel = RequestModel.discriminator<HVACMaintenance>('HVACMaintenance', new Schema<HVACMaintenance, Model<HVACMaintenance>, HVACMaintenance>(
  {
    hvacBrand: {
      type: String,
      required: true,
    },
  }
));

export interface ApplianceMaintenance extends Request {
  applianceType: string;
  applianceBrand: string;
}
export const ApplianceMaintenanceModel = RequestModel.discriminator<ApplianceMaintenance>('ApplianceMaintenance', new Schema<ApplianceMaintenance, Model<ApplianceMaintenance>, ApplianceMaintenance>(
  {
    applianceType: {
      type: String,
      required: true,
    },
    applianceBrand: {
      type: String,
      required: true,
    },
  }
));




export const ServiceTicketModel = model<ServiceTicket>('ServiceTicket', new Schema<ServiceTicket, Model<ServiceTicket>, ServiceTicket>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true },    
    property: { type: Schema.Types.ObjectId, ref:Property.PropertyModel.modelName, required: false, index: true },
    requestor: { type: Schema.Types.ObjectId, ref:Member.MemberModel.modelName, required: true, index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref:Member.MemberModel.modelName, required: false, index: true },
    title: { 
      type: String, 
      required: true,
      maxlength: 200,
    },
    description: { 
      type: String, 
      required: true,
      maxlength: 2000,
    },
    requestBundle: [RequestModel.schema],
    status: { 
      type: String, 
      enum: ['DRAFT','SUBMITTED','ASSIGNED','INPROGRESS','COMPLETED','CLOSED'],
      default: 'DRAFT',
      required: true 
    },
    priority: { 
      type: Number, 
      required: true,
      default: 5,
      min: 1,
      max: 5
     },
    activityLog: [{
      activityType: { 
        type: String, 
        required: true,
        enum: ['CREATED','SUBMITTED','ASSIGNED','INPROGRESS','UPDATED','COMPLETED','CLOSED'],
      },
      activityDescription: { 
        type: String,
        maxlength: 2000, 
        required: true 
      },
      activityBy: { type: Schema.Types.ObjectId, ref:Member.MemberModel.modelName, required: true, index: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }  
    }],
    photos: [{
      description: { 
        type: String, 
        required: false,
        maxlength: 300,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }  
      },
      documentId: { type: String, required: true },
    }]
  },
  {
    ...BaseOptions,
    shardKey: {community:1} 
  }
));

/*
var x = await ServiceTicketModel.findById('5c8f8f8f8f8f8f8f8f8f8f8').exec();
x.requestBundle.push( new HVACMaintenanceModel(
  {requestInfo: 'test',
  hvacBrand: 'test'}
  ));
x.requestBundle.push( new ApplianceMaintenanceModel(
  {requestInfo: 'test',
  applianceType: 'test',
  applianceBrand: 'test'}
  ));

x.save();
*/