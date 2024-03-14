import { Question, Task, notes } from '@serenity-js/core/lib/screenplay';
import { CommunityProps } from '../../../domain/contexts/community/community';
import { InteractWithTheDomain } from '../domain/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../../domain/infrastructure/execution-context';

const GetCommunityInfo = (communityName: string) =>
    Question.about('User list contains user', async (actor) => {
      let community: CommunityProps;
      await InteractWithTheDomain.using(SystemExecutionContext()).readCommunityDb(async (db) => {
        community = (await db?.getAll())?.find(c => c.name === communityName);
      });
       return community;
    });


export const CreateRole = ({
    inCommunity: (communityName: string) => ({
        asNewRole: (roleName: string) => ({
            withPermissions: (permissions: string[]) => Task.where(`#actor creates ${roleName} role in ${communityName} community`,
                notes().set('community', GetCommunityInfo(communityName)),
                //     CreateRole(roleName, communityName),
            ),
        }),
    }),
});
