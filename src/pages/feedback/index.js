import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  Button,
  Select,
  message
} from 'antd';
// import {BannerSlider} from '../../components/banner/bannerSlider';
import styles from './index.less';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;


class Feedback extends React.Component{
	submit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'feedback/submit',
          payload: {
            ...values,
          }
        });
      } else {
        message.success('请填写信息', 1);
      }
    });
  }


	render(){
		const { getFieldDecorator } = this.props.form;
		const {banner,feedback} = this.props.feedback;
    const options = feedback.feedbackList.map(item => <Option key={item}>{item}</Option>);
		return(
			<React.Fragment>
        <div className={styles.feedbackWrap}>
        	<FormItem >
        		{getFieldDecorator('type',{
        			rules:[{required:true,message:'请选择反馈类型'}]
        		})(<Select size='large' placeholder='请选择反馈类型' style={{width:'100%',height:'36px'}}>
                {options}
              </Select>)}
        	</FormItem>
					<FormItem>
						{getFieldDecorator('telno',{
							rules:[{required:true,message:'请输入联系方式'}]
						})(<Input placeholder='请输入联系方式' className='ant-input-lg'/>)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('body',{
							rules:[{required:true,message:'请填写问题描述'}]
						})(<TextArea placeholder='请填写问题描述' className={styles.feedbackTextArea} style={{height:'190px',resize:'none',padding:'12px 14px'}}/>)}
					</FormItem>
					<Button className='feedbackBtn' type='primary' onClick={this.submit.bind(this)}>提交</Button>
          <div className={styles.contactWay}>
            <div>技术热线：(021)5633 0305</div>
            <div>反馈邮箱：public@lianbai.io</div>
          </div>
        </div>
      </React.Fragment>
		)
	}
} 

export default connect((feedback) => {
  return {
    feedback
  }
})(Form.create()(Feedback));
