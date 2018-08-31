import React from 'react';
import {connect} from 'dva';
import ProjectInfo from './info';

class ProjectDetailInfo extends React.Component {
  render() {
    const {match} = this.props;
    return <ProjectInfo id={match.params.id}/>;
  }
}

export default connect(project => project)(ProjectDetailInfo);
