import {login} from '../services/login';
import auth from '../../../utils/auth';
import {message as Message} from 'antd';

export default {
  namespace: 'account/login',
  state: {
    username: '',
    token: ''
  },
  effects: {
    * login({payload}, {call}) {
      const {code, data, message} = yield call(login, payload);
      if (code >= 200 && code < 300) {
        const {token, username, role} = data;
        auth.setAuthHeader(token);
        auth.setUser({username, role});
        if (role === 'user') {
          window.location.href = '/panel';
        } else {
          window.location.href = '/admin'
        }
      } else {
        Message.error(message);
      }
    }
  }
};
