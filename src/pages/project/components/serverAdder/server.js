import React from 'react';
import {Form, Checkbox, Input} from 'antd';
import styles from '../../form.less';
import IPEnvChecker from './ipEnvChecker';
import {WrapMessage} from '../wrapMessage';

export class Server extends React.Component {
  state = {
    isChecked: this.props.isChecked
  };

  toggle(e) {
    this.setState({
      isChecked: e.target.checked
    });
  }

  render() {
    const {form, decoratorName, value, isDisable, serverEnv, index} = this.props;
    const {getFieldDecorator} = form;

    return (
      <div className={styles.formServer} key={index}>
        <Form.Item className='mb-2' label='' colon={false}>
          <Checkbox disabled={isDisable} checked={this.state.isChecked}
                    onChange={this.toggle.bind(this)}>自有服务器</Checkbox>
        </Form.Item>
        {
          this.state.isChecked ?
            <Form.Item className='mb-2' label='服务器IP' colon={false}>
              {getFieldDecorator(decoratorName, {
                initialValue: value,
                validateTrigger: ['onChange'],
                rules: [{
                  required: this.state.isChecked,
                  whitespace: false,
                  type: 'string',
                  message: <WrapMessage msg='服务器IP错误'/>,
                  pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                }]
              })(
                <Input disabled={isDisable} className='w306'
                       type='text'
                       placeholder='请输入服务器IP'/>
              )}
              {
                serverEnv ?
                  <IPEnvChecker {...serverEnv}/>
                  :
                  null
              }
            </Form.Item>
            :
            null
        }
      </div>
    );
  }
}