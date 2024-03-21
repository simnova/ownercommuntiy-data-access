
import { Interaction } from '@serenity-js/core';
import { Actor } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { CommunityInDb } from '../questions/community-in-db';
import { CommunityEntityReference } from '../../domain/contexts/community/community';




export const AssignRoleInDb = (
  communityName: string,
  roleName: string,
  memberName: string
) => {
    return Interaction.where(`#actor assigns role to user`, async (actor:Actor) => {
     
