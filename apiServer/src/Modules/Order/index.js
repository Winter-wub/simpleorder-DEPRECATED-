import {
  getOrders,
  getOrderByid,
  createOrder,
  editOrder,
  deleteOrder,
  finishOrder,
  addtoOrder,
  dishDel,
  setCost,
  setDelivercost,
} from './query';

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
    const {
      RestaurantName, RestaurantUrl, Creator, CloseDate, url, tel,
    } = req.body;
    const data = await createOrder(RestaurantName, RestaurantUrl, Creator, CloseDate, url, tel);
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
    const { OrderId } = req.body;
    const data = await finishOrder(OrderId);
    reply.send(data);
  });

  fastify.post('/api/Orders/:id', async (req, reply) => {
    const OrderId = req.params.id;
    const { DishName, unit, Name } = req.body;
    const data = await addtoOrder(OrderId, Name, DishName, unit);
    reply.send(data);
  });

  fastify.post('/api/Orders/dishdel/:id', async (req, reply) => {
    const { id } = req.params;
    const { Name, DishName } = req.body;
    const data = await dishDel(id, Name, DishName);
    reply.send(data);
  });

  fastify.post('/api/Orders/setCost/:id', async (req, reply) => {
    const { id } = req.params;
    const { DishName, Cost } = req.body;
    const data = await setCost(id, DishName, Cost);
    reply.send(data);
  });

  fastify.post('/api/Orders/setCost/dev/:id', async (req, reply) => {
    const { id } = req.params;
    const { Cost } = req.body;
    const data = await setDelivercost(id, Cost);
    reply.send(data);
  });

  next();
};
