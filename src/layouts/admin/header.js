import React from 'react';
import {connect} from 'dva';
import {Layout} from 'antd';
import NavLink from 'umi/navlink';
import UserDropMenu from '../../components/user/userDropMenu';
import {Logo} from '../../components/logo';
import styles from './header.less';

const MenuItem = (props) => {
  const pathname = window.location.pathname;
  const {item} = props;
  const {test} = item;
  const isCurrent = test && test.test(pathname);
  const route = String(item.route);
  return <NavLink
    className={`${styles.navLink} ${isCurrent ? styles.navLinkActive : ''}`}
    to={route}>{item.name}</NavLink>;
};

class Header extends React.Component {
  render() {
    const {isBrand, menu, theme, project, isProjectPage} = this.props;
    return (
      <Layout.Header
        className={`${styles.header} ${theme === 'dark' ? styles.headerDark : ''}`}>
        {
          isBrand ?
            <Logo width={65} height={36}/>
            :
            null
        }
        <nav className={styles.nav}>
          {
            menu.menuList.map((item, index) => {
              return <MenuItem item={item} key={index}/>
            })
          }
        </nav>
        <div className={styles.right}>
          {
            isProjectPage && project.projectName ?
              <React.Fragment>
                <span className={styles.name}>{project.projectName}</span>
                <span className={styles.sep}>|</span>
              </React.Fragment>
              :
              null
          }
          <UserDropMenu themeClassName={theme === 'dark' ? 'dropMenuDark' : 'dropMenuWhite'}/>
        </div>
      </Layout.Header>
    );
  }
}

export default connect(({menu, project}) => ({menu, project}))(Header);
