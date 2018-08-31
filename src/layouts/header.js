import React from 'react';
import {Dropdown} from 'antd';
import auth from '../utils/auth';
import logo from '../assets/images/logo.svg';
import styles from './header.less';

const getItemMenu = (list) => {
  return (
    <div className={styles.subNav}>
      {
        list.map((item, index) => {
          return (
            <a key={index} className={styles.navLink} href=''>{item.name}</a>
          )
        })
      }
    </div>
  );
};


export default class Header extends React.Component {
  onSignOut(e) {
    e.preventDefault();
    auth.signOut();
  }
  render() {
    const user = auth.getUser();
    const {menu} = this.props;
    return (
      <div id='header' className={styles.header}>
        <a className={styles.logo} href='/'>
          <img src={logo} width='52' height='29' alt=''/>
        </a>
        <nav className={styles.globalNav}>
          {
            menu.menuList.map((item) => {
              return (
                <Dropdown overlay={getItemMenu(item.subMenuList)}
                          key={item.id}
                          getPopupContainer={() => {
                            return document.querySelector('#header')
                          }}>
                  <a className={styles.navLink} href=''>{item.name}</a>
                </Dropdown>
              );
            })
          }
        </nav>
        {
          user ?
            <div className={styles.right}>
              <span className={styles.userInfo}>{user.username}</span>
              <a className='ant-btn ant-btn-background-ghost'
                 onClick={this.onSignOut.bind(this)}>退出</a>
            </div>
            :
            <div className={styles.right}>
              <a className='ant-btn ant-btn-background-ghost'
                 href='/account/register'>注册</a>
              <a className='ant-btn ant-btn-background-ghost'
                 href='/login'>登录</a>
            </div>
        }
      </div>
    );
  }
}
