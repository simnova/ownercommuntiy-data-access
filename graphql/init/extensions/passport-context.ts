import { PassportImpl, Passport, ReadOnlyPassport } from "../../../domain/contexts/iam/passport";
import { Context } from "../../context";

import { UserConverter } from '../../../domain/infrastructure/persistence/user.domain-adapter';
import { MemberConverter } from '../../../domain/infrastructure/persistence/member.domain-adapter';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { HttpRequest } from "@azure/functions";
import { Community, CommunityModel } from "../../../infrastructure/data-sources/cosmos-db/models/community";
import { isValidObjectId } from "mongoose";
import { UserModel } from "../../../infrastructure/data-sources/cosmos-db/models/user";
import { MemberModel } from "../../../infrastructure/data-sources/cosmos-db/models/member";

export const decorateContext = async (context: Partial<Context>, req:HttpRequest): Promise<void> => {
  let communityHeader = req.headers['community'];
  if(!communityHeader || communityHeader === '') {
    console.log(' == ERROR 0== ', context);
    context.passport = ReadOnlyPassport.GetInstance();
    context.community = null;
  }
  let mongoCommunity = await getCommunityByHeader(communityHeader);
  if(
    !context.verifiedUser || 
    !context.verifiedUser.verifiedJWT ||
    !context.verifiedUser.verifiedJWT.sub ||
    !mongoCommunity
    ) {
      console.log(' == ERROR 1== ', mongoCommunity, context);
      context.passport = ReadOnlyPassport.GetInstance();
      context.community = null;
  }
  try {
    context.passport = await getPassport(context, mongoCommunity);
    context.community = mongoCommunity.id;   
    console.log(' == CONTEXT DECORATED SUCCESSFULLY == ');
  } catch (error) {
    console.log(' == ERROR 2== ', error);
    context.passport = ReadOnlyPassport.GetInstance();
    context.community = null;
  }
}

const getPassport = async (context: Partial<Context>, mongoCommunity: Community) => {
  let readOnlyPassport = ReadOnlyPassport.GetInstance();
  let userExternalId = context.verifiedUser.verifiedJWT.sub;
  let mongoUser = await UserModel.findOne({externalId:userExternalId}).exec();
  let mongoMember = (
      await (MemberModel
        .findOne({community: mongoCommunity.id, 'accounts.user': mongoUser.id})
        .populate('community')
        .populate('accounts.user')
        .populate('role')
        .exec())
      )

  if(mongoCommunity && mongoMember && mongoUser) {
    console.log('here')
    let userDo = new UserConverter().toDomain(mongoUser, {passport: readOnlyPassport});
    let memberDo = new MemberConverter().toDomain(mongoMember,{passport: readOnlyPassport});
    let communityDo = new CommunityConverter().toDomain(mongoCommunity, {passport: readOnlyPassport});
    return new PassportImpl(userDo, memberDo, communityDo);
  }
  console.log(' == ERROR == ');
  return readOnlyPassport;
}

const getCommunityByHeader = async ( header: string): Promise<Community>  => {
    if(isValidObjectId(header)) {
      console.log('valid header!objectId');
      return CommunityModel.findById(header);
    }
    return CommunityModel.findOne({
      $or: [
        {handle: header},
        {domain: header},
        {whileLabelDomain: header}
      ]
      });
  }
  {}