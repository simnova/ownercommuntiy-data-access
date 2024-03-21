import { Given, When } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { Register } from '../../screenplay/tasks/register';
import { CreateCommunity } from '../../screenplay/tasks/create-community';

Given('{actor} registers with Owner Community', async function(actor: Actor){
  await actor
    .attemptsTo(
        Register.asUser(),
        await CreateCommunity.named('other-community'),
    );
  });

When('{pronoun} creates community named {word}', async function(actor: Actor, communityName: string){
  await actor
    .attemptsTo(
    );
  }
  );


