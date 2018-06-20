import { getOrder } from './query';

// console.log('getOrder', getOrder);

(async () => {
  const data = await getOrder();
  console.log(data);
})();

