import { GraphQLError } from 'graphql';
import { shield, allow } from 'graphql-shield';
import { Context } from '../../context';
import { Resolvers } from '../../generated';


const defaultPermissions = shield<Resolvers,Context>({
  User: {
    "*": allow
  },
  Query: {
    "*": allow
  },
  Mutation: {
    "*": allow
  },
}, {
  fallbackRule: allow,
  fallbackError: async (thrownThing, parent, args, context, info) => {
    if (thrownThing instanceof GraphQLError) {
      // expected errors
      return thrownThing
    } else if (thrownThing instanceof Error) {
      // unexpected errors
      console.error(thrownThing)
//      await Sentry.report(thrownThing)
      return new GraphQLError('Internal server error1', {
        extensions: { code: 'ERR_INTERNAL_SERVER' }
      });
    } else {
      // what the hell got thrown
      console.error('The resolver threw something that is not an error.')
      console.error(thrownThing)
      return new GraphQLError('Internal server error2S', {
        extensions: { code: 'ERR_INTERNAL_SERVER' },
      });
    }
  },
});

export default defaultPermissions;