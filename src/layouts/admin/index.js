import React from 'react';
import {Layout} from 'antd';
import Header from './header';
import {Sider} from './sider';
import styles from './index.less';

export class AdminPage extends React.Component {
  render() {
    const {children, isProjectPage} = this.props;
    return (
      <Layout>
        <Sider/>
        <Layout className={styles.projectContainer}>
          <Header isProjectPage={isProjectPage}/>
          <Layout.Content>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
