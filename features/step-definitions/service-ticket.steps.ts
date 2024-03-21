import { Given, When, DataTable } from '@cucumber/cucumber';
import { Actor, Wait } from '@serenity-js/core';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';
import { CreateProperty } from '../../screenplay/tasks/create-property';
import { LogDataSources } from '../../screenplay/tasks/log-data-sources';
import { CommunityInDb } from '../../screenplay/questions/community-in-db';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { RoleForCommunityInDb } from '../../screenplay/questions/role-for-community-in-db';

Given('test setup', async function(){});

Given('{actor} creates {word} community', async function(actor: Actor, communityName: string){
  await actor
    .attemptsTo(
        Register.asUser()
        , await CreateCommunity.named(communityName)
        // , Wait.until((await CommunityInDb(communityName)), isPresent())
        // , Wait.until((await RoleForCommunityInDb(communityName, 'admin')), isPresent())
        , Ensure.eventually((await RoleForCommunityInDb(communityName, 'admin')), isPresent())
        // , LogDataSources()
        ,LogDataSources('service-ticket-steps::{actor}'),
    );
  });

  When('{pronoun} creates {word} role in {word} community with following permissions:', async function(actor: Actor, roleName: string, communityName: string, dataTable: DataTable){
    console.log(` ^^ actor: ${actor.name}`)
    LogDataSources('service-ticket-steps::{pronoun}'),
    console.log(`+++  after log data sources`)
    await actor
      .attemptsTo(
        CreateRole
          .inCommunity(communityName)
          .asNewRoleNamed(roleName)
          .withPermissions(dataTable.rowsHash())
        , CreateProperty
          .inCommunity(communityName)
          .asNewPropertyNamed('property1')
      );
      console.log(`@@@ after tasks`)
  });
  



