import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button
} from 'antd';
import styles from '../index.less';
import {TimerCount} from '../../../components/timerCounter';

const FormItem = Form.Item;

class EmailPanel extends React.Component {
  getVertifyCode() {
    this.props.form.validateFields(['email'], (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/setSendButtonStatus',
          payload: {
            isEmailSend: true
          }
        });
        this.props.dispatch({
          type: 'account/sendEmail',
          payload: {
            email: values.email
          }
        });
      }
    });
  }
  onConfirm() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/changeEmail',
          payload: {
            email: values.email,
            emailCode: values.emailCode
          }
        });
      }
    });
  }
  onTimerSendEnd() {
    this.props.dispatch({
      type: 'account/setSendButtonStatus',
      payload: {
        isEmailSend: false
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {formItemLayout, account} = this.props;
    return <Form>
      <FormItem {...formItemLayout} label='新邮箱' colon={false}>
        {getFieldDecorator('email', {
          rules: [{
            required: true,
            message: '请输入新的邮箱',
          }, {
            type: 'email',
            message: '请输入合法的邮箱'
          }],
        })(
          <Input placeholder='请输入新的邮箱'/>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label='验证码' colon={false}>
        {getFieldDecorator('emailCode', {
          rules: [{
            required: true,
            message: '请输入验证码',
          }],
        })(
          <Input placeholder='请输入验证码' style={{width: 260}}/>
        )}
        {
          account.isEmailSend ?
            <Button type='primary' style={{
              float: 'right',
              height: '36px',
              width: '95px'
            }}>
              <TimerCount limit={60}
                          onEnd={this.onTimerSendEnd.bind(this)}/>
            </Button>
            :
            <Button type='primary' style={{
              float: 'right',
              height: '36px',
              width: '95px'
            }} onClick={this.getVertifyCode.bind(this)}>发送</Button>
        }
      </FormItem>
      <FormItem wrapperCol={{span: 12, offset: 2}}>
        <Button type='primary' htmlType='submit'
                className={styles.comfire} onClick={this.onConfirm.bind(this)}>确定</Button>
      </FormItem>
    </Form>
  }
}

export default connect(account => account)(Form.create()(EmailPanel));
