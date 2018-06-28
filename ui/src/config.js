const ip = 'http://192.168.1.250';
const port = '3334';
const configs = {
  url: `http://${ip}:${port}/api/Orders/`,
  urlDelete: `http://${ip}:${port}/api/order/delete`,
  urlSetcost: `http://${ip}:${port}/api/Orders/setCost/`,
};

module.exports = configs;
