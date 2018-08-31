import React, {Component} from 'react';
import {connect} from 'dva';
import {
  Collapse,
  Form,
  Row,
  Col,
  Icon
} from 'antd';
import PhonePanel from './components/phonePanel';
import EmailPanel from './components/emailPanel';
import PasswordPanel from './components/passwordPanel';
import styles from './index.less';

const Panel = Collapse.Panel;
const formItemLayout = {
  labelCol: {span: 3},
  wrapperCol: {span: 13},
};

function getPanelHeader(title, value, isEditDisabled) {
  return (
    <Row>
      <Col span={3}>
        <div className={styles.panelTitle}>{title}</div>
      </Col>
      <Col span={21}>
        <div className={styles.panelContent}>
          <span
            className={value ? styles.text : `${styles.add} ${styles.add}`}>{value || '点击添加'}</span>
          {!isEditDisabled && value !== '' ? <span className={styles.arrow}>修改<Icon type='caret-down' className={styles.arrowIcon}/></span> : null}
        </div>
      </Col>
    </Row>
  );
}

class Center extends Component {
  state = {
    isOpen: {}
  };
  onChange(key) {

  }
  render() {
    const {user} = this.props.account;
    return user ? <div className={styles.centerWrap}>
        <div className={styles.title}>个人中心</div>
        <div className={styles.centerInfo}>
          <Collapse accordion onChange={this.onChange.bind(this)}>
            <div
              className={styles.centerName}>{getPanelHeader('用户名：', user.username, true)}</div>
            <Panel header={getPanelHeader('手机号：', user.telno)} key='2'
                   showArrow={false}>
              <PhonePanel formItemLayout={formItemLayout}/>
            </Panel>
            <Panel header={getPanelHeader('邮箱：', user.email)} key='3'
                   showArrow={false}>
              <EmailPanel formItemLayout={formItemLayout}/>
            </Panel>
            <Panel header={getPanelHeader('密码：', '**********')} key='4'
                   showArrow={false}>
              <PasswordPanel formItemLayout={formItemLayout}/>
            </Panel>
          </Collapse>
        </div>
      </div>
      :
      null
  }
}

export default connect(account => account)(Form.create()(Center))