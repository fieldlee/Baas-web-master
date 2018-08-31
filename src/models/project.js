import router from 'umi/router';
import {message as Message} from 'antd';
import {
  getIpEnv,
  getProjectList,
  saveProject,
  resaveProject,
  deploy,
  createChannel,
  createChainCode,
  getProjectDetail,
  remove,
  reInstallEnv,
  getBlockAndTxCount,
  getChartBlockAndTx
} from '../services/project';
import auth from '../utils/auth';

const orderField = {
  orderIp: ''
};

const peerField = {
  peerIp: ''
};

const orgField = {
  orgId: '',
  peers: [
    {
      peerIp: ''
    },
    {
      peerIp: ''
    }
  ]
};

export default {
  namespace: 'project',
  state: {
    title: '链佰区块链BaaS系统项录入',
    orgs: [],
    orders: [],
    disabled: false,
    status: 'unknow',
    buttonStatus: 'default',
    uploadType: 'upload',
    projectExisted: false,
    projectList: [],
    channelId: '',
    chaincodes: [],
    isUpdateChaincode: false,
    isNewChaincode: false,
    newChaincode: false,
    chainInfo: null,
    chainChartInfo: null,
    isChannelLoading: false
  },
  reducers: {
    addOrgsAndOrders(state, {payload}) {
      return {...state, ...payload};
    },
    addOrgs(state, {payload}) {
      const {orgs} = payload;
      orgs.push(orgField);
      return {...state, orgs};
    },

    minusOrgs(state, {payload}) {
      const {orgs, count} = payload;
      orgs.splice(count, orgs.length);
      return {...state, orgs};
    },

    addPeers(state, {payload}) {
      let {index, orgs} = payload;
      orgs[index].peers.push(peerField);
      return {...state, orgs};
    },

    minusPeers(state, {payload}) {
      const {orgs, index, count} = payload;
      const peers = orgs[index].peers;
      peers.splice(count, peers.length);
      return {...state, orgs};
    },

    addOrders(state, {payload}) {
      const {orders} = payload;
      orders.push(orderField);
      return {...state, orders};
    },

    minusOrders(state, {payload}) {
      const {orders, count} = payload;
      orders.splice(count, orders.length);
      return {...state, orders};
    },

    addNewChaincode(state, {payload}) {
      return {...state, ...payload};
    },

    setChaincode(state, {payload}) {
      const result = [];
      state.addChannels.filter((item) => {
        if (payload.channelId === item.channelId) {
          let isUpdate = false;
          item.chaincodes = item.chaincodes || [];
          item.chaincodes = item.chaincodes.map((chaincode) => {
            if (chaincode.ccName === payload.ccName) {
              isUpdate = true;
              chaincode = {...payload, using: false};
            }
            return chaincode;
          });
          if (!isUpdate) {
            item.chaincodes.push({...payload, using: false});
          }
          result.push(item);
        }
      });
      return {...state, addChannels: result};
    },

    updateChaincode(state, {payload}) {
      state.chaincodes[payload.index] = payload.record;
      return {...state, ...payload};
    },

    updateProjectList(state, {payload}) {
      return {...state, ...payload};
    },

    updateProjectDetail(state, {payload}) {
      return {...state, ...payload};
    },

    changeUploadChainCodeType(state, {payload}) {
      return {...state, ...payload};
    },

    setStatus(state, {payload}) {
      return {...state, ...payload};
    },

    updateBlockChainInfo(state, {payload}) {
      return {...state, chainInfo: payload}
    },
    updateChartBlockChainInfo(state, {payload}) {
      return {...state, chainChartInfo: payload}
    },
    changeChannelStatus(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    * saveProject({payload}, {call}) {
      const {code, message} = yield call(saveProject, payload);
      if (code >= 200 && code < 300) {
        Message.success(message, 2, () => {
          const id = payload.id;
          router.push({
            pathname: id ? `/project/info/${id}` : '/panel'
          });
        });
      } else {
        Message.error(message);
      }
    },

    * removeProject({payload}, {call}) {
      const {code, message} = yield call(remove, payload);
      if (code >= 200 && code < 300) {
        Message.success(message, 2, () => {
          payload.cb();
        });
      } else {
        Message.error(message);
      }
    },

    * resaveProject({payload}, {call}) {
      const {code, message} = yield call(resaveProject, payload);
      if (code >= 200 && code < 300) {
        Message.success(message, 2, () => {
            window.location.href = '/admin';
        });
      } else {
        Message.error(message);
      }
    },

    * deployProject({payload}, {call}) {
      const {code, message} = yield call(deploy, payload);
      if (code >= 200 && code < 300) {
        Message.success(message, 2, () => {
          router.push({
            pathname: `/project/info/${payload.id}`
          });
        });
      } else {
        Message.error(message);
      }
    },

    * createChannel({payload}, {call, put}) {
      yield put({
        type: 'changeChannelStatus',
        payload: {
          isChannelLoading: true
        }
      });
      const {code, message} = yield call(createChannel, payload);
      yield put({
        type: 'changeChannelStatus',
        payload: {
          isChannelLoading: false
        }
      });
      if (code >= 200 && code < 300) {
        Message.success(message, 2, () => {
          router.push({
            pathname: `/project/chaincode/detail/${payload.id}`,
            query: {
              cId: payload.channelId
            }
          });
        });
      } else {
        Message.error(message);
      }
    },

    * createChainCode({payload}, {call, put}) {
      yield put({
        type: 'setChaincode',
        payload
      });
      yield put({
        type: 'addNewChaincode',
        payload: {
          isUpdateChaincode: false,
          isNewChaincode: false
        }
      });
      Message.success('合约添加成功，该过程可能需要一定的时间；请稍后刷新查看最新状态');
      const {code, data, message} = yield call(createChainCode, payload);
      if (code >= 200 && code < 300) {
      } else {
        Message.error(message);
      }
      const result = yield call(getProjectDetail, payload);
      yield put({
        type: 'updateProjectDetail',
        payload: result.data
      });
    },

    * getProjectList({payload}, {call, put}) {
      const token = auth.getAuthHeader();
      if (token) {
        const {data} = yield call(getProjectList);
        yield put({
          type: 'updateProjectList',
          payload: {
            projectList: data
          }
        })
      }
    },

    * getProjectDetail({payload}, {call, put}) {
      const token = auth.getAuthHeader();
      if (token) {
        const {data} = yield call(getProjectDetail, payload);
        if (data.status === 'resaved') {
          const {orgs, orders} = data;
          for (let i = 0; i < orgs.length; i++) {
            const org = orgs[i];
            for (let j = 0; j < org.peers.length; j++) {
              const peer = org.peers[j];
              const id = data.id;
              const ip = peer.peerIp;
              let isInstalled = false;
              let message = '网络链接错误';
              const result = yield call(getIpEnv, {id, ip});
              isInstalled = result.code >= 200 && result.code < 300;
              message = result.message;
              peer.serverEnv = {
                id,
                ip,
                isInstalled,
                message
              };
            }
          }

          for (let k = 0; k < orders.length; k++) {
            const order = orders[k];
            const id = data.id;
            const ip = order.orderIp;
            let isInstalled = false;
            let message = '网络链接错误';

            const result = yield call(getIpEnv, {id, ip});
            isInstalled = result.code >= 200 && result.code < 300;
            message = result.message;

            order.serverEnv = {
              id,
              ip,
              isInstalled,
              message
            };
          }
        }
        yield put({
          type: 'updateProjectDetail',
          payload: data
        });
      }
    },
    * initOrgsAndOrders({payload}, {call, put}) {
      yield put({
        type: 'addOrgsAndOrders',
        payload: {
          orgs: [
            {
              orgId: '',
              peers: [
                {
                  serverEnv: false,
                  peerIp: ''
                },
                {
                  serverEnv: false,
                  peerIp: ''
                }
              ]
            },
            {
              orgId: '',
              peers: [
                {
                  serverEnv: false,
                  peerIp: ''
                },
                {
                  serverEnv: false,
                  peerIp: ''
                }
              ]
            }
          ],
          orders: [
            {
              orderIp: '',
              serverEnv: false
            }
          ]
        }
      });
    },
    * onReinstallEnv({payload}, {call, put}) {
      const {code, message} = yield call(reInstallEnv, payload);
      if (code >= 200 && code < 300) {
        Message.success(message);
      }
    },

    * getBlockChainInfo({payload}, {call, put}) {
      const {code, data} = yield call(getBlockAndTxCount, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'updateBlockChainInfo',
          payload: data
        })
      }
    },

    * getChartBlockChainInfo({payload}, {call, put}) {
      const {code, data} = yield call(getChartBlockAndTx, payload);
      if (code >= 200 && code < 300) {
        yield put({
          type: 'updateChartBlockChainInfo',
          payload: data
        });
      }
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname.indexOf('/project') !== -1) {
          dispatch({type: 'setProjectMenu'});
        }
        if (pathname === '/project/add') {
          dispatch({type: 'initOrgsAndOrders'});
        }
        if (/\/project\/(detail|chaincode|info\/\w+)/.test(pathname)) {
          const p = pathname.split('/');
          let id;
          if (p && p.length >= 4) {
            id = p.pop();
            if (id.indexOf('?') !== -1) {
              id = id.split('?')[0];
            }
          }
          dispatch({
            type: 'getProjectDetail',
            payload: {
              id
            }
          });
          if (pathname.indexOf('info') !== '-1') {
            dispatch({
              type: 'getBlockChainInfo',
              payload: {
                id
              }
            });
            dispatch({
              type: 'getChartBlockChainInfo',
              payload: {
                id
              }
            });
          }
        }
      });
    },
  }
};
