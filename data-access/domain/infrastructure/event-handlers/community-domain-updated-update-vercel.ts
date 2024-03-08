import { NodeEventBus } from '../core/events/node-event-bus';
import { IVercel } from '../../../infrastructure/services/vercel';
import { CommunityDomainUpdatedEvent } from '../../events/community-domain-updated';

export default (vercel: IVercel) => {
  NodeEventBus.register(CommunityDomainUpdatedEvent, async (payload) => {
    console.log(`CommunityDomainUpdatedEvent -> Update Vercel - Called with Payload: ${JSON.stringify(payload)}`);

    try {
      if (payload.oldDomain && payload.oldDomain.trim.length > 0) {
        await vercel.removeDomainFromProject(payload.oldDomain);
      }
    } catch (error) {
      console.log(`CommunityDomainUpdatedEvent -> Remove Old Domain from Vercel - Error: ${error}`);
    }

    if (payload.domain && payload.domain.trim.length > 0) {
      try {
        const result = await vercel.addDomainToProject(payload.domain);
        if (!result.success) {
          console.log(`CommunityDomainUpdatedEvent -> Add New Domain to Vercel - Error: ${result.error.message}`);
        } else {
          console.log(`CommunityDomainUpdatedEvent -> Add New Domain to Vercel - Success: ${payload.domain}`);
        }
      } catch (error) {
        console.log(`CommunityDomainUpdatedEvent -> Add New Domain to Vercel - Error: ${error}`);
      }
    }
  });
};
