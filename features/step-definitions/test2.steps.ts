import { DataTable, Given, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateProperty } from '../../screenplay/tasks/create-property';
import { Ensure, equals } from '@serenity-js/assertions';
import { PropertyInDb } from '../../screenplay/questions/property-in-db';

Given('{actor} creates a community called {word}', async function (actor: Actor, communityName: string) {
  actor.attemptsTo(Register.asUser(), await CreateCommunity.named(communityName));
});

Then('{actor} creates a property called {word} in {word}', async function (actor: Actor, propertyName: string, communityName: string) {
  // Write code here that turns the phrase above into concrete actions
  await actor.attemptsTo(CreateProperty.inCommunity(communityName).asNewPropertyNamed(propertyName));
});

Then('the property {word} created by {actor} exists in the community {word}', async function (propertyName: string, actor: Actor, communityName: string) {
  // Write code here that turns the phrase above into concrete actions

  await actor.attemptsTo(Ensure.that((await PropertyInDb(propertyName)).community.name, equals(communityName)));
});
