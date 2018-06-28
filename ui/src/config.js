const host = 'http://192.168.1.250';
const port = '3334';
const configs = {
  url: `${host}:${port}/api/Orders/`,
  urlDelete: `${host}:${port}/api/order/delete`,
  urlSetcost: `${host}:${port}/api/Orders/setCost/`,
};

module.exports = configs;
