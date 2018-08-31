import React,{ Component } from 'react';
import styles from './index.less'
class Medical extends Component{
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
              <div className={styles.solutionContent}>通过以下三个不同场景：分析在区块链技术应用下，提升分级诊疗、流行病防预、医疗保障体系对电子病历的共享机制，对整体数据的采集，采信，应用等层面，起到数据采集流程优化，数据管理便捷化，数据监督管理整体化的多层级提升。</div>
              <div className={styles.solutionKind}>
                <div><span className={styles.circle}></span>分级诊疗体系的完善</div>
                <div><span className={styles.circle}></span>流行病防治及预警</div>
                <div><span className={styles.circle}></span>医疗保障体系的维护</div>
              </div>
            </div>
          </div>
          <img src={require('../../../assets/images/solution-medical-sence.png')} className={styles.topImg}/>
        </div>
        <div className={styles.titleWrap}>
          <img src={require('../../../assets/images/solution-content1.png')} className={styles.courseIcon}/>
          <div className={styles.title}>区块链医疗解决方案</div>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.solutionContent}>区块链技术支撑的电子病历系统，可以有效的在医联体之间进行远程数据共享、分布式保障与存储管理，对医疗事故与责任界定起到完整安全的背书。同时区块链技术在诊疗场景下病历数据的可信度，采信研究，信任机制的建立提供安全保障，同时为医疗资源共享体系下提供更多优化和创新的空间。</div>
          <img src={require('../../../assets/images/solution-medical.png')} style={{width:'916px'}} className={styles.courseImg}/>
        </div>
        
        
        
      </React.Fragment>
    )
  }
}
export default Medical;