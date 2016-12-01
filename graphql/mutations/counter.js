import { GraphQLNonNull, GraphQLInt } from 'graphql';
import Counter from '../types/counter';
import * as counter from '../../dataStore/counter';

const increment = {
  type: Counter,
  description: 'Increment counter',
  args: {
    payload: {
      name: 'Payload',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve(root, { payload }) {
    return counter.increment(payload);
  }
};

const decrement = {
  type: Counter,
  description: 'Decrement counter',
  args: {
    payload: {
      name: 'Payload',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve(root, { payload }) {
    return counter.decrement(payload);
  }
};

const reset = {
  type: Counter,
  description: 'Reset counter',
  resolve() {
    return counter.reset();
  }
};


export {
  increment, decrement, reset
};
