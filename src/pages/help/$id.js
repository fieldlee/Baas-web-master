import React , {Component} from 'react';
import styles from './index.less';
import { Layout , Menu , Icon} from 'antd';
import { Link,withRouter } from 'dva/router';

import Question from './components/question';
import Api from './components/api';
import Course from './components/course';
import Command from './components/command';
const { SubMenu } = Menu;
const { Content , Sider } = Layout; 
class Detial extends Component{
  constructor(props){
    super(props); 
    this.state = {
      showScroll:0
    };
  }
  goTop(){
    var scrollToptimer = setInterval(function () {
      var top = document.body.scrollTop || document.documentElement.scrollTop;
      var speed = top / 4;
      if (document.body.scrollTop!=0) {
          document.body.scrollTop -= speed;
      }else {
          document.documentElement.scrollTop -= speed;
      }
      if (top == 0) {
          clearInterval(scrollToptimer);
      }
    }, 30); 
  }
 
   componentDidMount() {
      window.addEventListener('scroll', ()=>{
        var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
        if(scrollTop>450){
          this.setState({
            showScroll:1
          })
        }
        else{
          this.setState({
            showScroll:0
          })
        }
      });
  }
    
    



  render(){
    const { pathname } = this.props.location;
    let name = pathname.substr(pathname.indexOf('/',pathname.indexOf('/')+1),pathname.length);
    let page = name?name:pathname;
    return(
      <div className={styles.container}>
        <Layout className={styles.layout}>
          <Sider width={213} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            selectedKeys={[page]}
          >
            <Menu.Item key="/course" >
              <img src={require('../../assets/images/course-icon.png')} className={styles.menuIcon}/>
              <Link to='/help/course' className={styles.menuLink}>教程</Link>
            </Menu.Item>
            
            <SubMenu key="sub1" title={<span><img src={require('../../assets/images/doc-icon.png')} className={styles.menuIcon}/>开发者文档</span>}>
              <Menu.Item key="/api"><Link to='/help/api' className={styles.menuLink}><span className={styles.circle}></span>API</Link></Menu.Item>
              <Menu.Item key="/command"><Link to='/help/command' className={styles.menuLink}><span className={styles.circle}></span>命令行帮助</Link></Menu.Item>
            </SubMenu> 
            <Menu.Item key="/question">
              <img src={require('../../assets/images/question-icon.png')} className={styles.menuIcon}/>
              <Link to='/help/question' className={styles.menuLink}>常见问题</Link>
            </Menu.Item>
          </Menu>
          </Sider>
          <Content style={{ padding: '10px 6px'}}>
            {(()=>{
              switch(page){
                case '/api':return <Api/>;
                case '/question':return <Question/>;
                case '/course':return <Course/>;
                case '/command':return <Command/>;
              }
            })()}
            {
              this.state.showScroll ?
              <div className={styles.goTop} onClick={this.goTop.bind(this)}>
                <img src={require('../../assets/images/narrow.png')}/>
                <div>返回顶部</div>
              </div>
              :
              ''
            }
            
          </Content>

        </Layout>

      </div>
    )
  }
}
export default withRouter(Detial);