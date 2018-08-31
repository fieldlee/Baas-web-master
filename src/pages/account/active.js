import React from 'react';
import {connect} from 'dva';
import {
  Form
} from 'antd';
import {InfoIconBox} from '../../components/modal/infoIconBox';
import iconUrl from '../../assets/images/lock.svg';
import styles from '../../assets/less/form.less';

export class AccountActivePage extends React.Component {
  toHomePage() {
    window.location.href = '/';
  }
  render() {
    const {account} = this.props;
    return (
      <div className='container'>
        <Form className={`${styles.form} ${styles.registerForm}`}>
          <InfoIconBox
            isShow={account.isSuccess}
            iconUrl={iconUrl}
            title='账号激活成功'
            onCancel={this.toHomePage.bind(this)}
          >
            <p>请妥善保管账号，以免遗失～</p>
            <a href='/'>返回首页</a>
          </InfoIconBox>
        </Form>
      </div>
    )
  }
}

export default connect(account => account)(Form.create()(AccountActivePage));
