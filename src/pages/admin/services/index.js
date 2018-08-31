import config from '../../../config/index';
import request from '../../../utils/request';

export function projectservers(data) {
  return request({
    url: `${config.apiUrl}/fabric/projectservers`,
    method: 'post',
    data
  });
}

export function serverinfo(data) {
  return request({
    url: `${config.apiUrl}/fabric/serverinfo`,
    method: 'post',
    data
  });
}

export function operate(data) {
  return request({
    url: `${config.apiUrl}/fabric/dockeraction`,
    method: 'post',
    data
  });
}

export function topology(data) {
  return request({
    url: `${config.apiUrl}/fabric/topology`,
    method: 'post',
    data
  });
}