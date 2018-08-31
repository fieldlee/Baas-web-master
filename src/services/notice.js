import config from '../config/index';
import request from '../utils/request';

export function getAnnounce() {
  return request({
    url: `${config.apiUrl}/setup/getannounce`,
    method: 'post'
  });
}
