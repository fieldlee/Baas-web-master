import React, {Component} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import NavLink from 'umi/navlink';
import {Row, Col, Popconfirm} from 'antd'
import styles from './index.less'

const status = {
  PROJECT_STATUS_MEANS: {
    saved: '项目审核中',
    resaved: '项目审核完成',
    deployed: '项目部署完成',
    channeled: '通道已生成',
    chaincodeed: '智能合约已安装'
  }
};

class List extends Component {
  onRemoveProject(id) {
    this.props.dispatch({
      type: 'project/removeProject',
      payload: {
        id,
        cb: () => {
          this.props.dispatch({
            type: 'panel/projectList'
          })
        }
      }
    });
  }

  render() {
    return (
      <Row gutter={18} className={styles.itemWrap}>
        <Col lg={8} xxl={6}>
          <a className={`${styles.item} ${styles.first}`}
             href='/project/add'>
            <img src={require('../../../../assets/images/create.png')}/>
            <div className={styles.itemAdd}>+ 创建项目</div>
          </a>
        </Col>
        {
          this.props.list.map((item, index) => {
            return (
              <Col lg={8} xxl={6} key={index}>
                <div className={styles.item}>
                  <div className={styles.itemContent}>
                    <img
                      src={require('../../../../assets/images/project-name.png')}
                      className={styles.itemImg}/>
                    <div className={styles.itemDetail}>
                      <div className={styles.title}>
                        <div className={styles.name}>{item.projectName}</div>
                        <div
                          className={styles.status}>{status.PROJECT_STATUS_MEANS[item.status]}</div>
                      </div>
                      <div className={styles.info}>
                        <div className={styles.url}>项目域名：{item.domain}</div>
                        <div className={styles.time}>创建时间：{moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className={styles.people}>创建人：{item.manager}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.itemOpeation}>
                    <Popconfirm placement="top" title='确认删除该项目吗？'
                                onConfirm={this.onRemoveProject.bind(this, item.id)}
                                okText="确认"
                                cancelText="取消">
                      <a className={styles.itemDel}>删除</a>
                    </Popconfirm>
                    <NavLink className={styles.itemEnter}
                       to={`/project/info/${item.id}`}>进入项目</NavLink>
                  </div>
                </div>
              </Col>
            )
          })
        }
      </Row>
    )
  }

}

export default connect(({menu, project, panel}) => ({
  menu,
  project,
  panel
}))(List);
