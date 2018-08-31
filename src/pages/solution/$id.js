import React , {Component} from 'react';
import styles from './index.less';
import { Layout , Menu , Icon} from 'antd';
import { Link,withRouter } from 'dva/router';

import Medical from './components/medical';
import Data from './components/data';
import Integral from './components/integral';
import Insurance from './components/insurance';
const { Content , Sider } = Layout;
class SolutionDetail extends Component{
  render(){
    const { pathname } = this.props.location;

    return(
      <React.Fragment>
        <div className={styles.bannerWrap}>
          <div className={`${styles.container} ${styles.banner}`}>
            <div className={styles.left}>
              <div className={styles.bannerTitle}>链佰区块链服务BaaS</div>
              <div className={styles.bannerDetail}>链佰区块链为各行业定制区块链解决方案，聚焦客户痛点<br/>为行业客户提供新价值</div>
              <Link to='/panel' className={styles.exper}>立即体验</Link>
            </div>
            <img src={require('../../assets/images/solution-banner.png')} className={styles.bannerImg}/>
          </div>
        </div>
        <div className={styles.solutionMenu}>
          <div className={styles.container}>
            <Link className={pathname=='/solution/medical'?`${styles.solutionMenuItem} ${styles.active}`:`${styles.solutionMenuItem}`} to='/solution/medical'>医疗解决方案</Link>
            <Link className={pathname=='/solution/data'?`${styles.solutionMenuItem} ${styles.active}`:`${styles.solutionMenuItem}`} to='/solution/data'>数据存证解决方案</Link>
            <Link className={pathname=='/solution/integral'?`${styles.solutionMenuItem} ${styles.active}`:`${styles.solutionMenuItem}`} to='/solution/integral'>积分解决方案</Link>
            <Link className={pathname=='/solution/insurance'?`${styles.solutionMenuItem} ${styles.active}`:`${styles.solutionMenuItem}`} to='/solution/insurance'>保险解决方案</Link>
          </div>
        </div>
        <div id='2'></div>
        <div className={styles.solutionContent}>
          <div className={styles.container}>
            {(()=>{
                switch(pathname){
                  case '/solution/medical':return <Medical/>;
                  case '/solution/data':return <Data/>;
                  case '/solution/integral':return <Integral/>;
                  case '/solution/insurance':return <Insurance/>;
                }
              })()}
          </div>
        </div>
        {/*<div className={styles.container}>
          <Layout className={styles.layout}>
            <Sider width={213} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              selectedKeys={[page]}
            >
              <Menu.Item key="/medical" >
                <img src={require('../../assets/images/solution1.png')} className={styles.menuIcon}/>
                <Link to='/solution/medical' className={styles.menuLink}>医疗解决方案</Link>
              </Menu.Item>
              <Menu.Item key="/data">
                <img src={require('../../assets/images/solution2.png')} className={styles.menuIcon}/>
                <Link to='/solution/data' className={styles.menuLink}>数据存证解决方案</Link>
              </Menu.Item>
              <Menu.Item key="/integral">
                <img src={require('../../assets/images/solution3.png')} className={styles.menuIcon}/>
                <Link to='/solution/integral' className={styles.menuLink}>积分解决方案</Link>
              </Menu.Item>
              <Menu.Item key="/insurance">
                <img src={require('../../assets/images/solution4.png')} className={styles.menuIcon}/>
                <Link to='/solution/insurance' className={styles.menuLink}>保险解决方案</Link>
              </Menu.Item>
            </Menu>
            </Sider>
            <Content style={{ padding: '10px 6px'}}>
             {(()=>{
                switch(page){
                  case '/medical':return <Medical/>;
                  case '/data':return <Data/>;
                  case '/integral':return <Integral/>;
                  case '/insurance':return <Insurance/>;
                }
              })()}
            </Content>
          </Layout>
        </div>*/}
      </React.Fragment>
    )
  }
}
export default withRouter(SolutionDetail);