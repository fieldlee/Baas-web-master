import axios from 'axios';
import auth from '../utils/auth';

export default async function fetch(config, h) {
  const headers = Object.assign({}, h, {Authorization: auth.getAuthHeader()});
  const instance = axios.create({headers});
  const response = await instance.request(config).catch((e) => ({
    code: e.status,
    data: {},
    message: e.statusText
  }));
  let {code, data, msg} = response.data;

  try {
    data = JSON.parse(data);
  } catch (e) {
    data = {};
  }

  return {
    code,
    data,
    message: msg
  };
}
