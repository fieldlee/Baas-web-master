import {getIpEnv} from '../servies/ipEnvChecker';

export default {
  namespace: 'ipEnvChecker',
  state: {
    success: false,
    message: ''
  },
  reducers: {
    updateEnvStatus(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    * getIpEnvStatus({payload}, {call, put}) {
      const {code, data, message} = yield call(getIpEnv, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'updateEnvStatus',
          payload: {
            success: true
          }
        });
      } else {
        yield put({
          type: 'updateEnvStatus',
          payload: {
            success: false
          }
        });
        // Message.error(message);
      }
    }
  }
};
