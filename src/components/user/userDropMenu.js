import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';
import auth from '../../utils/auth';
import styles from './userDropMenu.less';

class UserDropMenu extends React.Component {
  state = {
    isOpen: false
  };

  onSignOut() {
    const {redirectUrl} = this.props;
    auth.signOut(redirectUrl ? redirectUrl : false);
  };

  onUserCenter() {
    router.push({
      pathname: '/center'
    });
    this.props.dispatch({
      type: 'account/getUser'
    });
  }

  handleDropMenu(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  closeDropMenu() {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
  }

  componentDidMount() {
    window.addEventListener('click', () => {
      this.closeDropMenu();
    }, false);
  }

  render() {
    const user = auth.getUser();
    const {themeClassName} = this.props;
    if (user) {
      return (
        <ul
          className={`${styles.dropMenu} ${this.state.isOpen ? styles.dropMenuOpen : ''} ${themeClassName ? styles[themeClassName] : ''}`}>
          <li className={styles.dropMenuItem}
              onClick={this.handleDropMenu.bind(this)}>
            <div className={styles.dropMenuTitle}>{user.username}<Icon type='caret-down' className={styles.dropMenuArrow}/></div>
            <ul className={styles.dropSubMenu}>
              <li className={styles.dropMenuItem}
                  onClick={this.onUserCenter.bind(this)}>用户中心
              </li>
              <li className={styles.dropMenuItem}
                  onClick={this.onSignOut.bind(this)}>退出
              </li>
            </ul>
          </li>
        </ul>
      );
    }
    return null;
  }
}

export default connect(({account}) => ({account}))(UserDropMenu);
