import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';

import List from '../components/list';
import styles from '../index.less';

const project = {
  columns: [
    {
      title: '项目名',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '18%',
      render: (text, record) => {
        return <Link to={`/project/info/${record.id}`}>{text}</Link>
      }
    },
    {
      title: '创建人',
      dataIndex: 'manager',
      key: 'manager',
      width: '18%',
     
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '18%',
      render: (text) => {
        return text == 0 ? 0 : moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      key: 'status',
      width: '18%',
      render: type => project.PROJECT_STATUS_MEANS[type]
    },
    
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      className: 'pr-0 u-text-right',
      render: (text, record) => {
        return (
          <Link
            className='w80 ant-btn ant-btn-background-ghost-blue btn-blue'
            to={`/project/info/${record.id}`}>打开</Link>
        
            
        );
      }
    }
  ],
  PROJECT_STATUS_MEANS: {
    saved: '项目审核中',
    resaved: '项目审核完成',
    deployed: '项目部署完成',
    channeled: '通道已生成',
    chaincodeed: '智能合约已安装'
  }
};


class Admin extends React.Component {
  /*onSearch(value) {
    if (value !== '') {
      this.props.dispatch({
        type: 'admin/maintainList',
        payload: {
          search:value
        }
      })
    }
    else{
      this.props.dispatch({
        type: 'admin/maintainList',
        payload: {
          search:this.props.match.params.id
        }
      })
    }
  }*/
  componentDidMount(){
    this.props.dispatch({
      type:'admin/maintainList',
      payload:{user:this.props.match.params.id}
    });
   
  }
  render() {
    // const {banner, system} = this.props;
    const { maintainList } = this.props.admin;
    return (
      <React.Fragment>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <Link style={{color:'#01A4FF ',fontSize:'18px'}} to='/admin/user'>&lt; 返回</Link>
            <div>
              {/*<Input.Search placeholder='根据项目名或创建人进行检索'
                              size='large'
                              onSearch={this.onSearch.bind(this)}
                              onKeyUp={(e)=>this.onSearch(e.target.value)}
                              style={{width: 540}}
                />*/}
            </div>
          </div>
          <List list={maintainList} columns={project.columns} type='maintainList'/>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({admin}) => ({admin}))(Admin);
