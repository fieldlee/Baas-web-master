import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button
} from 'antd';
import styles from './login.less';

class Login extends React.Component {
  onLogin() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/login/login',
          payload: {
            ...values
          }
        })
      }
    });
  }

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div className={styles.loginContainer}>
        <Form className={styles.login}>
          <h2 className={styles.formTitle}>欢迎登陆链佰BaaS系统</h2>
          <Form.Item label='' colon={false}>
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                whitespace: false,
                message: '请输入用户名'
              }]
            })(
              <Input className='ant-input-lg' type='text'
                     placeholder='请输入用户名'/>
            )}
          </Form.Item>
          <Form.Item label='' colon={false}>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                whitespace: false,
                message: '请输入密码'
              }]
            })(
              <Input className='ant-input-lg' type='password'
                     placeholder='请输入密码'/>
            )}
          </Form.Item>
          <Form.Item label='' colon={false}>
            <Button className='btn-block'
                    onClick={this.onLogin.bind(this)} type='primary'
                    htmlType='submit'>登录</Button>
            <a href='/account/register'>注册</a>
            <a href='/account/forgot' className={styles.forgot}>忘记密码</a>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default connect(login => login)(Form.create()(Login));
