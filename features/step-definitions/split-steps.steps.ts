import { Before, Given, When } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { Register } from '../../screenplay/tasks/register';
import { InteractWithTheDomain } from '../../screenplay/abilities/domain/interact-with-the-domain';

// Before(() => {
//   InteractWithTheDomain.init();
// });

Given('{actor} registers with Owner Community', async function(actor: Actor){
  await actor
    .attemptsTo(
        Register.asUser(),
    );
  });

When('{pronoun} creates community named {word}', async function(actor: Actor, communityName: string){
  await actor
    .attemptsTo(
    );
  }
  );

  Given('{actor} is on the MG page', function (actor: Actor) {
    // Write code here that turns the phrase above into concrete actions
    // return 'pending';
    console.log('==> MG Page: ',actor);
  });


