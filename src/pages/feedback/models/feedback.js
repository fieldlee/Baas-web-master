import router from 'umi/router';
import {feedback} from '../services/feedback';
import {
  message
} from 'antd';

export default {
  namespace: 'feedback',
  state: {
    feedbackList:['区块链部署','智能合约','命令行工具','API接口','解决方案','系统服务','其它']
  },
  effects: {
    * submit({payload}, {call, put}) {
      const result = yield call(feedback,payload);
      message.success(result.message, 1)
    }
  }
};
