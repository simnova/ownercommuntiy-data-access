import { Task } from '@serenity-js/core/lib/screenplay';
import { AssignRoleInDb } from '../interactions/assign-role.in-db';

export const AssignRole = ({

    inCommunity: (communityName: string) => ({

        toUser: (userData: Record<string, string>) => Task.where(`#actor assigns role to user in ${communityName} community`,                
            AssignRoleInDb(),


        ),

    }),
}); 