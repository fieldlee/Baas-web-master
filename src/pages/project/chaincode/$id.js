import React, {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import List from '../components/list';

class ChaincodeDetail extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'menu/updateProjectMenu'
    });
  }
  onEnterChaincode(cId) {
    router.push({
      pathname: `/project/chaincode/detail/${this.props.project.id}`,
      query: {
        cId
      }
    });
  }

  render() {
    const {id, addChannels} = this.props.project;
    return (
      <React.Fragment>
        <List id={id}
              list={addChannels}
              onChaincode={this.onEnterChaincode.bind(this)}
        />
      </React.Fragment>

    )
  }

}

export default connect(({project, menu}) => ({project, menu}))(ChaincodeDetail);
