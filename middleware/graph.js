/* eslint new-cap: "off" */

import { Router } from 'express';
import { graphql } from 'graphql';
import schema from '../graphql/schema';

const router = Router();

router.post('/', (req, res) => {
  const query = req.body.query;
  graphql(schema, query).then((data) => {
    res.json(data);
  });
});

export default router;
