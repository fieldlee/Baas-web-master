import React from 'react';
import {connect} from 'dva';
import {Tabs, Input} from 'antd';
import moment from 'moment';
import { Link , withRouter } from 'dva/router';

import List from '../components/list';
import styles from '../index.less'
const user = {
  columns: [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: '15%'
    },
    {
      title: '电话',
      dataIndex: 'telno',
      key: 'telno',
      width: '20%',
      render:(text,record)=>{
        return text ? <div>{text}</div>:'----'
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      render:(text,record)=>{
        return text ? <div>{text}</div>:'----'
      }
    },
    {
      title: '项目数',
      dataIndex: 'projectNum',
      key: 'projectNum',
      width: '20%',
      render:(text,record)=>{
        return <div><Link to={`/admin/user/${record.username}`}>{text}</Link></div>
      }
    },
  ]
};


class People extends React.Component {

  onSearch(value) {
    this.props.dispatch({
      type: 'admin/userList',
      payload: {
        search:value
      }
    })
  }
  render() {
    const { userList , search ,defaultValue } = this.props.admin;
    return (
      <React.Fragment>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <div className={styles.listTitle}>人员管理</div>
            <div>
              <Input.Search placeholder='根据用户名或电话或邮箱检索'
                              size='large'
                              onSearch={this.onSearch.bind(this)}
                              style={{width: 540}}
                              onKeyUp={(e)=>this.onSearch(e.target.value)}
                              defaultValue={defaultValue}
                />
            </div>
          </div>
          <List list={userList} columns={user.columns} type='userList' search={search}/>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(({admin}) => ({admin}))(People));
