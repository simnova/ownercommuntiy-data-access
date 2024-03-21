import { Actor, Interaction, Task } from '@serenity-js/core/lib/screenplay';
import { InteractWithTheDomain } from '../abilities/domain/interact-with-the-domain';

export const LogDataSources = (description: string) => Task.where(`#actor logs all data sources`,
  Interaction.where(`#actor logs all data sources`, async (actor:Actor) => {
    (await InteractWithTheDomain.asReadOnly()).logDatabase(description);
    (await InteractWithTheDomain.asReadOnly()).logSearchDatabase(description);
  })
)


