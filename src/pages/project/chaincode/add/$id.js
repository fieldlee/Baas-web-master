import React from 'react';
import {connect} from 'dva';
import NavLink from 'umi/navlink';
import {
  Form,
} from 'antd';
import ChannelForm from '../../components/chaincode/channelForm';
import {FormHelperPanel} from '../../components/formHelperPanel';
import styles from '../../form.less';

class ChaincodeAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'project/addNewChaincode',
      payload: {
        newChaincode: false,
        newChannelId: ''
      }
    })
  }

  createChannel() {
    const {project} = this.props;
    const {orgs} = project;
    const channelIds = [];
    orgs.map((org) => {
      channelIds.push(org.orgId);
    });

    return <ChannelForm
      isDisabled={false}
      checkedChannels={channelIds}
      channels={channelIds}/>
  }

  getStatusForm() {
    return this.createChannel()
  }

  render() {
    return (
      <div className={styles.projectFormContainer}>
        <Form className={styles.form}>
          <NavLink className={styles.projectBack} to={`/project/chaincode/${this.props.project.id}`}>&lt; 返回</NavLink>
          {
            this.getStatusForm()
          }
        </Form>
        <FormHelperPanel/>
      </div>
    );
  }
}

export default connect(project => project)(Form.create()(ChaincodeAddForm));
