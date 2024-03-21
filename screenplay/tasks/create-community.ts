import { Actor, Duration, Interaction, Task, Wait } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { CommunityInDb } from '../questions/community-in-db';
import { RoleForCommunityInDb } from '../questions/role-for-community-in-db';
import { actorInTheSpotlight } from '@serenity-js/core';

export const CreateCommunity = ({
    named: async (communityName: string) => Task.where(`#actor creates ${communityName} community`,
        await Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            await (await InteractWithTheDomain.asUser(actor)).createCommunity(communityName);
            (await InteractWithTheDomain.asReadOnly()).logDatabase('Task::CreateCommunity');
        }),
        // Wait.for(Duration.ofMilliseconds(1_500)),
        // wait for community to be saved in database
        // Wait.until((await CommunityInDb(communityName)).answeredBy(actorInTheSpotlight()), isPresent()),
        // Ensure.eventually((await CommunityInDb(communityName)).answeredBy(actorInTheSpotlight()), isPresent()),
        )
});


