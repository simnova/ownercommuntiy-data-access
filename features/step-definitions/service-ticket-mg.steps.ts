import { Before, Given, When, Then, DataTable, BeforeAll } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { InteractWithTheDomain } from '../support/domain/abilities/interactWithTheDomain';
import { SystemExecutionContext } from '../../domain/infrastructure/execution-context';
import { RegisterWithOwnerCommunity } from '../support/tasks/register-with-owner-community';
import { CreateRole } from '../support/tasks/create-role';
import { CreateCommunity } from '../support/tasks/create-community';


Given('{actor} creates {word} community', async function(actor: Actor, communityName: string){
  await actor
    .whoCan(
      InteractWithTheDomain.using(SystemExecutionContext()),
    )
    .attemptsTo(
      RegisterWithOwnerCommunity.asNewUser(),
      CreateCommunity
        .asNew(communityName),
      CreateRole
          .inCommunity(communityName)
            .asNewRole('manager')
              .withPermissions(['read', 'write']),
    );

    InteractWithTheDomain.using(SystemExecutionContext()).readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    InteractWithTheDomain.using(SystemExecutionContext()).readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    InteractWithTheDomain.using(SystemExecutionContext()).readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });
    
  });


