import router from 'umi/router';

import {projectservers,serverinfo,operate,topology} from '../services';

export default {
  namespace: 'maintainDetail',
  state: {
    list:[],
    currentIndex:0,
    serviceChild:[],
    name:'',
    loading:false,
    orders:[],
    peers:[]
  },
  effects: {
    *topology({payload},{call,put}){
      const {data} = yield call(topology,payload);
      yield put({
        type:'save',
        payload:{
          orders:data.orders,
          peers:data.peers
        }
      })
    },
    *hover({payload}, {call, put}) {
      yield put({
        type:'save',
        payload:{
          currentIndex:payload.index
        }
      })
    },
    *projectservers({payload},{call,put,dispatch}){
      yield put({
        type:'save',
        payload:{
          loading:true,
        }
      })
      const {data} = yield call(projectservers,payload);     
      let list=[]
      Object.keys(data.servers).map((ip,index)=>{
        let mem = data.servers[ip].mem.usage,
            memAll = mem.all.replace('mb',''),
            memUsed = mem.used.replace('mb',''),
            cpu = data.servers[ip].cpu.usage.replace('%',''),
            newData={
              ip:ip,
              num:data.servers[ip].dockers.length,
              list:data.servers[ip].dockers.splice(0,4),
              cpu:cpu.replace(/\s+/g,''),
              mem:(memUsed/memAll).toFixed(2)
            }
        list.push(newData)
      })      
      yield put({
        type:'save',
        payload:{
          list:list,
          name:data.projectName,
          loading:false
        }
      })
      yield put({
        type:'serverinfo',
        payload:{
          ip:list[0].ip,
          index:0,
          id:payload.id
        }
      })
    },
    *serverinfo({payload},{call,put}){
      yield put({
        type:'save',
        payload:{
          currentIndex:payload.index,
          loading:true
        }
      })
      const {data} = yield call(serverinfo,payload);
      let list=[]
      Object.keys(data.list).map((id,index)=>{
        data.list[id].ip=payload.ip
        list.push(data.list[id])
      })
      yield put({
        type:'save',
        payload:{
          serviceChild:list,
          loading:false
        }
      })
    },
    *operate({payload},{select,call,put}){
      yield put({
        type:'save',
        payload:{
          loading:true,
        }
      })
      const data = yield call(operate,payload);
      yield put({
        type:'serverinfo',
        payload:{
          index:payload.index,
          ip:payload.ip,
          id:payload.id,
          loading:false
        }
      })      
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  }
};
