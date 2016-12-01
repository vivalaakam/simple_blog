import {
  GraphQLObjectType
} from 'graphql';
import Counter from './types/counter';
import * as counter from '../dataStore/counter';

export default new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    counter: {
      type: Counter,
      resolve() {
        return counter.get();
      }
    }
  }
});
