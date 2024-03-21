
import { Interaction, Actor } from '@serenity-js/core';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';
import { CommunityInDb } from '../questions/community-in-db';
import { CommunityEntityReference } from '../../domain/contexts/community/community';


export const CreateServiceTicketInDB = (
    communityName: string,
    serviceName: string,
    description: string,

    ) => {
        return Interaction.where(`#actor creates service ticket`, async (actor:Actor) => {
            const community = await (await CommunityInDb(communityName)).answeredBy(actor) as CommunityEntityReference;
            (await (await InteractWithTheDomain.asUser(actor)).asMemberOf(communityName)).actOnServiceTicket(async (repo) => { 
                const newServiceTicket = await repo.getNewInstance(serviceName, description, community);
                await repo.save(newServiceTicket);
            });

        }
    )
    }