
import axios from 'axios';
import qs from 'querystring';

const BASE_URL = 'https://notify-api.line.me';
const PATH = '/api/notify';
const token = 'SB9t3CS2uUpbEjszBbqcKKJb9KRC7yWjM6sH3o2FZO0';


const sendmsg = async (msg = 'Not config msg') => {
  const config = {
    baseURL: BASE_URL,
    url: PATH,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
    data: qs.stringify({
      message: msg,
    }),
  };
  const result = await axios.request(config);
  return result;
};


export default sendmsg;
