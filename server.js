import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import setRouterContext from './middleware/routerContext';
import render from './middleware/render';
import graph from './middleware/graph';
import schema from './graphql/schema';

const port = process.env.PORT || 3000;
const app = express();

function getStaticAssets() {
  return (process.env.NODE_ENV === 'development')
    ? require('./middleware/hot-reload') // eslint-disable-line
    : express.static('static');
}

app.use(getStaticAssets());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', graph);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/*', setRouterContext, render);

app.listen(port, () => {
  /* eslint no-console: ["error", { allow: ["log"] }] */
  console.log(`Listening on port ${port}`);
});
