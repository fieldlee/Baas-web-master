import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Menu} from 'antd';
import styles from './adminMenu.less'

class AdminMenu extends React.Component {
  onMenuSelect(menu, item) {
    try {
      router.push({
        pathname: menu[item.keyPath[1]].subMenu[Number(item.key)].route
      });
      this.props.dispatch({
        type: 'menu/updateAdminMenu'
      });
    } catch (e) {
    }
  };

  onMenuChange(menu, keys) {
    if (!keys.length) {
      return;
    }
    router.push({
      pathname: menu[keys[1]].route
    });
    this.props.dispatch({
      type: 'menu/updateAdminMenu'
    });
  }

  render() {
    const {adminMenu} = this.props.menu;
    const openKeys = [];
    const selectedKeys = [];
    const pathname = window.location.pathname;

    const isSubMatch = (menu) => {
      let isMatch = false;
      menu && menu.map((item) => {
        if (item.test.test(pathname)) {
          isMatch = true;
          selectedKeys.push(item.id);
        }
      });
      return isMatch;
    };

    adminMenu.filter((item) => {
      if (isSubMatch(item.subMenu) || item.test.test(pathname)) {
        openKeys.push(item.id);
      }
    });

    return (
      <Menu className={styles.adminMenu}
            mode='inline'
            theme='dark'
            forceSubMenuRender={true}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onClick={this.onMenuSelect.bind(this, adminMenu)}
            onOpenChange={this.onMenuChange.bind(this, adminMenu)}
      >
        {
          adminMenu.map((item) => {
            return <Menu.SubMenu key={item.id} title={item.name}>
              {
                item.subMenu && item.subMenu.map((subItem) => {
                  return <Menu.Item key={subItem.id}><span
                    className={styles.adminMenuCircle}/>{subItem.name}
                  </Menu.Item>
                })
              }
            </Menu.SubMenu>;
          })
        }
      </Menu>
    );
  }
}

export default connect(({menu}) => ({menu}))(AdminMenu);
