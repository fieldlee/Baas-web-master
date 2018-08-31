import React ,{ Component } from 'react';
import { Link } from 'dva/router';
import styles from './index.less';
import Slider from 'react-slick';
import { connect } from 'dva';

let settings ={
  dots:false,
  infinite:true,
  speed:1000,
  arrows:true,
  autoplaySpeed:5000
};

class IndexPage extends Component{
  change(index){
    this.props.dispatch({
      type:'home/change',
      payload:{
        index:index
      }
    })
  }
  render(){
    const { solution , currentIndex } = this.props.home;
    return(
      <React.Fragment>
        <div className={styles.bannerWrap}>
          <div className={`${styles.container} ${styles.banner}`}>
            <div className={styles.left}>
              <div className={styles.bannerTitle}>链佰区块链服务BaaS</div>
              <div className={styles.bannerDetail}>基于开放、弹性、灵活高效、快速接入的企业级区块链服务平台<br/>致力于让开发者专注于区块链业务代码本身，提升开发和运维效率</div>
              <Link to='/panel' className={styles.exper}>立即体验</Link>
            </div>
            <img src={require('../assets/images/index-banner.png')} className={styles.bannerImg}/>
          </div>
        </div>
        <div className={`${styles.kindWrap} ${styles.container}`}>
          <Slider {...settings} className={styles.kind}>
            <div >
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index1-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index1-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>自有服务器</div>
                    <div className={styles.kindSub}>区块链是集合了特定组织…</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>区块链是集合了特定组织、特定节点的私有区块链系统，不同的组织拥有所属自己的服务器节点和调用API接口,链佰BaaS系统并非集成化服务器群集，将云上云下服务器纳入到BaaS平台。</div>
              </div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index2-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index2-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>多链支撑</div>
                    <div className={styles.kindSub}>一条逻辑上的区块链是集…</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>一条逻辑上的区块链是集合了特定组织、特定节点的私有区块链系统，不同的组织间可以建立不同的逻辑区块链，链间实现数据隔离，智能合约可以部署在不同的逻辑区块链之上。</div>

              </div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index3-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index3-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>合约管理</div>
                    <div className={styles.kindSub}>BaaS平台提供一链对多合…</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>BaaS平台提供一链对多合约，合约安全检查，合规和安全性的校验服务，并且BaaS 平台提供完备的智能合约集成开发调试环境，大大缩短了用户开发周期并减轻了开发压力，以更便捷的方式辅助软件开发。</div>
              </div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index4-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index4-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>共识机制</div>
                    <div className={styles.kindSub}>共识机制决定了区块链的…</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>共识机制决定了区块链的数据一致性的实现方式和适用场景，区块链目前支持超级账本原生共识机制的同时，未来也将支持用户自定义的共识插件和背书插件，方便用户根据自身业务需要进行灵活选择和切换。</div>
              </div>
            </div>
            <div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index5-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index5-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>前沿技术</div>
                    <div className={styles.kindSub}>区块链BaaS是一个开放的服...</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>区块链BaaS是一个开放的服务平台，在支持超级账本 Fabric 的同时，我们也支持 Ethereum，EOS 等优秀区块链底层平台。我们在未来将支持更多区块链技术，并积极关注区块链前沿科技的发展。</div>
              </div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index6-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index6-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>双层存储</div>
                    <div className={styles.kindSub}>存储膨胀是当前区块链必然...</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>存储膨胀是当前区块链必然会面临的一个问题，链佰区块链为此提供了多种存储层解决方案，以适应不同的需求。例如账本数据支持使用块存储解决方案，状态数据和历史数据。提供LevelDB存储和CouchDB存储。</div>
              </div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index7-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index7-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>插拔节点</div>
                    <div className={styles.kindSub}>联盟区块链多组织的共识，组...</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>联盟区块链多组织的共识，组织联盟中经常会发生联盟成员的进入，链佰区块链BaaS平台提供组织节点的热插拔服务，随时维护联盟节点管理。实现了网络既可以灵活拓展，又可以自适应的管理模式。</div>
              </div>
              <div className={styles.kindItem}>
                <div className={styles.kindShow}>
                  <div className={styles.kindImg}>
                    <img src={require('../assets/images/index8-1.png')} className={styles.kindImg1}/>
                    <img src={require('../assets/images/index1-2.png')} className={styles.kindImg2}/>
                    <img src={require('../assets/images/index8-3.png')} className={styles.kindImg3} style={{width:'124px'}}/>
                  </div>
                  <div className={styles.kindInfo}>
                    <div className={styles.kindTitle}>隐私保护</div>
                    <div className={styles.kindSub}>链佰BaaS平台采用基于数...</div>
                  </div>
                </div>
                <div className={styles.kindDetail}>本平台采用基于数字证书的 PKI 的身份管理、多链隔离、信息加密、智能合约控制等手段保护私密信息。基于 PKI 的身份管理采用双重身份认证机制，首先通过链佰BaaS平台验证；再进入到区块链的权限管理体系，只有使用该安全证书签名的客户端节点才能发起交易请求或提案。</div>
              </div>
            </div>
          </Slider>
        </div>
        <div className={`${styles.introWrap} ${styles.container}`}>
          <img src={require('../assets/images/computer.png')} className={styles.introImg}/>
          <div className={styles.introInfo}>
            <div className={styles.introInfoTilte}>链佰BaaS系统介绍</div>
            <div className={styles.introDetail}>
              链佰区块链服务（Blockchain as a Service，BaaS），构建于开放的区块链服务集群，让用户在弹性、开放的服务器集群上能够快速构建自己的 IT 基础设施和区块链服务。使用 BaaS 可以极大降低您实现区块链底层技术的成本，简化区块链构建和运维工作，同时面对各行业领域场景，满足用户个性化需求，一站式快速交付定制 BaaS系统。

            </div>
          </div>
        </div>
        <div className={styles.solutionWrap}>
          <div className={`${styles.container} ${styles.solution}`}>
            <div className={styles.solutionLeft}>
              <div className={styles.solutionTitle}>链佰BaaS解决方案</div>
              <div className={styles.solutionSub}>专注区块链技术，相关行业资源丰富，针对各行业业务特性，打造个性化行业解决方案，为用户提供一站式的产品与服务</div>
              <div className={styles.solutionContent}>
                <div className={styles.contentLeft}>
                  {
                    solution.map((item,index)=>{
                      return(
                        <div className={
                          currentIndex==index?`${styles.contentLeftTitle} ${styles.active}`:`${styles.contentLeftTitle}`
                          } 
                          key={index}
                          onClick={this.change.bind(this,index)}>
                          <span className={styles.circle}></span>
                          {item.title}
                        </div>
                      )
                    })
                  }
                </div>
                <img src={require('../assets/images/stroke1.png')} className={styles.strokeImg}/>
                <div className={styles.contentRigth}>
                  <img src={solution[currentIndex].icon} className={styles.contentIcon}/>
                  <div>{solution[currentIndex].content}</div>
                  <Link to={solution[currentIndex].route} className={styles.sloutionMore}>查看更多&gt;</Link>
                </div>
              </div>
            </div>
            <img src={require('../assets/images/index-soultion.png')} className={styles.solutionImg}/>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.docWrap}>
            <Link className={styles.docItem} to='/help/course'>教程</Link>
            <Link className={styles.docItem} to='/help/api'>开发者文档</Link>
            <Link className={styles.docItem} to='/help/question'>常见问题</Link>
            <Link className={styles.docItem} to='/feedback'>技术支持</Link>
          </div>
          <div className={styles.footerIntro}>
            <div className={styles.footerTitle}>链佰BaaS系统</div>
            <div className={styles.footerDetail}>高效、开放、安全、弹性的区块链服务，为企业降低区块链技术与应用门槛打造可信的企业间价值通道</div>
            <Link className={styles.atOnce} to='/panel'>立即体验</Link>
          </div>
        </div>
        
      </React.Fragment>
    )
  }
}
export default connect(({home})=>({home}))(IndexPage)