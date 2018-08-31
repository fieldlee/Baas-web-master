

export default {
  namespace: 'home',
  state: {
    solution:[
    {
      title:'区块链医疗解决方案',
      content:'区块链技术支撑的电子病历系统，可以有效的在医联体之间进行远程数据共享、分布式保障与存储管理，对医疗事故与责任界定起到完整安全的背书...',
      icon:require('../assets/images/solution-icon1.png'),
      route:'/solution/medical'
    },
    {
      title:'区块链数据存证解决方案',
      content:'建立一个基于区块链的互联网金融行业的接入平台，在互联网金融企业、监管机构、公众之间构架起一个基于区块链技术的信息共享云，为互联网企业...',
      icon:require('../assets/images/solution-icon2.png'),
      route:'/solution/data'
    },
    {
      title:'区块链积分解决方案',
      content:'传统积分系统，因积分交易的限制多、额度小、使用频度低，成为了商家及客户的“鸡肋产品”。区块链的分布式、不可篡改地、可追溯的特性使得积分...',
      icon:require('../assets/images/solution-icon3.png'),
      route:'/solution/integral'
    },
    {
      title:'区块链保险解决方案',
      content:'区块链保险大数据的可获得性和便捷性使得保险品种创新实施的环境得到改善，提供真实可追溯，时间戳高效查询、多方储存多方验证、智能合约快速...',
      icon:require('../assets/images/solution-icon4.png'),
      route:'/solution/insurance'
    }
    ],
    currentIndex:0
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    *change({payload}, {call,put}) {
       yield put({
          type: 'save',
          payload: {
            currentIndex: payload.index
          }
        })
    }
  }
};
