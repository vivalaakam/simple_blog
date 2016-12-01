import {
  GraphQLObjectType
} from 'graphql';
import * as counter from './mutations/counter';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    counterIncrement: counter.increment,
    counterDecrement: counter.decrement,
    counterReset: counter.reset
  }
});
