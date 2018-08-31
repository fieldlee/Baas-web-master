import React from 'react';
import {Table} from 'antd';
import styles from './list.less';

export class List extends React.Component {
  render() {
    const {list, columns, pagination} = this.props;
    return (
        <Table className={styles.list}
               dataSource={list}
               columns={columns}
               pagination={!pagination ? pagination : true}/>
    );
  }
}
