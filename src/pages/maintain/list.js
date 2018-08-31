import React from 'react';
import {connect} from 'dva';
import { Table  } from 'antd';
import styles from './index.less'



class List extends React.Component{
  constructor(props) {
     super(props);
    this.columns = [{
      title: '子服务器',
      dataIndex: 'name',
      width: '28%',
    },
    {
      title: '子服务器状态',
      dataIndex: 'status',
      width: '20%',
      render: text => this.renderColumns(text)
    },
    {
      title: 'CPU',
      dataIndex: 'cpuUsage',
      width: '16%',
    },
    {
      title: '内存使用情况',
      dataIndex: 'memUsage',
      width: '25%',
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          <div className={styles.operation}>
            <button onClick={()=>this.operate(record.status,record.name,record.ip)}>{record.status==1?'停止':'启动'}</button>
            <button onClick={()=>this.operate(3,record.name,record.ip)}>备份</button>
          </div>
        );
      }
    }];
  }
  operate(status,name,ip){
    this.props.dispatch({
      type:'maintainDetail/operate',
      payload:{
        container_name:name,
        type:status+'',
        ip:ip,
        index:this.props.maintainDetail.currentIndex,
        id:this.props.id
      }
    })
  }

  renderColumns(text) {
    return(
      <div className={text==1?`${styles.run}`:`${styles.stop}`}>{text==1?'运行中':'停止'}</div>
    )    
  }

	render(){
		return(
			<Table 
        rowKey={(record,index) => index} 
        columns={this.columns} 
        dataSource={this.props.list} 
        className={styles.table} 
        pagination={false}
      />
		)
	}
}
export default connect(({maintainDetail})=>({maintainDetail}))(List)