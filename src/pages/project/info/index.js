import React from 'react';
import {connect} from 'dva';
import ProjectInfo from './info';

class Project extends React.Component {
  render() {
    return <ProjectInfo/>;
  }
}

export default connect(project => project)(Project);
