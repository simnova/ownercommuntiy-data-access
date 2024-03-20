import { Actor, Duration, Interaction, Task, WaitUntil } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { CommunityInDb } from '../questions/community-in-db';
import { RoleForCommunityInDb } from '../questions/role-for-community-in-db';
import { actorInTheSpotlight } from '@serenity-js/core';

export const CreateCommunity = ({
    named: async (communityName: string) => Task.where(`#actor creates ${communityName} community`,
        Interaction.where(`#actor creates ${communityName} community`, async (actor:Actor) => {
            (await InteractWithTheDomain.asUser(actor)).createCommunity(communityName);
        }),
        new WaitUntil((await CommunityInDb(communityName)).answeredBy(actorInTheSpotlight()), isPresent(), Duration.ofMilliseconds(100), Duration.ofMilliseconds(5000)),
        new WaitUntil((await RoleForCommunityInDb(communityName, 'admin')).answeredBy(actorInTheSpotlight()), isPresent(), Duration.ofMilliseconds(100), Duration.ofMilliseconds(5000)),
        // Ensure.eventually((await CommunityInDb(communityName)).answeredBy(actorInTheSpotlight()), isPresent()),
        // Ensure.eventually((await RoleForCommunityInDb(communityName, 'admin')).answeredBy(actorInTheSpotlight()), isPresent()),
    )
});


