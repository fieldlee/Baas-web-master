import React,{ Component } from 'react';
import {connect} from 'dva';
import styles from './index.less';

class Command extends Component{
  render(){
    return(
      <div className={styles.apiWrap}>
        <div className={styles.titleWrap}>
          <div className={styles.title}><span className={styles.titleCircle}></span>服务器版本要求Centos7 64位及以上Ubuntu16 64位及以上</div>
        </div>
        <div className={styles.apiPadding}>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>第一步：下载服务接口程序</div>
            <div className={styles.commandSub}>sudo mkdir /home/baas</div>
            <div className={styles.commandSub}>sudo git clone http://42.51.64.22/backend/install.git /home/baas</div>
          </div>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>第二步：修改文件权限</div>
            <div className={styles.commandSub}>cd /home/baas<br/>sudo chmod a+x install.sh<br/>sudo chmod a+x start.sh</div>
          </div>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>第三步：安装BaaS所需要的基础环境（根据网速不同安装速度有所不同）</div>
            <div className={styles.commandSub}>sudo sh install.sh</div>
          </div>
         
        </div>
        <div className={styles.titleWrap} style={{marginTop:'40px'}}>
          <div className={styles.title}><span className={styles.titleCircle}></span>启动BaaS服务器接口服务（以上环境检测安装完毕则可以运行程序 必须要用sudo权限启动）</div>
        </div>
        <div className={styles.apiPadding}>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>启动接口服务：</div>
            <div className={styles.commandSub}>cd /home/baas<br/>sudo ./start.sh up</div>
          </div>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>停止接口服务：</div>
            <div className={styles.commandSub}>cd /home/baas<br/>sudo ./start.sh down</div>
          </div>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>重新启动接口服务：</div>
            <div className={styles.commandSub}>cd /home/baas<br/>sudo ./start.sh restart</div>
          </div>
          <div className={styles.commandItem}>
            <div className={styles.commandTitle}>检测程序运行日志：</div>
            <div className={styles.commandSub}>tail -f /tmp/http.go</div>
          </div>
          {/*<div className={styles.commandItem}>
            <div className={styles.commandTitle}>检测程序是否运行中：</div>
            <div className={styles.commandSub}>ps -ef | grep "env/online.json" | grep "http"</div>
          </div>*/}
         
        </div>
        
      </div>
    )
  }
}
export default Command;
