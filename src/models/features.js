export default {
  namespace: 'features',
  state: {
    list: [
      {
        title: '自有服务器',
        content: '区块链是集合了特定组织、特定节点的私有区块链系统，不同的组织拥有所属自己的服务器节点和调用API接口,链佰BaaS系统并非集成化服务器群集，将云上云下服务器纳入到BaaS平台。',
        iconClassNames: 'iconFeatureServer'
      },
      {
        title: '多链支撑',
        content: '一条逻辑上的区块链是集合了特定组织、特定节点的私有区块链系统，不同的组织间可以建立不同的逻辑区块链，链间实现数据隔离，智能合约可以部署在不同的逻辑区块链之上。',
        iconClassNames: 'iconFeatureChain'
      },
      {
        title: '合约管理',
        content: 'BaaS平台提供一链对多合约，合约安全检查，合规和安全性的校验服务，并且BaaS 平台提供完备的智能合约集成开发调试环境，大大缩短了用户开发周期并减轻了开发压力，以更便捷的方式辅助软件开发。',
        iconClassNames: 'iconFeatureDeal'
      },
      {
        title: '共识机制',
        content: '共识机制决定了区块链的数据一致性的实现方式和适用场景，区块链目前支持超级账本原生共识机制的同时，未来也将支持用户自定义的共识插件和背书插件，方便用户根据自身业务需要进行灵活选择和切换',
        iconClassNames: 'iconFeatureOrder'
      },
      {
        title: '前沿技术',
        content: '区块链 BaaS 是一个开放的服务平台，在支持超级账本 Fabric 的同时，我们也支持 Ethereum，EOS 等优秀区块链底层平台。我们在未来将支持更多区块链技术，并积极关注区块链前沿科技的发展。',
        iconClassNames: 'iconFeatureTechnology'
      },
      {
        title: '双层存储',
        content: '存储膨胀是当前区块链必然会面临的一个问题，链佰区块链为此提供了多种存储层解决方案，以适应不同的需求。例如账本数据支持使用块存储解决方案，状态数据和历史数据。提供LevelDB存储和CouchDB存储。',
        iconClassNames: 'iconFeatureStorage'
      },
      {
        title: '插拔节点',
        content: '联盟区块链多组织的共识，组织联盟中经常会发生联盟成员的进入，链佰区块链BaaS平台提供组织节点的热插拔服务，随时维护联盟节点管理。实现了网络既可以灵活拓展，又可以自适应的管理模式。\n',
        iconClassNames: 'iconFeaturePeer'
      },
      {
        title: '隐私保护',
        content: '链佰BaaS平台采用基于数字证书的 PKI 的身份管理、多链隔离、信息加密、智能合约控制等手段保护私密信息。基于 PKI 的身份管理采用双重身份认证机制，首先通过链佰BaaS平台验证；再进入到区块链的权限管理体系，只有使用该安全证书签名的客户端节点才能发起交易请求或提案\n',
        iconClassNames: 'iconFeatureProtect'
      }
    ]
  },
  reducers: {

  },
  effects: {
  },
  subscriptions: {
  }
};
