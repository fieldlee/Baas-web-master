import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Menu} from 'antd';
import styles from './projectMenu.less'

class ProjectMenu extends React.Component {
  onMenuSelect(menu, item) {
    router.push({
      pathname: menu[Number(item.key) - 1].route
    });
    this.props.dispatch({
      type: 'menu/updateProjectMenu'
    });
  };

  render() {
    const {projectMenu} = this.props.menu;
    const {status} = this.props.project;
    const selectedKeys = [];
    projectMenu.filter((item) => {
      if (item.test.test(window.location.pathname)) {
        selectedKeys.push(item.id);
      }
    });
    return (
      <Menu className={styles.projectMenu}
            theme='dark'
            selectedKeys={selectedKeys}
            onClick={this.onMenuSelect.bind(this, projectMenu)}
      >
        {
          projectMenu.map((item, index) => {
            const isDisabled = item.isDisable || index > 1 && /saved|resaved|unknow/.test(status);
            return <Menu.Item disabled={isDisabled} key={item.id}><i
              className={item.iconClassName}/>{item.name}</Menu.Item>;
          })
        }
      </Menu>
    );
  }
}

export default connect(({menu, project}) => ({menu, project}))(ProjectMenu);
