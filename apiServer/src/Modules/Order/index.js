import { getOrders, getOrderByid, createOrder, editOrder, deleteOrder, finishOrder } from './query';

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
    const { RestaurantName, RestaurantUrl, Creator } = req.body;
    const data = await createOrder(RestaurantName, RestaurantUrl, Creator);
    reply.send(data);
  });

  fastify.patch('/api/Orders/', async (req, reply) => {
    const { RestaurantName, RestaurantUrl, OrderId } = req.body;
    const data = await editOrder(RestaurantName, RestaurantUrl, OrderId);
    reply.send(data);
  });

  fastify.delete('/api/order/delete/:id', async (req, reply) => {
    const { id } = req.params;
    const data = await deleteOrder(id);
    reply.send(data);
  });

  fastify.post('/api/Orders/finish/', async (req, reply) => {
    const { id } = req.body.OrderId;
    const data = await finishOrder(id);
    reply.send(data);
  });

  next();
};
