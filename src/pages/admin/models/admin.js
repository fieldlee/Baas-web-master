import {message as Message} from 'antd';
import {
  getSystemUserList,
  getSystemProjectList,
  getSystemLogList,
  getSystemMainList
} from '../services/system';

export default {
  namespace: 'admin',
  state: {
    userList: [],
    projectList: [],
    logList: [],
    maintainList: [],
    pagination: {
      total: ''
    },
    search: '',
    defaultValue:''
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
            userList: data.list,
            pagination: {
              total: data.count
            },
            search: payload.search
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
            projectList: data,
          }
        })
      } else {
        Message.error(message);
      }
    },
    * maintainList({payload}, {call, put}) {
      const {code, data, message} = yield call(getSystemMainList, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'setProjectList',
          payload: {
            maintainList: data.list,
            pagination: {
              total: data.count
            },
            search: payload.search
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
            logList: data.list,
            pagination: {
              total: data.count
            },
            search: payload.search
          }
        })
      } else {
        Message.error(message);
      }
    },

    * handleTableChange({payload}, {call, put}) {
      yield put({
        type: payload.type,
        payload: {
          page: payload.current,
          count: payload.pageSize,
          search: payload.search
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query,search}) => {

        if (pathname === '/admin') {
          dispatch({
            type: 'projectList',
          });
        }
        if (pathname === '/admin/maintain') {
          dispatch({
            type: 'maintainList',
            payload: {
              "page": '1',
              'count': '10'
            }
          });
        }
        if (pathname == '/admin/user') {

          let input  = search.replace('?','');
          if(input){
            dispatch({
              type: 'userList',
              payload: {
                search:input
              }
            });
            dispatch({
              type:'setUserList',
              payload:{
                defaultValue:input
              }
            })
          }
          else{
            dispatch({
              type: 'userList',
              payload: {
                "page": '1',
                'count': '10'
              }
            });
          }
          
        }
        if (pathname == '/admin/log') {
          dispatch({
            type: 'logList',
            payload: {
              "page": '1',
              'count': '10'
            }
          });
        }
      });
    },
  }
};
