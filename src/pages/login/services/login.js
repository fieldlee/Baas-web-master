import config from '../../../config/index';
import request from '../../../utils/request';

export function login(data) {
  return request({
    url: `${config.apiUrl}/login`,
    method: 'post',
    data
  });
}
