import { Question } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { CommunityProps } from '../../domain/contexts/community/community';

export const CommunityInDb = async (communityName: string) => Question.about(`read ${communityName} community`, async (actor) => {
   let community: CommunityProps;
   await InteractWithTheDomain.asSystem().readCommunityDb(async (db) => {
      community = (await db.getAll()).find((c) => c.name === communityName);
   });
    return community;
 });
    
