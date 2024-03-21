import { CreateServiceTicketInDB } from '../interactions/create-service-ticket-in-db';
import { Task, Activity } from '@serenity-js/core/lib/screenplay';


export const CreateServiceTicket = ({
  inCommunity: (communityName: string) => ({
    asTicketCalled: (serviceName: string) => ({
      withDescription: (description: string) => 
        Task.where(`#actor creates a service ticket in ${communityName} community`,                
          CreateServiceTicketInDB(communityName, serviceName, description),
        ),
    }),
  }),
});

        