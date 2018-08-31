import React, {Component} from 'react';
import {Row, Col} from 'antd'
import NavLink from 'umi/navlink';
import moment from 'moment';
import styles from './index.less'

class List extends Component {
  render() {
    const {id, list, onChaincode} = this.props;
    return (
      <Row gutter={18} className={styles.itemWrap}>
        <Col lg={8}>
          <NavLink className={`${styles.item} ${styles.first}`}
                   to={`/project/chaincode/add/${id}`}>
            <img src={require('../../../../assets/images/create.png')}/>
            <div className={styles.itemAdd}>+ 创建通道</div>
          </NavLink>
        </Col>
        {
          list && list.length && list.map((item, index) => {
            return (
              <Col lg={8} key={index}>
                <div className={styles.item}>
                  <div className={styles.itemContent}>
                    <div className={styles.itemDetail}>
                      <div className={styles.title}>
                        <div className={styles.name}>{item.channelId}</div>
                      </div>
                      <div className={styles.info}>
                        <div
                          className={styles.url}>合约数：{item.chaincodes ? item.chaincodes.length : 0}</div>
                        <div className={styles.time}>创建时间：{moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                      </div>
                    </div>
                  </div>
                  <a className='ant-btn ant-btn-background-ghost ant-btn-background-ghost-blue'
                     onClick={onChaincode.bind(this, item.channelId)}>进入通道</a>
                </div>
              </Col>
            )
          })
        }

      </Row>
    )
  }
}

export default List;
