import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button
} from 'antd';
import styles from '../index.less';

const FormItem = Form.Item;

class PasswordPanel extends React.Component {
  validateToNextPassword(rule, value, callback) {
    const {validateFields, getFieldValue} = this.props.form;
    if (value && getFieldValue('repeatPassword')) {
      validateFields(['repeatPassword'], {force: true});
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

  handleModifyPassword() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'account/modifyPassword',
          payload: {
            oldpassword: values.oldpassword,
            password: values.password
          }
        });
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {formItemLayout} = this.props;
    return (
      <Form>
        <FormItem {...formItemLayout} label='旧密码' colon={false}>
          {getFieldDecorator('oldpassword', {
            rules: [{
              required: true,
              message: '请输入新的密码',
            }],
          })(
            <Input placeholder='请输入新的密码' type='password'/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='新密码' colon={false}>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入新的密码',
            }],
          })(
            <Input placeholder='请输入新的密码' type='password'/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='确认' colon={false}>
          {getFieldDecorator('repeatPassword', {
            rules: [
              {
                required: true,
                message: '请再次输入新密码',
              },
              {
                validator: this.compareToFirstPassword.bind(this),
              }
            ],
          })(
            <Input placeholder='请再次输入新密码' type='password'/>
          )}
        </FormItem>
        <FormItem wrapperCol={{span: 12, offset: 2}}>
          <Button type='primary' htmlType='submit'
                  className={styles.comfire} onClick={this.handleModifyPassword.bind(this)}>确定</Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect(account => account)(Form.create()(PasswordPanel));
