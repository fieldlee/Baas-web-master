import React from 'react';
import {Layout} from 'antd';
import ProjectMenu from './projectMenu';
import AdminMenu from './adminMenu';
import {Logo} from '../../components/logo';
import styles from './sider.less';

export class Sider extends React.Component {
  render() {
    const isAdminPage = /(?:\/admin)/.test(window.location.pathname);
    return (
      <Layout.Sider className={styles.projectSider}>
        <Logo width={65} height={36}/>
        {
          isAdminPage ?
            <AdminMenu/>
            :
            <ProjectMenu/>
        }
      </Layout.Sider>
    )
  }
}
