import React ,{ Component } from 'react';
import styles from './indexHeader.less'
class IndexFooter extends Component{
  render(){
    return(
      <div className={styles.footerWrap}>
          <div className={`${styles.container} ${styles.footer}`}>
            <div className={styles.footerInfo}>
              <img src={require('../assets/images/logo.svg')} className={styles.footerLogo}/>
              <div>上海链佰信息科技有限公司</div>
              <div>地址：上海市虹口区四川北路859号中信大厦1006-1007室</div>
              <div>邮箱：public@lianbai.io</div>
              <div>全国咨询专线：(021) 5633 0305</div>
            </div>
            <div className={styles.footerLinkWrap}>
              <div className={styles.footerItem} style={{marginBottom:'25px'}}>
                <a href='https://lianbai.io/' className={styles.footerLink}>链佰首页</a>
                <a href='https://lianbai.io/cases' className={styles.footerLink}>关于链佰</a>
                <a href='https://lianbai.io/about' className={styles.footerLink}>BaaS平台</a>
                <a href='https://lianbai.io/jobs' className={styles.footerLink}>招聘</a>
              </div>
              <div className={styles.footerItem}>
                <a href='https://lianbai.io/solution' className={styles.footerLink}>商品溯源</a>
                <a href='https://lianbai.io/copyright' className={styles.footerLink}>版权保护</a>
                <a href='https://lianbai.io/contract' className={styles.footerLink}>合同存证</a>
                <a href='https://lianbai.io/publicwelfare' className={styles.footerLink}>公益慈善</a>
              </div>
            </div>
            <div className={styles.footerWechat}>
              <img src={require('../assets/images/qrcode.jpg')}/>
              <div>扫码关注公众号</div>
            </div>
          </div>
        </div>
    )
  }
}
export default IndexFooter