import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Checkbox,
  Button,
  Input
} from 'antd';
import {rules} from '../../../../utils/rules';
import {WrapMessage} from '../wrapMessage';

export class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: this.props.checkedChannels
    };
  }

  onGenerateChannel() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const id = this.props.project.id;
        this.props.dispatch({
          type: 'project/createChannel',
          payload: {
            id,
            channelId: values.channelId,
            includeOrgs: this.state.checkedList
          }
        });
      }
    });
  }


  change(checkedList) {
    this.setState({
      checkedList
    });
  };

  render() {
    const {isDisabled, channelId, channels, project, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <React.Fragment>
        <Form.Item className='mt-6' label='通道' colon={false}>
          {getFieldDecorator('channelId', {
            initialValue: channelId,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: false,
              type: 'string',
              message: <WrapMessage msg='通道ID格式不正确（请使用小写英文字母且不为空）'/>,
              pattern: rules.lowercase
            }]
          })(
            <Input disabled={isDisabled} className='ant-input-lg w540'
                   type='text'
                   placeholder='请输入通道ID（请使用小写英文字母）'/>
          )}
        </Form.Item>
        <Form.Item label=' ' colon={false}>
          <Checkbox.Group disabled={isDisabled}
                          options={channels}
                          value={this.state.checkedList}
                          onChange={this.change.bind(this)}/>
        </Form.Item>
        {
          !isDisabled ?
            <Form.Item className='mt-6 mb-0' label=' ' colon={false}>
              <Button style={{width: '200px'}}
                      onClick={this.onGenerateChannel.bind(this)}
                      type='primary'
                      loading={project.isChannelLoading}
                      htmlType='submit'>生成链</Button>
            </Form.Item>
            :
            null
        }
      </React.Fragment>
    )
  }
}

export default connect(project => project)(Form.create()(ChannelForm));
