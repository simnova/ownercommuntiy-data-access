import { NodeEventBus } from '../../domain-eventbus-impl-node/node-event-bus';
import { PropertyListingIndexDocument, PropertyListingIndexSpec } from './property-search-index-format';
import { ICognitiveSearch } from '../services/ICognitiveSearch';
import { PropertyDeletedEvent } from '../events/property-deleted';

export default (cognitiveSearch:ICognitiveSearch) => {
  NodeEventBus.register(PropertyDeletedEvent, async (payload) => {
    console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    let listingDoc: Partial<PropertyListingIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(PropertyListingIndexSpec.name, listingDoc);
  });
};
