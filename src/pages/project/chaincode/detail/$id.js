import React from 'react';
import {connect} from 'dva';
import {
  Form,
  Button
} from 'antd';
import NavLink from 'umi/navlink';
import ChannelForm from '../../components/chaincode/channelForm';
import ChaincodeForm from '../../components/chaincode/chaincodeForm';
import {ChaincodeList} from '../../components/chaincode/chaincodeList';
import {FormHelperPanel} from '../../components/formHelperPanel';
import styles from '../../form.less';

class ChainCodeDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'project/addNewChaincode',
      payload: {
        isUpdateChaincode: false,
        isNewChaincode: false
      }
    });
  }
  createChannel(channel) {
    const {project} = this.props;
    const {status, orgs, newChaincode} = project;

    if (channel) {
      const {includeOrgs} = channel;
      return <ChannelForm isDisabled={true}
                          channelId={channel.channelId}
                          checkedChannels={includeOrgs}
                          channels={includeOrgs}/>
    } else {
      const channelIds = [];
      orgs.map((org) => {
        channelIds.push(org.orgId);
      });

      return <ChannelForm
        isDisabled={(newChaincode) && status === 'channeled'}
        checkedChannels={channelIds}
        channels={channelIds}/>
    }
  }

  onAddChainCode() {
    this.props.dispatch({
      type: 'project/addNewChaincode',
      payload: {
        isUpdateChaincode: false,
        isNewChaincode: true
      }
    });
  }

  onUpdateChaincode(index, record) {
    this.props.dispatch({
      type: 'project/updateChaincode',
      payload: {
        index,
        isUpdateChaincode: true,
        isNewChaincode: false,
        record
      }
    })
  }

  getStatusForm() {
    const {project, routing} = this.props;
    const {addChannels, chaincodes, id, isNewChaincode, isUpdateChaincode} = project;
    const cId = routing.location.query.cId;
    const count = addChannels && addChannels.length;
    return count && addChannels.map((channel, index) => {
      const channelId = channel.channelId;
      if (cId && cId === channelId) {
        const chaincode = chaincodes[index] || {};
        return (
          <React.Fragment>
            {this.createChannel(channel)}
            <ChaincodeList styles={{marginLeft: '86px'}}
                           list={channel.chaincodes}
                           pagination={false}
                           onUpdate={this.onUpdateChaincode.bind(this, index)}/>
            <Button style={{marginLeft: '86px', width: '200px'}}
                    className='mt-4 mb-6 ant-btn-background-ghost-blue'
                    type='ghost'
                    onClick={this.onAddChainCode.bind(this, index)}
            >新增智能合约</Button>
            {
              isNewChaincode ?
                <ChaincodeForm chaincode={{}}
                               id={id}
                               channelId={channelId}
                               uploadType='upload'/>
                :
                null
            }
            {
              isUpdateChaincode ?
                <ChaincodeForm chaincode={chaincode}
                               id={id}
                               disabled={true}
                               channelId={channelId}
                               uploadType={chaincode.ccGitUrl !== '' ? 'url' : 'upload'}/>
                :
                null
            }
          </React.Fragment>
        )
      } else {
        return null;
      }
    })
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

export default connect(project => project)(Form.create()(ChainCodeDetailForm));
