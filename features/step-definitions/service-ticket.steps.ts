import { Given, When, DataTable } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { CreateRole } from '../../screenplay/tasks/create-role';
import { CreateCommunity } from '../../screenplay/tasks/create-community';
import { Register } from '../../screenplay/tasks/register';
import { CreateProperty } from '../../screenplay/tasks/create-property';
import { CreateServiceTicket } from '../../screenplay/tasks/create-service-ticket';
import { AssignRole } from '../../screenplay/tasks/assign-role';
// import { LogDataSources } from '../../screenplay/tasks/log-data-sources';

Given('test setup', async function(){});

Given('{actor} creates {word} community', async function(actor: Actor, communityName: string){
  await actor
    .attemptsTo(
        Register.asUser()
        , CreateCommunity.named(communityName)

    );
  });

  When('{pronoun} creates {word} role in {word} community with following permissions:', async function(actor: Actor, roleName: string, communityName: string, dataTable: DataTable){
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
  });

  When('{pronoun} assigns {word} role in {word} community to {word} with following permissions:', async function(actor: Actor, roleName: string, communityName: string, memberName: string, dataTable: DataTable){
    await actor
      .attemptsTo(
        AssignRole
          .named(roleName)
          .withPermissions(dataTable.rowsHash())
          .inCommunity(communityName)
          .toUser({roleName, username: memberName, ...dataTable.rowsHash()})
      );
  });

  When('{actor} creates a service ticket for their property in the {word} community', async function(actor: Actor, communityName: string){
    await actor
    .attemptsTo(
      CreateServiceTicket
        .inCommunity(communityName)
        .asTicketCalled('service1')
        .withDescription('description1')

    );
  });

  


  // Given('{actor} is a member of the {word} community', async (actor: string, communityName: string) => {
  //   const actor = actorCalled(actor);
  //   await actor.attemptsTo(
  //     IsMemberOfCommunity.named(communityName)
  //   );
  // });
  

  