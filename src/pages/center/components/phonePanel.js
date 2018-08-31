import React from 'react';
import {rules} from '../../../utils/rules';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button
} from 'antd';
import {TimerCount} from '../../../components/timerCounter';
import styles from '../index.less';

const FormItem = Form.Item;

class PhonePanel extends React.Component {
  getVertifyCode() {
    this.props.form.validateFields(['phone'], (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/setSendButtonStatus',
          payload: {
            isPhoneSend: true
          }
        });
        this.props.dispatch({
          type: 'account/getVertifyCode',
          payload: {
            telno: values.phone
          }
        });
      }
    });
  }

  onTimerSendEnd() {
    this.props.dispatch({
      type: 'account/setSendButtonStatus',
      payload: {
        isPhoneSend: false
      }
    });
  }

  onModifyMobile() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/changePhoneNumber',
          payload: {
            telno: values.phone,
            telnoCode: values.code
          }
        });
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {formItemLayout, account} = this.props;
    return (
      <Form>
        <FormItem {...formItemLayout} label='手机号' colon={false}>
          {getFieldDecorator('phone', {
            validateTrigger: ['onChange'],
            rules: [{
              required: true,
              message: '请输入新的手机号码',
              pattern: rules.phone
            }],
          })(
            <Input placeholder='请输入新手机号'/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='验证码' colon={false}>
          {getFieldDecorator('code', {
            rules: [{
              required: true,
              message: '请输入验证码',
            }],
          })(
            <Input placeholder='请输入验证码' style={{width: 260}}/>
          )}
          {
            account.isPhoneSend ?
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
                  className={styles.comfire} onClick={this.onModifyMobile.bind(this)}>确定</Button>
        </FormItem>
      </Form>
    )
  }
}

export default connect(account => account)(Form.create()(PhonePanel));
