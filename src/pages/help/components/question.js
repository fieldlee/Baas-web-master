import React,{ Component } from 'react';
import { Collapse } from 'antd';
import {connect} from 'dva';
import styles from './index.less';
const Panel = Collapse.Panel;

class Question extends Component{
  render(){
    const { questionList } = this.props.detail;
    return(
      <React.Fragment>
        <div className={styles.titleWrap}>
          <img src={require('../../../assets/images/question-active.png')} className={styles.titleIcon}/>
          <div className={styles.title}>区块链服务常见问题</div>
        </div>
        <Collapse accordion>
          {
            questionList.map((item,index)=>{
              return(
                <Panel header={`${item.title} ?`} key={index}>
                  <p className={styles.questionContent}>{item.content}</p>
                </Panel>
              )
            })
          }
         
        </Collapse>
      </React.Fragment>
    )
  }
}
export default connect( ({detail})=>({detail}) )(Question);
