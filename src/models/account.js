import {
  account,
  getCheckCode,
  getVerifyCode,
  forgotPassword,
  activePassword,
  activeUser,
  saveuser,
  sendEmail,
  getUser,
  checkUser,
  modifyPassword, checkPhone, checkEmail
} from '../services/account';
import {message as Message} from 'antd';

export default {
  namespace: 'account',
  state: {
    user: null,
    type: 'phone',
    isShow: false,
    username: '',
    password: '',
    random: '',
    checkcode: '',
    verifycode: '',
    isEmailSend: false,
    isPhoneSend: false,
    isSuccess: false,
    isRecoverPassword: false,
    isRecoverSuccess: false,
    token: ''
  },
  subscriptions: {
    setup({dispatch, history}) {
      const location = history.location;
      const token = location.query.s;
      if (location.pathname === '/account/active') {
        dispatch({
          type: 'active',
          payload: {
            token
          }
        });
      }
      if (location.pathname === '/account/forgot' && token) {
        dispatch({
          type: 'recoverPassword',
          payload: {
            token
          }
        });
      }
      if (location.pathname === '/center') {
        dispatch({
          type: 'getUser'
        });
      }
    }
  },
  reducers: {
    setCheckCode(state, {payload}) {
      const checkcode = payload.verifycode;
      const random = payload.random;
      return {...state, checkcode, random};
    },

    setVertifyCode(state, {payload}) {
      return {...state, ...payload}
    },

    onActive(state, {data}) {
      return {...state, isSuccess: true};
    },

    setSendButtonStatus(state, {payload}) {
      return {...state, ...payload};
    },

    changeVertifyType(state, {payload}) {
      return {...state, ...payload};
    },

    showModal(state, {payload}) {
      return {...state, ...payload, isShow: true};
    },

    hideModal(state) {
      return {...state, isShow: false};
    },

    success(state) {
      return {...state, isSuccess: true};
    },

    setUserInfo(state, {payload}) {
      return {...state, user: payload}
    },

    recoverPassword(state, {payload}) {
      return {...state, ...payload, isRecoverPassword: true};
    },

    showModifyPasswordSuccess(state, {payload}) {
      return {...state, ...payload, isRecoverSuccess: true}
    }
  },
  effects: {
    * register({payload}, {call, put}) {
      const {message, code} = yield call(account, payload);
      if (code === 200) {
        yield put({
          type: 'success'
        });
        yield put({
          type: 'showModal',
          payload
        });
      } else {
        yield Message.error(message);
      }
    },

    * checkUser({payload}, {call, put}) {
      const {message, data, code} = yield call(checkUser, payload);
      if (code >= 200 && code < 300) {
        payload.cb();
      } else {
        payload.cb(message);
      }
    },

    * checkEmail({payload}, {call, put}) {
      const {message, data, code} = yield call(checkEmail, payload);
      if (code >= 200 && code < 300) {
        payload.cb();
      } else {
        payload.cb(message);
      }
    },

    * checkPhone({payload}, {call, put}) {
      const {message, data, code} = yield call(checkPhone, payload);
      if (code >= 200 && code < 300) {
        payload.cb();
      } else {
        payload.cb(message);
      }
    },

    * getUser({}, {call, put}) {
      const {message, data, code} = yield call(getUser);
      if (code === 200) {
        yield put({
          type: 'setUserInfo',
          payload: data
        });
      } else {
        yield Message.error(message);
      }
    },

    * changePhoneNumber({payload}, {call, put}) {
      const {message, code} = yield call(saveuser, payload);
      if (code === 200) {
        Message.success(message, 1, () => {
          window.location.href = window.location.pathname;
        });
      } else {
        yield Message.error(message);
      }
    },

    * sendEmail({payload}, {call, put}) {
      const {message, code} = yield call(sendEmail, payload);
      if (code === 200) {
        Message.success(message);
      } else {
        yield Message.error(message);
      }
    },

    * changeEmail({payload}, {call, put}) {
      const {message, code} = yield call(saveuser, payload);
      if (code === 200) {
        Message.success(message, 1, () => {
          window.location.href = window.location.pathname;
        });
      } else {
        yield Message.error(message);
      }
    },

    * forgot({payload}, {call, put}) {
      if (payload.type === 'phone') {
        yield put({
          type: 'showModal',
          payload
        });
      } else {
        const {message, code} = yield call(forgotPassword, payload);
        if (code === 200) {
          yield put({
            type: 'success'
          });
        } else {
          yield Message.error(message);
        }
      }
    },

    * modifyPassword({payload}, {call, put}) {
      const {message, code} = yield call(modifyPassword, payload);
      if (code === 200) {
        Message.success(message, 1, () => {
          window.location.href = window.location.pathname;
        });
      } else {
        yield Message.error(message);
      }
    },

    * recoverPasswordByMobile({payload}, {call, put}) {
      const {message, code} = yield call(forgotPassword, payload);
      if (code === 200) {
        yield put({
          type: 'showModal',
          payload
        });
        yield put({
          type: 'showModifyPasswordSuccess'
        });
      } else {
        yield Message.error(message);
      }
    },

    * getVertifyCode({payload}, {call, put}) {
      const {data} = yield call(getVerifyCode, payload);
      yield put({
        type: 'setVertifyCode',
        payload: data
      })
    },

    * getCheckCode({payload}, {call, put}) {
      const {data} = yield call(getCheckCode, payload);
      yield put({
        type: 'setCheckCode',
        payload: data
      });
      yield payload.cb();
    },

    * active({payload}, {call, put}) {
      const {data} = yield call(activeUser, payload);
      yield put({
        type: 'onActive',
        payload: data
      })
    },

    * activePassword({payload}, {call, put}) {
      const {code, message} = yield call(activePassword, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'showModifyPasswordSuccess',
          payload
        });
      } else {
        Message.error(message);
      }
    }
  },
};
