import React from 'react';
import {Icon} from 'antd';
import Draggable from 'react-draggable';
import './dragValidator.less';

export class DragValidator extends React.Component {
  state = {
    position: {x: 0, y: 0},
    isOk: false
  };

  handleStart(e) {
    this.pageX = e.pageX;
  }

  handleStop(e) {
    if ((e.pageX - this.pageX) > (this.props.maxWidth || 420)) {
      this.setState({
        isOk: true,
        position: {}
      });
      this.props.onSuccess();
    } else {
      this.setState({
        position: {
          x: 0,
          y: 0
        }
      });
    }
  }

  render() {
    const {isOk, position} = this.state;
    const {width} = this.props;
    return (
      <div className={`dragContainer${isOk ? ' dragSuccess' : ''}`} style={{width}}>
        {
          isOk ?
            <span>验证通过</span>
            :
            <span>请按住滑块，拖动到最右边</span>
        }
        <Draggable
          axis='x'
          handle='.drag'
          position={position}
          bounds='parent'
          disabled={isOk}
          onStart={this.handleStart.bind(this)}
          onStop={this.handleStop.bind(this)}>
          <div className='drag'>
            {
              isOk ?
                <Icon type="check-circle"/>
                :
                <Icon type="double-right"/>
            }
          </div>
        </Draggable>
      </div>
    )
  }
}