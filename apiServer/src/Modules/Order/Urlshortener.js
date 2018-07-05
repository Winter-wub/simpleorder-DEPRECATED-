import axios from 'axios';
import qs from 'qs';

const shorturl = async (url) => {
  const result = await axios.post('http://gg.gg/create', qs.stringify({ long_url: url }));
  return result.data;
};

export default shorturl;
