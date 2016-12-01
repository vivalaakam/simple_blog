import {
  GraphQLInt,
  GraphQLObjectType
} from 'graphql';

const Counter = new GraphQLObjectType({
  name: 'Counter',
  fields() {
    return {
      counter: {
        type: GraphQLInt
      }
    };
  }
});

export default Counter;
