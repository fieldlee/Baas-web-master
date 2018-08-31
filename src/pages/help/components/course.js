import React,{ Component } from 'react';
import {connect} from 'dva';
import styles from './index.less';

class Question extends Component{
  render(){
    const { questionList } = this.props.detail;
    return(
      <React.Fragment>
        <div className={styles.titleWrap}>
          <img src={require('../../../assets/images/help-bass-icon.png')} className={styles.courseIcon}/>
          <div className={styles.title}>使用BaaS流程</div>
        </div>
        <img src={require('../../../assets/images/help-progress.png')} style={{width:'100%',margin:'38px 0 48px 0'}}/>
        <div className={styles.courseItem}>
          <div className={styles.titleWrap}>
            <img src={require('../../../assets/images/help-login-icon.png')} className={styles.courseIcon}/>
            <div className={styles.title}>登录控制台</div>
          </div>
          <div className={styles.courseInfo}>
            <div className={styles.courseInfoLeft}>
              <div className={styles.courseItemSub}>注册用户</div>
              <div>1. 输入用户名和密码</div>
              <div>2. 输入手机号码或者邮箱</div>
              <div>3. 手机号码发送验证码</div>
              <div>4.邮箱注册用户，打开邮箱激活用户</div>
            </div>
            <div className={styles.courseInfoLeft}>
              <div className={styles.courseItemSub}>登陆</div>
              <div>1. 输入注册时输入的用户名和密码</div>
              <div>2. 忘记密码时，请点击忘记密码按钮</div>
            </div>
          </div>
          <img src={require('../../../assets/images/course-1.jpg')} style={{width:'916px'}} className={styles.courseImg}/>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.titleWrap}>
            <img src={require('../../../assets/images/help-write-icon.png')} className={styles.courseIcon}/>
            <div className={styles.title}>填写区块链项目信息</div>
          </div>
          <div className={styles.courseInfo} style={{width:'100%'}}>
            <div className={styles.courseInfoLeft} style={{width:'745px'}}>
              <div><span className={styles.courseItemSub}>项目名称：</span>12位以内的数字、字母或者中文。</div>
              <div style={{fontSize: '12px'}}><span className={styles.courseItemSub}><i>参考样例</i>：</span>BlockchainA1，Bank区块链网络</div>
              <div><span className={styles.courseItemSub}>网络根域：</span>12 位以内的数字字母，同一个组织/企业下不可重复。</div>
              <div style={{fontSize: '12px'}}><span className={styles.courseItemSub}><i>参考样例</i>：</span>domain.com</div>
            </div>
            <div className={styles.courseInfoLeft}>
              <div><span className={styles.courseItemSub}>组织ID:</span>12 位以内的数字或字母。</div>
              <div style={{fontSize: '12px'}}><span className={styles.courseItemSub}><i>参考样例</i>：</span>BankA1，AirOrg1，InsuranceOrg2</div>
              <div><span className={styles.courseItemSub}>组织数量：</span>目前支持在 2 个(含)到 10 个(含)之间。</div>
              <div><span className={styles.courseItemSub}>Peer数量（每个组织）</span>在 2 个(含)到 10 个(含)之间。</div>
              <div><span className={styles.courseItemSub}>Order数量：</span>推荐 1~4 个，出于容灾考虑，建议 Order节点数量最少2个，同时不多于4个，超过4个会带来额外的存储开销。</div>
            </div>
          </div>
          <img src={require('../../../assets/images/course-2.png')} style={{width:'592px'}} className={styles.courseImg}/>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.titleWrap}>
            <img src={require('../../../assets/images/help-make-icon.png')} className={styles.courseIcon}/>
            <div className={styles.title}>部署区块链项目</div>
          </div>
          <div className={styles.courseInfo}>根据服务器ip检查服务器状态是否可用，如果服务器状态不可用不可部署区块链项目，请联系系统管理员。</div>
          <img src={require('../../../assets/images/course-3.png')} style={{width:'592px'}} className={styles.courseImg}/>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.titleWrap}>
            <img src={require('../../../assets/images/help-tong-icon.png')} className={styles.courseIcon}/>
            <div className={styles.title}>部署区块链通道</div>
          </div>
          <div className={styles.courseInfo}>填写区块链通道ID，6-12个小写字母字符串，选择通道包括的组织。</div>
          <img src={require('../../../assets/images/course-4.jpg')} style={{width:'592px'}} className={styles.courseImg}/>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.titleWrap}>
            <img src={require('../../../assets/images/help-heyue-icon.png')} className={styles.courseIcon}/>
            <div className={styles.title}>部署区块链智能合约</div>
          </div>
          <div className={styles.courseInfo} style={{width:'100%'}}>1. 填写智能合约ID 6-12个小写字母字符串 &nbsp; &nbsp; &nbsp; 2. 输入版本信息，例如（v1.0） &nbsp; &nbsp; &nbsp;  3. 上传智能合约zip包或者输入智能合约的git地址</div>
          <img src={require('../../../assets/images/course-5.png')} style={{width:'592px'}} className={styles.courseImg}/>
        </div>
        <div className={styles.courseItem}>
          <div className={styles.titleWrap}>
            <img src={require('../../../assets/images/help-maintain-icon.png')} className={styles.courseIcon}/>
            <div className={styles.title}>维护区块链智能合约</div>
          </div>
          <div className={styles.courseBlock}>
            <div className={styles.courseItemSub}>新增通道</div>
            <div className={styles.courseBlockDetail}>点击新增通道按钮，输入通道ID后选择该通道包含的组织，生成区块链项目通道</div>
          </div>
          <img src={require('../../../assets/images/course-7.jpg')} style={{width:'592px'}} className={styles.courseImg}/>
          <div className={styles.courseBlock}>
            <div className={styles.courseItemSub}>新增区块链智能合约</div>
            <div className={styles.courseBlockDetail}>点击新增智能合约，输入智能合约ID和智能合约版本和智能合约源码（zip压缩包或者git地址）</div>
          </div>
          <div className={styles.courseBlock}>
            <div className={styles.courseItemSub}>升级区块链智能合约</div>
            <div className={styles.courseBlockDetail}>点击升级按钮，编辑智能合约版本和智能合约源码（zip压缩包或者git地址）</div>
          </div>
          <img src={require('../../../assets/images/course-6.png')} style={{width:'592px'}} className={styles.courseImg}/>
        </div>
      </React.Fragment>
    )
  }
}
export default connect( ({detail})=>({detail}) )(Question);
