import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Radio,
  Button
} from 'antd';
import {rules} from '../../utils/rules';
import auth from '../../utils/auth';
import {DragValidator} from '../../components/dragValidator/index';
import {PhoneCodeModal} from '../../components/modal/phone';
import {InfoIconBox} from '../../components/modal/infoIconBox';
import iconUrl from '../../assets/images/lock.svg';
import styles from '../../assets/less/account/fogot.less';
import {BaseModal} from '../../components/modal/base';

class ForgotPage extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {type} = this.props.account;
        this.props.dispatch({
          type: 'account/forgot',
          payload: {
            ...values,
            type
          }
        })
      }
    });
  }

  onChangeVertifyType(e) {
    this.props.dispatch({
      type: 'account/changeVertifyType',
      payload: {
        type: e.target.value
      }
    });
  }

  onForgotConfirm(verifycode) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {telno} = this.props.account;
        this.props.dispatch({
          type: 'account/recoverPasswordByMobile',
          payload: {
            telno,
            verifycode,
            newpassword: values.password
          }
        });
      }
    });
  }

  validateToNextPassword(rule, value, callback) {
    const {validateFields} = this.props.form;
    if (value) {
      validateFields(['confirm'], {force: true});
    }
    callback();
  }

  compareToFirstPassword(rule, value, callback) {
    const {getFieldValue} = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('确认密码不一致');
    } else {
      callback();
    }
  }

  toHomePage(isClearAuth) {
    if (isClearAuth) {
      auth.signOut('/');
    } else {
      window.location.href = '/';
    }
  }

  recoverPassword() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {token} = this.props.account;
        this.props.dispatch({
          type: 'account/activePassword',
          payload: {
            ...values,
            token
          }
        })
      }
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

  render() {
    const {form, account} = this.props;
    const {type, isRecoverPassword, isRecoverSuccess} = account;
    const {getFieldDecorator, getFieldProps} = form;
    const isShowModal = !account.isSuccess && account.isShow && account.type === 'phone';
    const isSendEmailSuccess = account.isSuccess && account.type === 'email';
    return (
      <div className='container'>
        <Form className={`${styles.form} ${styles.registerForm}`}>
          {!isRecoverPassword
            ?
            <React.Fragment>
              <h2 className={styles.formTitle}>忘记密码</h2>
              <Form.Item label='' colon={false}>
                {getFieldDecorator('username', {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: false,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input className='ant-input-lg' type='text'
                         placeholder='请输入用户名'/>
                )}
              </Form.Item>
              <Form.Item label='' colon={false}>
                <Radio.Group name="type" defaultValue={type}
                             onChange={this.onChangeVertifyType.bind(this)}>
                  <Radio value='phone'>手机验证</Radio>
                  <Radio value='email'>邮箱验证</Radio>
                </Radio.Group>
              </Form.Item>
              {type === 'phone' ?
                <Form.Item label='' colon={false}>
                  {getFieldDecorator('telno', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      {
                        required: true,
                        whitespace: false,
                        message: '输入手机格式不正确',
                        pattern: rules.ep2
                      }
                    ]
                  })(
                    <Input className='ant-input-lg' type='text'
                           placeholder='请输入手机号'/>
                  )}
                </Form.Item>
                :
                null
              }
              {type === 'email' ?
                <Form.Item label='' colon={false}>
                  {getFieldDecorator('email', {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      {
                        required: true,
                        whitespace: false,
                        message: '输入邮箱格式不正确',
                        pattern: rules.ep2
                      }
                    ]
                  })(
                    <Input className='ant-input-lg' type='text'
                           placeholder='请输入邮箱'/>
                  )}
                </Form.Item>
                :
                null
              }
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
                        htmlType='submit'>下一步</Button>
              </Form.Item>
              {isShowModal ?
                <PhoneCodeModal
                  onConfirm={this.onForgotConfirm.bind(this)}
                  isShow={isShowModal}
                  phoneNum={account.telno}
                >
                  <Form.Item label='密码' colon={false}>
                    {getFieldDecorator('password', {
                      validateTrigger: ['onChange', 'onBlur'],
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
                      <Input className='ant-input-lg' type='password'
                             placeholder='设置你的登陆密码'/>
                    )}
                  </Form.Item>
                  <Form.Item label='新密码' colon={false}>
                    {getFieldDecorator('confirm', {
                      validateTrigger: ['onChange', 'onBlur'],
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
                      <Input className='ant-input-lg' type='password'
                             placeholder='再次输入您的密码'/>
                    )}
                  </Form.Item>
                </PhoneCodeModal>
                :
                null
              }
              {isSendEmailSuccess ?
                <InfoIconBox
                  isShow={true}
                  iconUrl={iconUrl}
                  onCancel={this.toHomePage.bind(this)}
                >
                  <p>邮件发送成功，请打开邮件完成验证<br/>{account.email}</p>
                  <a onClick={this.toHomePage.bind(this, true)}>返回首页</a>
                </InfoIconBox>
                :
                null
              }
            </React.Fragment>
            :
            <BaseModal
              title='邮箱验证'
              onConfirm={this.recoverPassword.bind(this)}
              onCancel={this.toHomePage.bind(this)}
              visible={true}
            >
              <Form.Item label='密码' colon={false}>
                {getFieldDecorator('password', {
                  validateTrigger: ['onChange', 'onBlur'],
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
                  <Input className='ant-input-lg' type='password'
                         placeholder='设置你的登陆密码'/>
                )}
              </Form.Item>
              <Form.Item label='新密码' colon={false}>
                {getFieldDecorator('confirm', {
                  validateTrigger: ['onChange', 'onBlur'],
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
                  <Input className='ant-input-lg' type='password'
                         placeholder='再次输入您的密码'/>
                )}
              </Form.Item>
            </BaseModal>
          }

          {isRecoverSuccess ?
            <InfoIconBox
              isShow={true}
              iconUrl={iconUrl}
              title='密码修改成功'
              onCancel={this.toHomePage.bind(this)}
            >
              <p>请妥善保管密码，以免遗失～</p>
              <a onClick={this.toHomePage.bind(this, true)}>返回首页</a>
            </InfoIconBox>
            :
            null
          }
        </Form>
      </div>
    )
  }
}

export default connect(account => account)(Form.create()(ForgotPage));
