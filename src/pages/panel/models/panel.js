import {message as Message} from 'antd';
import {
  getSystemUserList,
  getSystemProjectList,
  getSystemLogList
} from '../services/system';

export default {
  namespace: 'panel',
  state: {
    projectList: null,
  },
  reducers: {
    setUserList(state, {payload}) {
      return {...state, ...payload};
    },
    setProjectList(state, {payload}) {
      return {...state, ...payload};
    },
    setLogList(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    * userList({payload}, {call, put}) {
      const {code, data, message} = yield call(getSystemUserList, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'setUserList',
          payload: {
            userList: data
          }
        })
      } else {
        Message.error(message);
      }
    },
    * projectList({payload}, {call, put}) {
      const {code, data, message} = yield call(getSystemProjectList, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'setProjectList',
          payload: {
            projectList: data
          }
        })
      } else {
        Message.error(message);
      }
    },
    * logList({payload}, {call, put}) {
      const {code, data, message} = yield call(getSystemLogList, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'setLogList',
          payload: {
            logList: data
          }
        })
      } else {
        Message.error(message);
      }
    },
    * searchLogList({payload}, {call, put}) {
      const {code, data, message} = yield call(getSystemLogList, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'setLogList',
          payload: {
            logList: data
          }
        })
      } else {
        message.error(message);
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/panel') {
          dispatch({
            type: 'projectList'
          });
        }
      });
    },
  }
};
