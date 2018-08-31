import config from '../config/index';
import request from '../utils/request';

export function getProjectList(data) {
  return request({
    url: `${config.apiUrl}/getlist`,
    method: 'post',
    data
  });
}

export function getProjectDetail(data) {
  return request({
    url: `${config.apiUrl}/getproject`,
    method: 'post',
    data
  });
}

export function remove(data) {
  return request({
    url: `${config.apiUrl}/fabric/deleteproject`,
    method: 'post',
    data
  });
}

export function saveProject(data) {
  return request({
    url: `${config.apiUrl}/fabric/saveproject`,
    method: 'post',
    data
  });
}

export function resaveProject(data) {
  return request({
    url: `${config.apiUrl}/fabric/resaveproject`,
    method: 'post',
    data
  });
}

export function createChainCode(data) {
  let urlKey = 'installchaincode';
  const uploadfile = data.uploadfile;
  let headers;
  if (uploadfile) {
    let bodyFormData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        bodyFormData.set(key, data[key]);
      }
    }
    data = bodyFormData;
    urlKey = 'uploadchaincode';
    headers = {
      'Content-Type': 'multipart/form-data'
    };
  }
  return request(Object.assign({}, {
    url: `${config.apiUrl}/fabric/${urlKey}`,
    method: 'post',
    data
  }, headers));
}

export function createChannel(data) {
  return request({
    url: `${config.apiUrl}/fabric/generatechan`,
    method: 'post',
    data
  });
}

export function deploy(data) {
  return request({
    url: `${config.apiUrl}/fabric/deployenv`,
    method: 'post',
    data
  });
}

export function getIpEnv(data) {
  return request({
    url: `${config.apiUrl}/fabric/checkenv`,
    method: 'post',
    data
  });
}

export function reInstallEnv(data) {
  return request({
    url: `${config.apiUrl}/fabric/installenv`,
    method: 'post',
    data
  });
}

export function getBlockAndTxCount(data) {
  return request({
    url: `${config.apiUrl}/fabric/allblocktx`,
    method: 'post',
    data
  });
}

export function getChartBlockAndTx(data) {
  return request({
    url: `${config.apiUrl}/fabric/chatblocktx`,
    method: 'post',
    data
  });
}
