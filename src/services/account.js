import config from '../config/index';
import request from '../utils/request';

// param: username, password, telno, email, verifycode, checkcode, random
export function account(data) {
  return request({
    url: `${config.apiUrl}/register`,
    method: 'post',
    data
  });
}

// param: random
export function getCheckCode(data) {
  return request({
    url: `${config.apiUrl}/getcheckcode`,
    method: 'post',
    data
  });
}

// param: telno
export function getVerifyCode(data) {
  return request({
    url: `${config.apiUrl}/getverifycode`,
    method: 'post',
    data
  });
}

export function sendEmail(data) {
  return request({
    url: `${config.apiUrl}/setup/emailcode`,
    method: 'post',
    data
  });
}

export function modifyPassword(data) {
  return request({
    url: `${config.apiUrl}/setup/modifypassword`,
    method: 'post',
    data
  });
}

export function activePassword(data) {
  return request({
    url: `${config.apiUrl}/activepassword`,
    method: 'post',
    data
  });
}

// telnet: *手机号码
// verifycode: *手机验证码
export function forgotPassword(data) {
  return request({
    url: `${config.apiUrl}/forgotpassword`,
    method: 'post',
    data
  });
}

export function activeUser(data) {
  return request({
    url: `${config.apiUrl}/activeuser`,
    method: 'post',
    data
  });
}

export function getUser() {
  return request({
    url: `${config.apiUrl}/setup/getuser`,
    method: 'post'
  });
}

export function saveuser(data) {
  return request({
    url: `${config.apiUrl}/setup/saveuser`,
    method: 'post',
    data
  });
}


export function checkUser(data) {
  return request({
    url: `${config.apiUrl}/checkuser`,
    method: 'post',
    data
  });
}

export function checkEmail(data) {
  return request({
    url: `${config.apiUrl}/checkemail`,
    method: 'post',
    data
  });
}

export function checkPhone(data) {
  return request({
    url: `${config.apiUrl}/checktelno`,
    method: 'post',
    data
  });
}
