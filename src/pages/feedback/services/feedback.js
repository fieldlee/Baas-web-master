import config from '../../../config/index';
import request from '../../../utils/request';

export function feedback(data) {
  return request({
    url: `${config.apiUrl}/setup/feedback`,
    method: 'post',
    data
  });
}
