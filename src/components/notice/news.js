import React from 'react';
import styles from './news.less';

export class NewsNotice extends React.Component {
  render() {
    return (
      <div className={styles.noticeContainer}>
        <div className='container'>
          <div className={styles.content}>
            <span className={styles.noticeType}>新闻</span>
            <p>链佰区块链服务（Blockchain as a
              Service，BaaS），构建于开放的区块链服务集群，让用户在弹性、开放的服务器集群上能够快速构建自己的 IT
              基础设施和区块链服务…</p>
          </div>
        </div>
      </div>
    );
  }
}