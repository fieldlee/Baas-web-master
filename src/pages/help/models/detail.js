
export default {
  namespace: 'detail',
  state: {
    questionList:[
      {
        title:'什么是通道（ Channel )',
        content:'通道是构建在 Hyperledger Fabric 区块链网络上的私有区块链，实现了数据的隔离和保密。通道中的 Chaincode 和交易只有加入该通道的节点（ Peer ）可见。同一个节点可以加入多个通道，并为每个通道内容维护一个账本。每一个通道即为一条逻辑上的区块链。可以按照业务来划分通道，也可以按照行政职能和隐私策略来划分通道。'
      },
      {
        title:'什么是节点（ Peer )',
        content:'维护账本的网络节点，通常区块链网络架构中存在多种角色，如 endorser 和 committer 。'
      },
      {
        title:'什么是排序服务或共识服务（ Order Services ）',
        content:'提供排序服务或共识服务的网络节点，完成交易的排序和区块打包等工作，支持可插拔的共识组件，当前生产环境下使用 Kafka 进行交易排序。'
      },
      {
        title:'什么是分布式账本（ Distribute Ledger ）',
        content:'由网络中若干去中心化节点共同维护的数据账本。'
      },
      {
        title:'什么是组织（ Org ）',
        content:'联盟链中按照 访问和使用账本的网络节点，一个联盟（或者一个区块链网络）有多个组织（成员），一个组织内可以有多个节点（ Peer ），每个节点参与账本和世界状态维护。'
      },{
        title:'什么是智能合约（ Smart Contract ）',
        content:'根据特定条件自动执行的合约程序。智能合约是区块链的重要特征，是用户与区块链进行交互，利用区块链实现业务逻辑的重要途径。'
      },
      {
        title:'什么是链码（ Chaincode ）',
        content:'链码是 Hyperledger Fabric 对智能合约的一种实现方式，是运行于 Hyperledger Fabric 网络之上一段应用程序代码，也是用户与 Hyperledger Fabric 交互的唯一途径。'
      },{
        title:'构建了多个区块链网络，相互间有什么不同与影响',
        content:'区块链支持构建多个区块链网络，一个区块链网络相当于一个联盟链，链上的所有组织可以在此链条上创建自己的业务通道和智能合约，每个区块链网络与网络之间不受业务影响，安全隔离。'
      }
    ]
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    * getIpEnvStatus({payload}, {call, put}) {
      
    }
  }
};
