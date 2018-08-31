import React from 'react';
import {connect} from 'dva';
import {Tabs, Input} from 'antd';
import moment from 'moment';
import List from './components/list';
import styles from './index.less'

const list1 = {
  columns: [
    {
      title: '操作人',
      dataIndex: 'username',
      key: 'username',
      width: '10%'
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
      width: '20%',
      render: (text) => {
        return moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '调用接口',
      dataIndex: 'interaction',
      key: 'interaction',
      width: '20%',
    },
    {
      title: '传入内容',
      dataIndex: 'data',
      key: 'data',
      render: (text) => {
        return <div className={styles.logContent} title={text}>{text}</div>
      }
    }
  ]
};


class Log extends React.Component {
  onSearch(value) {
    this.props.dispatch({
      type: 'admin/logList',
      payload: {
        search:value
      }
    })
  }
  render() {
    const { logList , search } = this.props.admin

    return (
      
      <React.Fragment>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <div className={styles.listTitle}>项目日志</div>
            <div>
              <Input.Search placeholder='根据操作人或内容检索'
                              size='large'
                              onSearch={this.onSearch.bind(this)}
                              onKeyUp={(e)=>this.onSearch(e.target.value)}
                              style={{width: 540}}
                />
            </div>
          </div>
          <List list={logList} columns={list1.columns} type='logList' search={search}/>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({admin}) => ({admin}))(Log);
