import React,{ Component } from 'react';
import { Collapse } from 'antd';
import {connect} from 'dva';
import styles from './index.less';
import Table from './table.js'
const TermColumns = [{
  title: '术语',
  dataIndex: 'term',
  key: 'term',
  width:'20%'
}, {
  title: '中文',
  dataIndex: 'chinese',
  key: 'chinese',
  width:'20%'
}, {
  title: '说明',
  dataIndex: 'sub',
  key: 'sub',
}];

const TermData = [{
  key: '1',
  term: 'channel',
  chinese: '通道',
  sub: '通道是构建在“Fabric”网络上的私有区块链，实现了数据的隔离和保密。'
}, {
  key: '2',
  term: 'ledger',
  chinese: '账本',
  sub: '一个 channel 的 chain 和由 channel 中每个 peer 维护的 world state。'
}, {
  key: '3',
  term: 'chaincode',
  chinese: '合约',
  sub: '一个运行在账本上的软件，它可以对资产进行编码，其中的交易指令（或者叫业务逻辑）也可以用来修改资产。'
}, {
  key: '4',
  term: 'block',
  chinese: '区块',
  sub: '在一个通道上，（区块是）一组有序交易的集合。'
}, {
  key: '5',
  term: 'peer',
  chinese: '节点',
  sub: '一个网络实体，维护 Ledger 并运行 Chaincode 容器来对账本执行 read-write 操作。'
}];

const InputColumns = [{
  title: '参数名',
  dataIndex: 'name',
  key: 'name',
  width:'20%'
}, {
  title: '是否必填',
  dataIndex: 'must',
  key: 'must',
  width:'20%'
}, {
  title: '类型',
  dataIndex: 'kind',
  key: 'kind',
  width:'20%'
}, {
  title: '说明',
  dataIndex: 'sub',
  key: 'sub',
}];

const InputData = [{
  key: '1',
  name: 'username',
  must: '是',
  kind: 'string',
  sub:'登录区块链项目的用户名'
}, {
  key: '2',
  name: 'password',
  must: '是',
  kind: 'string',
  sub:'登录区块链项目的密码'
}, {
  key: '3',
  name: 'orgName',
  must: '是',
  kind: 'string',
  sub:'登录区块链项目组织名称'
}];



const OutputData = [{
  key: '1',
  name: 'success',
  must: '是',
  kind: 'Bool',
  sub:'登录状态，false表明登录失败'
}, {
  key: '2',
  name: 'message',
  must: '是',
  kind: 'string',
  sub:'模块错误信息描述，与接口相关'
}, {
  key: '3',
  name: 'token',
  must: '是',
  kind: 'string',
  sub:'登录后获得token信息'
}];

const apiData = [{
  key: '1',
  name: 'func',
  must: '是',
  kind: 'string',
  sub:'调用的合约的函数名'
}, {
  key: '2',
  name: 'args',
  must: '否',
  kind: '数组',
  sub:'函数参数列表'
}];

const outData = [{
  key: '1',
  name: 'success',
  must: '是',
  kind: 'Bool',
  sub:'调用接口的状态，false 表明接口错误。'
}, {
  key: '2',
  name: 'info',
  must: '是',
  kind: 'String',
  sub:'区块链返回的结果 '
}];

class Question extends Component{
  render(){
    const { questionList } = this.props.detail;
    return(
      <div className={styles.apiWrap}>
        <div className={styles.titleWrap}>
          <div className={styles.title}><span className={styles.titleCircle}></span>API文档</div>
        </div>
        <div className={styles.apiPadding}>
          <div className={styles.titleInfo}>链佰区块链（BaaS）致力于为企业提供金融级别区块链基础设施服务，通过区块链云上的服务，为行业提供安全、可靠、灵活的解决方案。打造一个开放分享、能力全面，标准统一的区块链生态圈，为众多行业客户提供完备的区块链服务。</div>
          <Table title='术语表：' columns={TermColumns} data={TermData}/>
        </div>
        <div className={`${styles.titleWrap} ${styles.titleWrap2}`}>
          <div className={styles.title}><span className={styles.titleCircle}></span>获取token接口</div>
        </div>
        <div className={styles.apiInfo}>
          <div>接口API ：http://&lt;ip&gt;:4000/login</div>
          <div>接口说明：登录区块链项目获得接口token</div>
          <div>调用方法：POST</div>
        </div>
        <div className={styles.apiPadding}>
          <Table title='输入参数：' columns={InputColumns} data={InputData}/>
          <div style={{height:'30px',width:'100%'}}></div>
          <Table title='输出参数：' columns={InputColumns} data={OutputData}/>
        </div>
        <div className={`${styles.titleWrap} ${styles.titleWrap2}`}>
          <div className={styles.title}><span className={styles.titleCircle}></span>调用invoke接口</div>
        </div>
        <div className={styles.apiInfo}>
          <div>接口API ：http://&lt;ip&gt;:4000/channels/&lt;channelID&gt;/chaincodes/&lt;chaincodeID&gt;</div>
          <div>接口说明：&lt;ip&gt;:部署项目的IP地址</div>
          <div className={styles.infoIndent}>&lt;channelID&gt;：表示部署区块链项目中的通道ID</div>
          <div className={styles.infoIndent}>&lt;chaincodeID&gt;表示该通道中安装的智能合约ID</div>
          <div>调用方法：POST</div>
        </div>
        <div className={styles.apiPadding}>
          <Table title='输入接口说明：' columns={InputColumns} data={apiData}/>
          <div className={styles.apiSub} style={{marginTop:'30px'}}>举例：</div>
          <img src={require('../../../assets/images/api-exmple.png')} style={{margin:'25px 0'}}/>
          <Table title='输出参数：' columns={InputColumns} data={outData}/>
        </div>
      </div>
    )
  }
}
export default connect( ({detail})=>({detail}) )(Question);
