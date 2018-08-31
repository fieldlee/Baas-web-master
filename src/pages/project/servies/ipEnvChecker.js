import config from '../../../config/index';
import request from '../../../utils/request';

export function getIpEnv(data) {
  return request({
    url: `${config.apiUrl}/fabric/checkenv`,
    method: 'post',
    data
  });
}
