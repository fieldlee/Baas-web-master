import React from 'react';
import styles from './timeCounter.less';

export class TimerCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: this.props.limit
    };
  }
  componentDidMount() {
    this.log();
  }
  log() {
    let timer = null;
    const update = () => {
      this.setState((prevState) => {
        const limit = prevState.limit - 1;
        if (limit === 1) {
          clearTimeout(timer);
          this.props.onEnd();
        } else {
          timer = setTimeout(update, 1000);
        }
        return {
          limit
        }
      });
    };
    update();
  }
  render() {
    return (
      <div className={styles.timerCountContainer}>{this.state.limit}s</div>
    );
  }
}