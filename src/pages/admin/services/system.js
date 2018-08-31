import config from '../../../config/index';
import request from '../../../utils/request';

export function getSystemUserList(data) {
  return request({
    url: `${config.apiUrl}/setup/userlist`,
    method: 'post',
    data
  });
}

export function getSystemProjectList() {
  return request({
    url: `${config.apiUrl}/getlist`,
    method: 'post',
    
  });
}
export function getSystemMainList(data) {
  return request({
    url: `${config.apiUrl}/setup/projectlist`,
    method: 'post',
    data
  });
}
export function getSystemLogList(data) {
  return request({
    url: `${config.apiUrl}/setup/loglist`,
    method: 'post',
    data
  });
}
