import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import { Link } from 'dva/router';
import List from './components/list';
import styles from './index.less';

const project = {
  columns: [
    {
      title: '项目名',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '18%',
      render: (text, record) => {
        return <a target='_blank' href={`/project/info/${record.id}`}>{text}</a>
      }
    },
    {
      title: '申请人',
      dataIndex: 'manager',
      key: 'manager',
      width: '18%',
      render: (text, record) => {
        return <Link to={`/admin/user?${record.manager}`}>{text}</Link>
      }
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
      className: 'u-text-right',
      render: (text, record) => {
        return (
          <a target='_blank'
            className='w80 ant-btn ant-btn-background-ghost-blue btn-blue'
            href={`/project/info/${record.id}`}>打开</a>
        
            
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
 /* onSearch(value) {
    if (value !== '') {
      // 根据ID
      this.props.dispatch({
        type: 'admin/projectList',
        payload: {
          search:value
        }
      })
    }
  }*/
  render() {
    // const {banner, system} = this.props;
    const { projectList } = this.props.admin;
    return (
      <React.Fragment>
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <div className={styles.listTitle}>项目审批</div>
            {/*<div>
              <Input.Search placeholder='根据项目人和项目ID检索'
                              size='large'
                              onSearch={this.onSearch.bind(this)}
                              style={{width: 540}}
                />
            </div>*/}
          </div>
          <List list={projectList} columns={project.columns} type='projectList'/>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({admin}) => ({admin}))(Admin);
