import React, { Component } from "react";
import { Link } from "dva/router";
import auth from "../utils/auth";
import UserDropMenu from "../components/user/userDropMenu";
import styles from "./indexHeader.less";

class IndexHeader extends Component {
  render() {
    const user = auth.getUser();
    const pathname = window.location.pathname;
    let home = pathname.substr(0, pathname.indexOf("/", pathname.indexOf("/") + 1));
    return (
      <React.Fragment>
        <div className={styles.headerWrap}>
          <div className={`${styles.container} ${styles.header}`}>
            <div className={styles.menuWrap}>
              <img src={require("../assets/images/logo.svg")}
                   className={styles.logo}/>
              <div className={styles.menu}>
                <div className={styles.menuItem}>
                  <Link to='/'
                        className={pathname == "/" ? `${styles.active}` : ""}>首页</Link>
                </div>
                <div className={styles.menuItem}>
                  <Link to='/solution/medical'
                        className={home == "/solution" ? `${styles.active}` : ""}>解决方案</Link>
                </div>
                {/*<div className={styles.menuItem}>*/}
                {/*<Link to='/help/course' >区块链浏览器</Link>*/}
                {/*</div>*/}
                <div className={styles.menuItem}>
                  <Link to='/help/course'
                        className={home == "/help" ? `${styles.active}` : ""}>帮助</Link>
                </div>
              </div>
            </div>
            <div className={styles.menuRight}>
              {
                user ?
                  <React.Fragment>
                    <UserDropMenu redirectUrl={"/"}/>
                    <Link to={`${user.role === "user" ? "/panel" : "/admin"}`}
                          className={styles.menuControl}>控制台</Link>
                  </React.Fragment>
                  :
                  <Link to='/login' className={styles.login}>登录/注册</Link>
              }
            </div>
          </div>
        </div>
        <div className={styles.headerFill}></div>
      </React.Fragment>
    );
  }
}

export default IndexHeader;