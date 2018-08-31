import React,{ Component } from 'react';
import styles from './index.less'
class Insurance extends Component{
  render(){
    return(
      <React.Fragment>
        <div className={styles.top}>
          <div className={styles.solutionSence} style={{width:'786px'}}>
            <div className={styles.titleWrap}>
              <img src={require('../../../assets/images/solution-content2.png')} className={styles.courseIcon}/>
              <div className={styles.title}>应用场景</div>
            </div>
            <div className={styles.courseItem}>
              <div className={styles.solutionContent}>区块链技术结合保险行业来看，保险的本质是风险交易，现实中通过保险实现风险转移和社会经济运行的方方面面。伴随科技能力的不断提升、保险创新的不断深入，数据对保险业的发展越来越重要，成为保险实现普惠的核心资源和必要支撑。</div>
              <div className={styles.solutionKind} style={{marginTop:'25px'}}>
                <div><span className={styles.circle}></span>保险定制、精准投放</div>
                <div><span className={styles.circle}></span>保险大数据的优化迭代</div>
                <div><span className={styles.circle}></span>保险微信营销：自助式保险激活卡的升级版</div>
                <div><span className={styles.circle}></span>保险网络销售模式升级</div>
              </div>
            </div>
          </div>
          <img src={require('../../../assets/images/solution-insurance-sence.png')} style={{width:'397px',height:'370px'}}/>
        </div>
        <div className={styles.titleWrap}>
          <img src={require('../../../assets/images/solution-insurance-icon.png')} className={styles.courseIcon}/>
          <div className={styles.title}>区块链保险解决方案</div>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.solutionContent}>区块链保险大数据的可获得性和便捷性使得保险品种创新实施的环境得到改善，提供真实可追溯，时间戳高效查询、多方储存多方验证、智能合约快速理赔的数据，从而为保险业判断未来发展的方向和重点提供参照和依据。</div>
          <img src={require('../../../assets/images/solution-insurance-content.png')} style={{width:'916px'}} className={styles.courseImg}/>
        </div>
        
        
      </React.Fragment>
    )
  }
}
export default Insurance;