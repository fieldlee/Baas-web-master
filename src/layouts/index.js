import React from 'react';
import {connect} from 'dva';
import {withRouter} from 'dva/router';
import {Layout} from 'antd';
import {AdminPage} from './admin';
import Header from './admin/header';
import IndexHeader from './indexHeader';
import IndexFooter from './indexFooter';
import '../assets/less/base/base.less';



class App extends React.Component {
  componentDidUpdate(prevProps) {
    const prevName = prevProps.location.pathname;
    const prevPath = prevName.substr(0,prevName.indexOf('/',prevName.indexOf('/')+1));

    const currentName = this.props.location.pathname;
    const currentPath = currentName.substr(0,currentName.indexOf('/',currentName.indexOf('/')+1));
   
    if(prevPath!='/solution'||currentPath!='/solution') {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const pathname = window.location.pathname
    const isProjectPage = /(?:\/project)|(?:\/admin)|(?:\/maintain)/.test(pathname);
    let home = pathname.substr(0,pathname.indexOf('/',pathname.indexOf('/')+1));
    if(pathname=='/'||home=='/help'||home=='/solution'||pathname=='/feedback'){
      return <React.Fragment><IndexHeader/>{this.props.children}<IndexFooter/></React.Fragment>
    }
    return isProjectPage ?
      <AdminPage {...this.props} isProjectPage={isProjectPage}/>
      :
      <Layout>
        <Header isBrand={true} menu={this.props.menu.menuList} theme={'dark'}/>
        <Layout.Content>
          {this.props.children}
        </Layout.Content>
      </Layout>
  }
}

export default withRouter(connect(({menu,}) => ({menu}))(App));
