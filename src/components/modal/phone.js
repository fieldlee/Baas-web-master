import React from 'react';
import {
  Form,
  Input,
  Button
} from 'antd';
import {connect} from 'dva';
import {BaseModal} from './base';
import {TimerCount} from '../timerCounter/index';

class Phone extends React.Component {
  getVertifyCode() {
    this.props.dispatch({
      type: 'account/setSendButtonStatus',
      payload: {
        isSend: true
      }
    });
    this.props.dispatch({
      type: 'account/getVertifyCode',
      payload: {
        telno: this.props.phoneNum
      }
    });
  }

  onTimerSendEnd() {
    this.props.dispatch({
      type: 'account/setSendButtonStatus',
      payload: {
        isSend: false
      }
    });
  }

  onCancel() {
    this.props.dispatch({
      type: 'account/hideModal'
    });
  }

  confirm() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onConfirm(values.verifycode);
      }
    });
  }

  render() {
    const {form, isShow, phoneNum, account, onConfirm} = this.props;
    const {getFieldDecorator} = form;
    return (
      <BaseModal
        title='手机验证'
        onCancel={this.onCancel.bind(this)}
        onConfirm={this.confirm.bind(this)}
        visible={isShow}
      >
        <Form.Item label='手机号' colon={false}>
          <span>{phoneNum}</span>
        </Form.Item>
        <Form.Item label='验证码' colon={false}>
          {getFieldDecorator('verifycode', {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: false,
                message: '请输入手机验证码'
              }
            ]
          })(
            <Input className='ant-input-lg' type='text' style={{width: 282}}
                   placeholder='请输入手机验证码'/>
          )}
          {
            account.isSend ?
              <Button className='ant-btn-lg' style={{float: 'right', width: 108, marginLeft: 14}} disabled>
                <TimerCount limit={60} onEnd={this.onTimerSendEnd.bind(this)}/>
              </Button>
              :
              <Button className='ant-btn-lg' style={{float: 'right', width: 108, marginLeft: 14}} onClick={this.getVertifyCode.bind(this)} type='primary'>发送</Button>
          }
        </Form.Item>
        {this.props.children}
      </BaseModal>
    );
  }
}

const PhoneCodeModal = connect(account => account)(Form.create()(Phone));

export {
  PhoneCodeModal
};
