import React,{ Component } from 'react';
import styles from './index.less'
class Data extends Component{
  render(){
    return(
      <React.Fragment>
        <div className={styles.top}>
          <div className={styles.solutionSence}>
            <div className={styles.titleWrap}>
              <img src={require('../../../assets/images/solution-content2.png')} className={styles.courseIcon}/>
              <div className={styles.title}>应用场景</div>
            </div>
            <div className={styles.courseItem}>
              <div className={styles.solutionKind} style={{marginTop:'25px'}}>
                <div><span className={styles.circle}></span>面向各行各业的数据采集、报送服务，可以介入各种数据源，为客户提供数据备份。</div>
                <div><span className={styles.circle}></span>面向所有用户在受限条件下的原始数据输出服务和数据加工后的增值服务。</div>
                <div><span className={styles.circle}></span>面向各种用户的数据举报、举证服务，提供数据综合分析之后的鉴别服务。</div>
                <div><span className={styles.circle}></span>针对数据提供者、节点服务者提供收益回报，形成数据生产、鉴别、提供的生态圈。</div>
              </div>
            </div>
          </div>
          <img src={require('../../../assets/images/solution-data-sence.png')} style={{width:'369px',height:'292px'}}/>
        </div>
        <div className={styles.titleWrap}>
          <img src={require('../../../assets/images/solution-data-icon.png')} className={styles.courseIcon}/>
          <div className={styles.title}>区块链数据存证解决方案</div>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.solutionContent}>建立一个基于区块链的互联网金融行业的接入平台，在互联网金融企业、监管机构、公众之间构架起一个基于区块链技术的信息共享云，为互联网企业提供行业自律的信用自证服务，为监管部门提供一个专业信用信息采集服务，为公众提供互金产品经营信用信息查验服务。采用区块链技术对金融活动的5个主体，即运营主体、金融平台、交易产品、客户、资金流及其行为进行监管，记录金融活动数据信息，作为追踪溯源的证据。</div>
          <img src={require('../../../assets/images/soluton-data.png')} style={{width:'916px'}} className={styles.courseImg}/>
        </div>
        
        
      </React.Fragment>
    )
  }
}
export default Data;