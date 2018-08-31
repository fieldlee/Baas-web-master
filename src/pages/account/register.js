import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Checkbox,
  Button
} from 'antd';
import NavLink from "umi/navlink";
import {rules} from '../../utils/rules';
import {DragValidator} from '../../components/dragValidator';
import {PhoneCodeModal} from '../../components/modal/phone';
import {InfoIconBox} from '../../components/modal/infoIconBox';
import iconUrl from '../../assets/images/lock.svg';
import styles from '../../assets/less/account/register.less';

class RegisterPage extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {account} = values;
        if (rules.email.test(account)) {
          delete values.telno; // 移除，防止注册误提交
          values.email = account;
          values.type = 'email';
          this.props.dispatch({
            type: 'account/register',
            payload: {
              ...values
            }
          });
        } else {
          delete values.email; // 移除，防止注册误提交
          values.telno = account;
          values.type = 'phone';
          this.props.dispatch({
            type: 'account/showModal',
            payload: {
              ...values
            }
          });
        }
      }
    });
  }

  toHomePage() {
    window.location.href = '/';
  }

  validateToNextPassword(rule, value, callback) {
    if (value && value !== '' && value.length < 6) {
      callback('用户密码至少6位');
      return;
    }
    const {validateFields, getFieldValue} = this.props.form;
    if (value && getFieldValue('confirm')) {
      validateFields(['confirm'], {force: true});
    }
    callback();
  }

  compareToFirstPassword(rule, value, callback) {
    const {getFieldValue} = this.props.form;
    if (value !== '' && value !== undefined && value !== getFieldValue('password')) {
      callback('确认密码不一致');
    } else {
      callback();
    }
  }

  onPhoneCodeConfirm(verifycode) {
    const {checkcode, random, telno, username, password, email} = this.props.account;
    const account = {checkcode, random, username, password};
    if (telno) {
      account.telno = telno;
    } else {
      account.email = email;
    }

    this.props.dispatch({
      type: 'account/register',
      payload: {...account, verifycode: verifycode}
    });
  }

  onValidatorSuccess() {
    this.props.dispatch({
      type: 'account/getCheckCode',
      payload: {
        random: Math.floor((1000000000 + Math.random()) * 0x10000).toString(16),
        cb: () => {
          const {account, form} = this.props;
          form.setFieldsValue({
            checkcode: account.checkcode,
            random: account.random
          });
        }
      }
    });
  }

  checkAccount(rule, value, callback) {
    if (value && value !== '') {
      let type = 'account/checkEmail';
      let payload = {
        email: value,
        cb: callback
      };
      if (rules.phone.test(value)) {
        type = 'account/checkPhone';
        payload.telno = value;
        delete payload.email;
      }
      this.props.dispatch({
        type,
        payload
      });
    } else {
      callback();
    }
  }

  checkUser(rule, value, callback) {
    if (value && value !== '') {
      this.props.dispatch({
        type: 'account/checkUser',
        payload: {
          username: value,
          cb: callback
        }
      });
    } else {
      callback();
    }
  }

  checkAgreement(rule, value, callback) {
    if (!value) {
      callback('必须同意链佰BaaS服务条款');
    } else {
      callback();
    }
  }

  render() {
    const {form, account} = this.props;
    const {getFieldDecorator, getFieldProps} = form;
    return (
      <div className='container'>
        <Form className={`${styles.form} ${styles.registerForm}`}>
          <h2 className={styles.formTitle}>欢迎注册链佰BaaS账号</h2>
          <Form.Item label='' colon={false}>
            {getFieldDecorator('username', {
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  whitespace: false,
                  message: '用户名不能为空'
                },
                this.checkUser.bind(this)
              ]
            })(
              <Input className='ant-input-lg' type='text' autoComplete={false}
                     placeholder='请输入用户名'/>
            )}
          </Form.Item>
          <Form.Item label='' colon={false}>
            {getFieldDecorator('password', {
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  whitespace: false,
                  message: '密码不能为空'
                },
                {
                  validator: this.validateToNextPassword.bind(this),
                }
              ]
            })(
              <Input className='ant-input-lg' type='password' autoComplete={false}
                     placeholder='设置你的登陆密码'/>
            )}
          </Form.Item>
          <Form.Item label='' colon={false}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  whitespace: false,
                  message: '确认密码不能为空'
                },
                {
                  validator: this.compareToFirstPassword.bind(this),
                }
              ]
            })(
              <Input className='ant-input-lg' type='password' autoComplete={false}
                     placeholder='再次输入您的密码'/>
            )}
          </Form.Item>
          <Form.Item label='' colon={false}>
            {getFieldDecorator('account', {
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  whitespace: false,
                  message: '输入手机或邮箱格式不正确',
                  pattern: rules.ep2
                },
                this.checkAccount.bind(this)
              ]
            })(
              <Input className='ant-input-lg' type='text' autoComplete={false}
                     placeholder='请输入手机号或邮箱'/>
            )}
          </Form.Item>
          <Form.Item label='' colon={false}>
            <DragValidator width={450}
                           onSuccess={this.onValidatorSuccess.bind(this)}/>
            <Input className='ant-input-lg' type='hidden' {
              ...getFieldProps('checkcode', {
                rules: [
                  {
                    required: true,
                    whitespace: false,
                    message: '请获取验证码'
                  }
                ]
              })}/>
            <Input className='ant-input-lg' type='hidden' {
              ...getFieldProps('random', {
                rules: [
                  {
                    required: true,
                    whitespace: false,
                    message: '请获取验证码'
                  }
                ]
              })}/>
          </Form.Item>
          <Form.Item className='u-text-center' label='' colon={false}>
            <Button className='btn-block'
                    onClick={this.onSubmit.bind(this)} type='primary'
                    htmlType='submit'>注册</Button>
          </Form.Item>
          <Form.Item className='extra' label='' colon={false}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                validateTrigger: ['onChange'],
                rules: [
                  {
                    required: true,
                    whitespace: false,
                    type: 'boolean',
                    message: ' '
                  },
                  this.checkAgreement.bind(this)
                ]
              })(
                <Checkbox>
                  <NavLink to='/terms'>《链佰BaaS服务条款》</NavLink>
                </Checkbox>
              )}
              <a href=''>《法律声明和隐私权政策法规》</a>
            </Form.Item>
          <PhoneCodeModal
            onConfirm={this.onPhoneCodeConfirm.bind(this)}
            isShow={!account.isSuccess && account.isShow && account.type === 'phone'}
            phoneNum={account.telno}
          />

          <InfoIconBox
            isShow={account.isSuccess && account.type === 'phone'}
            iconUrl={iconUrl}
            title='账号注册成功'
            onCancel={this.toHomePage.bind(this)}
          >
            <p>请妥善保管账号，以免遗失～</p>
            <a href='/'>返回首页</a>
          </InfoIconBox>

          <InfoIconBox
            isShow={account.isSuccess && account.type === 'email'}
            iconUrl={iconUrl}
            title='账号注册成功'
            onCancel={this.toHomePage.bind(this)}
          >
            <p>邮件发送成功，请打开邮件完成验证<br/>{account.email}</p>
            <a href='/'>返回首页</a>
          </InfoIconBox>
        </Form>
      </div>
    )
  }
}

export default connect(account => account)(Form.create()(RegisterPage));
