import { getOrders, getOrderByid, createOrder } from './query';

module.exports = (fastify, option, next) => {
  fastify.get('/api/Orders/', async (req, reply) => {
    const data = await getOrders();
    reply.send(data);
  });

  fastify.get('/api/Orders/:id', async (req, reply) => {
    const { id } = req.params;
    const orderId = id;
    const data = await getOrderByid(orderId);
    reply.send(data);
  });

  fastify.post('/api/Orders/', async (req, reply) => {
   
  });
  next();
};
