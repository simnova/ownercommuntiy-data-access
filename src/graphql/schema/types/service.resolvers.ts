import { Community, Resolvers, Service, ServiceMutationResult } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { ServiceData } from '../../../startup/execution-types-builder';


const ServiceMutationResolver = async (getService:Promise<ServiceData>): Promise<ServiceMutationResult> => {
  try {
    return {
      status : { success: true },
      service: (await getService) 
    } as ServiceMutationResult;
  }
  catch(error){
    console.error("Service > Mutation  : ",error);
    return  {
      status : { success: false, errorMessage: error.message },
      service: null
    } as ServiceMutationResult;
  }
}

const service : Resolvers = {
  Service: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityCosmosdbApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
  },
  Query: {
    service: async (_parent, args, context, _info) => {
      return (await context.dataSources.serviceCosmosdbApi.getServiceById(args.id)) as Service;
    },
    servicesByCommunityId: async (_parent, {communityId}, context, _info) => {
      return (await context.dataSources.serviceCosmosdbApi.getServicesByCommunityId(communityId)) as Service[];
    }
  },
  Mutation: {
    serviceCreate: async (_, { input }, {dataSources}) => {
      return ServiceMutationResolver( dataSources.serviceDomainAPI.serviceCreate(input));
    },
    serviceUpdate: async (_, { input }, {dataSources}) => {
      return ServiceMutationResolver( dataSources.serviceDomainAPI.serviceUpdate(input));
    },
  }
}

export default service;