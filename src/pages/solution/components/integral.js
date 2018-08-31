import React,{ Component } from 'react';
import styles from './index.less'
class Integral extends Component{
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
              <div className={styles.solutionContent}>目前，积分存在三点问题：积分感知很弱、积分的受理范围有限、积分过于碎片化，通过区块链积分系统可增加积分的可用性和对积分的认知度。</div>
              <div className={styles.solutionKind} style={{marginTop:'25px'}}>
                <div><span className={styles.circle}></span>积分收单，即直接通过积分进行消费的场景</div>
                <div><span className={styles.circle}></span>积分兑换，即直接通过积分兑换可消费场景</div>
                <div><span className={styles.circle}></span>积分营销，即直接对积分营销的场景</div>
              </div>
            </div>
          </div>
          <img src={require('../../../assets/images/solution-integral-sence.png')} style={{width:'529px',height:'310px'}}/>
        </div>
        <div className={styles.titleWrap}>
          <img src={require('../../../assets/images/solution-itergral-icon.png')} className={styles.courseIcon}/>
          <div className={styles.title}>区块链积分解决方案</div>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.solutionContent}>传统积分系统，因积分交易的限制多、额度小、使用频度低，成为了商家及客户的“鸡肋产品”。区块链的分布式、不可篡改地、可追溯的特性使得积分的跨平台交易得以实现，同时丰富的智能合约系统，使消费者行为数据可以更有效、明确地被发现、分析及使用，从而促使消费力进一步被释放，通过不断优化积分系统的构架和流程达成与商家诉求一致的动态匹配。因此，建立在全网身份认证服务、公共监管征信系统下的区块链积分系统，可以释放出积分交易的优势。<div style={{color:'#151515'}}>更多功能：交易功能、信用功能、绩效功能</div></div>
          <img src={require('../../../assets/images/solution-itegral-content.png')} style={{width:'635px'}} className={styles.courseImg}/>
{/*          <div className={styles.solutionContent}>通过这些功能可以更好使积分具有跨链交易能力，不仅让积分赠送、 交易成为更高效的获客渠道，更通过积分不断提高平台的用户体验， 形成产业联盟和积分消费生态系统。</div>
*/}        </div>
        
      </React.Fragment>
    )
  }
}
export default Integral;