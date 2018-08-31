import React from "react";
import { connect } from "dva";
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  Radio
} from "antd";
import { rules } from "../../../../utils/rules";
import { WrapMessage } from "../wrapMessage";

export class ChaincodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadType: this.props.uploadType
    };
  }

  changeUploadChainCodeType(e) {
    this.setState({
      uploadType: e.target.value
    });
  }

  checkCCName(rules, value, callback) {
    const { addChannels } = this.props.project;
    let isError;
    if (addChannels) {
      addChannels.map((channel) => {
        if (channel.chaincodes) {
          channel.chaincodes.map((code) => {
            if (code.ccName === value) {
              isError = true;
            }
          });
        }
      });
    }
    if (isError) {
      callback(<WrapMessage msg='智能合约ID已存在'/>);
    } else {
      callback();
    }
  }

  onCreateChainCode() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id, channelId } = this.props;
        this.props.dispatch({
          type: "project/createChainCode",
          payload: {
            id,
            pid: id,
            channelId,
            ccGitUrl: values.ccGitUrl,
            ccVersion: values.ccVersion,
            ccName: values.ccName,
            uploadfile: values.uploadfile && values.uploadfile.file
          }
        });
      }
    });
  }

  render() {
    const { form, chaincode, uploadType, disabled } = this.props;
    const button = this.props.button || {};
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item label='智能合约' colon={false}>
          <Radio.Group defaultValue={uploadType}
                       size='large'
                       onChange={this.changeUploadChainCodeType.bind(this)}>
            <Radio.Button value='upload'>上传</Radio.Button>
            <Radio.Button value='url'>GIT</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='智能合约ID' colon={false}>
          {getFieldDecorator("ccName", {
            validateTrigger: ["onChange"],
            initialValue: chaincode.ccName,
            rules: [
              {
                required: !disabled,
                whitespace: true,
                message: <WrapMessage msg='智能合约ID格式不正确（请使用小写英文字母且不为空）'/>,
                pattern: rules.lowercase
              },
              !disabled && this.checkCCName.bind(this)
            ]
          })(
            <Input className='ant-input-lg w540' type='text' disabled={disabled}
                   placeholder='请输入智能合约ID（请使用小写英文字母）'/>
          )}
        </Form.Item>
        <Form.Item label='版本' colon={false}>
          {getFieldDecorator("ccVersion", {
            validateTrigger: ["onChange", "onBlur"],
            initialValue: chaincode.ccVersion,
            rules: [{
              required: true,
              whitespace: true,
              message: <WrapMessage msg='请输入智能合约版本'/>
            }]
          })(
            <Input className='ant-input-lg w540' type='text'
                   placeholder='请输入智能合约版本,比如:v1.0.0'/>
          )}
        </Form.Item>
        {
          this.state.uploadType === "upload" ?
            <Form.Item label=' ' colon={false}>
              {getFieldDecorator("uploadfile", {
                valuePropName: "uploadfile"
              })(
                <Upload name='uploadfile'
                        beforeUpload={() => {
                          return false;
                        }} listType='text'>
                  <Button>
                    <Icon type='upload'/> 点击上传
                  </Button>
                </Upload>
              )}
            </Form.Item>
            :
            <Form.Item label='GIT' colon={false}>
              {getFieldDecorator("ccGitUrl", {
                validateTrigger: ["onChange", "onBlur"],
                initialValue: chaincode.ccGitUrl,
                rules: [{
                  required: true,
                  whitespace: true,
                  message: <WrapMessage msg='请输入智能合约git地址'/>
                }]
              })(
                <Input className='ant-input-lg w540'
                       type='text'
                       placeholder='请输入智能合约git地址'/>
              )}
            </Form.Item>
        }
        <Button style={{ marginLeft: "86px", width: "200px" }}
                className={button.classNames ? `mb-6 ${button.classNames}` : "mb-6 ant-btn-background-ghost-blue"}
                type={button.type ? button.type : "ghost"}
                onClick={this.onCreateChainCode.bind(this)}
        >{button.text ? button.text : "部署智能合约"}</Button>
      </div>
    );
  }
}

export default connect(project => project)(Form.create()(ChaincodeForm));
