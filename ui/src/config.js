const ip = '127.0.0.1';
const port = '3001';
const configs = {
  url: `http://${ip}:${port}/api/Orders/`,
  urlDelete: `http://${ip}:${port}/api/order/delete`,
  urlSetcost: `http://${ip}:${port}/api/Orders/setCost/`,
};

module.exports = configs;
