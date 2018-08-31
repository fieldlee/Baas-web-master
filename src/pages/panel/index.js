import React, {Component} from 'react';
import {connect} from 'dva';
import Creation from './components/creation';
import List from './components/list';


class Panel extends Component {
  render() {

    /*  const { projectList } = this.props.panel;
     const length = projectList.length;
     console.log(length)
     return(
       <div>{ length!=0 ? <List list={projectList}/> : <Creation/> } </div>
     )*/
    const {projectList} = this.props.panel;
    if (projectList) {
      return (
        <React.Fragment>
          {projectList.length != 0 ? <List list={projectList}/> : <Creation/>}
        </React.Fragment>
      )
    }
    return null;
  }
}

export default connect(({panel}) => ({panel}))(Panel);
