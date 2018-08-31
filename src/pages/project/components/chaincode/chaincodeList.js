import React from 'react';
import {Button} from 'antd';
import {List} from '../../../../components/list';

export class ChaincodeList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '合约名称',
        dataIndex: 'ccName',
        key: 'ccName'
      },
      {
        title: '合约版本',
        dataIndex: 'ccVersion',
        key: 'ccVersion'
      },
      {
        title: '路径',
        dataIndex: 'ccGitUrl',
        key: 'ccGitUrl',
        render: (text, record) => {
          return text === '' ? record.ccPath : record.ccGitUrl
        }
      },
      {
        title: '状态',
        dataIndex: 'using',
        key: 'using',
        render: (text, record) => {
          return record.using ? '使用中' : '部署中';
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button
            disabled={!record.using}
            className='ant-btn ant-btn-background-ghost ant-btn-background-ghost-blue'
            onClick={this.props.onUpdate.bind(this, record)}>升级</Button>)
      }
    ]
  }

  render() {
    const {list, pagination, styles} = this.props;
    return (
      list ?
        <div style={styles}>
          <List list={list} columns={this.columns} pagination={pagination}/>
        </div>
        :
        null
    );
  }
}
