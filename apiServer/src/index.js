import 'babel-polyfill';
import cors from 'cors';

const fastify = require('fastify')();

const port = 3001;

fastify.use(cors());
fastify.register(require('./Modules/Order/'), (err) => {
  if (err) console.log(err);
});

fastify.get('/api/healthcheck', async (req, reply) => {
  reply.send({ data: 'ok' });
});

fastify.get('/', async (req, reply) => {
  reply.send({ 'Simple Order API build from fastify framework.': '' });
});

fastify.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`Server Running on ${port}`);
});
