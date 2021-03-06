import { MongoDataSource } from 'apollo-datasource-mongodb';
import { MemberModel } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { Property, PropertyModel } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { Context } from '../../context';
import { Types } from 'mongoose';

export class Properties extends MongoDataSource<Property, Context> {
  async getPropertiesByCommunityId(communityId: string): Promise<Property[]> {
    return this.findByFields({ community: communityId });
  }

  async getPropertiesByIds(propertyIds: string[]): Promise<Property[]> {
    return this.findManyByIds(propertyIds);
  }

  async getAllProperties(): Promise<Property[]> {
    // let result = await MemberModel.aggregate<Properties>([
    //   {
    //     $lookup: {
    //       from: 'properties',
    //       localField: '_id',
    //       foreignField: 'owner',
    //       as: 'p',
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$p',
    //     },
    //   },
    //   {
    //     $replaceWith: '$p',
    //   },
    // ]).exec();

    // return result.map((r) => PropertyModel.hydrate(r));
    return PropertyModel.find().exec();
  }

  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<Property[]> {
    var result = await MemberModel.aggregate<Properties>([
      {
        $match: {
          community: new Types.ObjectId(communityId),
          'accounts.user': new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: 'owner',
          as: 'p',
        },
      },
      {
        $unwind: {
          path: '$p',
        },
      },
      {
        $replaceWith: '$p',
      },
    ]).exec();
    return result.map((r) => PropertyModel.hydrate(r));
  }
}
