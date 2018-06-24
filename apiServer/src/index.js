import cors from 'cors';

const fastify = require('fastify')();

const port = 3001;

fastify.use(cors());
fastify.register(require('./Modules/Order/'), (err) => {
  if (err) console.log(err);
});

fastify.listen(port, 'localhost', (err) => {
  if (err) throw err;
  console.log(`Server Runing on ${port}`);
});
