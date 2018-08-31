import config from '../../../config/index';
import request from '../../../utils/request';

export function getSystemUserList() {
  return request({
    url: `${config.apiUrl}/setup/userlist`,
    method: 'post'
  });
}

export function getSystemProjectList() {
  return request({
    url: `${config.apiUrl}/setup/getlist`,
    method: 'post'
  });
}

export function getSystemLogList(data) {
  return request({
    url: `${config.apiUrl}/setup/loglist`,
    method: 'post',
    data
  });
}
