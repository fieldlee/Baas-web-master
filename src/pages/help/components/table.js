import React,{ Component } from 'react';
import {connect} from 'dva';
import styles from './index.less';
import { Table } from 'antd';


class ApiTable extends Component{
  render(){
    const { title ,columns,data } = this.props;
    return(
      <React.Fragment>
        <div className={styles.apiSub}>{title}</div>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </React.Fragment>
    )
  }
}
export default connect( ({detail})=>({detail}) )(ApiTable);
