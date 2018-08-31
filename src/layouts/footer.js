import React from 'react';
import styles from './footer.less';
import logo from '../assets/images/logo.svg';
import qrcodeImage from '../assets/images/qrcode.jpg';

export default class Footer extends React.Component {
  render() {
    const {simple} = this.props;
    return (
      simple ?
        <div className={styles.footer}>@上海链佰信息科技有限公司 沪A2-20044005号</div>
        :
        <React.Fragment>
          <div className={styles.usefulInfo}>
            <div className='container'>
              <div className={styles.company}>
                <img src={logo} alt='上海链佰信息科技有限公司' width={48} height={28}/>
                <p>上海链佰信息科技有限公司</p>
                <p>地址：上海虹口区四川北路859号中信广场1006室</p>
                <p>邮编：200000</p>
                <p>全国咨询专线： 021-0000 0000</p>
              </div>
              <nav className={styles.links}>
                <a href=''>意见反馈</a>
                <a href=''>链佰官网</a>
                <a href=''>案例</a>
                <a href=''>关于链佰</a>
                <a href=''>用户协议</a>
              </nav>
              <div className={styles.qrCode}>
                <img src={qrcodeImage} alt='上海链佰信息科技有限公司' width={89} height={89}/>
                扫码关注公众号
              </div>
            </div>
          </div>
          <div className={`${styles.footer} ${styles.footerBlueDark}`}>
            <p>@上海链佰信息科技有限公司 沪A2-20044005号</p>
          </div>
        </React.Fragment>
    )
  }
}