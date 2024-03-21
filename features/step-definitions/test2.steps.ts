import { DataTable, Given } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';
import { CreateRole } from '../../screenplay/tasks/create-role';

Given('{actor} creates a community called {word}', function (actor: Actor, communityName: string) {
  actor.attemptsTo(Register.asUser(), CreateCommunity.named(communityName));
});

Given(
  '{actor} creates the {word} role in {word} with the following permissions:',
  async function (actor: Actor, roleName: string, communityName: string, dataTable: DataTable) {
    actor.attemptsTo(CreateRole.inCommunity(communityName).asNewRoleNamed(roleName).withPermissions(dataTable.rowsHash()));
  }
);

Given('{actor} is a member of {word}', function (actor: Actor, communityName: string) {
  actor.attemptsTo(Register.asUser())})
