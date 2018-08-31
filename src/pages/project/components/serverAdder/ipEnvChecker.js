import React from 'react';
import {Icon, Tooltip, Button} from 'antd';
import {connect} from 'dva';
import styles from './ipEnvChecker.less';

class IPEnvChecker extends React.Component {
  onInstall() {
    const {id, ip} = this.props;
    this.props.dispatch({
      type: 'project/onReinstallEnv',
      payload: {
        id,
        ip
      }
    });
  }

  render() {
    const {message, isInstalled, id, ip} = this.props;
    return (
      <div className={styles.envCheckerContainer}>
        {
          isInstalled ?
            <i className={styles.success}/>
            :
            <Button.Group>
              <Button type='primary'
                      onClick={this.onInstall.bind(this, id, ip)}
                      htmlType='submit'>一键部署</Button>
              <Tooltip title={message}>
                <Button type='primary'>
                  <Icon type='question-circle'/>
                </Button>
              </Tooltip>
            </Button.Group>
        }
      </div>
    )
  }
}

export default connect(({project})=>{project})(IPEnvChecker);
