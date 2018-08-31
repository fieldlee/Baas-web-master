import React from "react";
import { Table } from "antd";
import styles from "./index.less";
import { connect } from "dva";

class List extends React.Component {
  handleTableChange(pagination) {
    this.props.dispatch({
      type: "admin/handleTableChange",
      payload: {
        type: this.props.type,
        search: this.props.search,
        ...pagination
      }
    });
  }

  render() {
    const { pagination } = this.props.admin;
    const { list, columns, type } = this.props;
    return (
      <Table className={styles.list}
             dataSource={list}
             columns={columns}
             rowKey={record => record.id}
             pagination={type == "projectList" ? true : pagination}
             onChange={this.handleTableChange.bind(this)}
      />
    );
  }
}

export default connect(({ admin }) => ({ admin }))(List);
