import React from 'react';
import {Button} from 'antd';
import styles from './counter.less'

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || 0
    };
  }

  increment() {
    const {maxValue, onIncrement} = this.props;
    this.setState(prevState => ({
      value: prevState.value === maxValue
        ? prevState.value
        : prevState.value + 1
    }), () => {
      onIncrement(this.state.value);
    });
  }

  decrement() {
    const {minValue, onDecrement} = this.props;
    this.setState(prevState => ({
      value: prevState.value === (minValue || 0)
        ? prevState.value
        : prevState.value - 1
    }), () => {
      onDecrement(this.state.value);
    });
  }

  render() {
    const {disabled} = this.props;
    return (
      <div className={styles.counter}>
        <Button.Group>
          <Button disabled={disabled || this.state.value === this.props.minValue}
                  onClick={this.decrement.bind(this)}
                  icon='minus'/>
          <Button disabled={disabled}>{this.state.value}</Button>
          <Button disabled={disabled || this.state.value === this.props.maxValue}
                  onClick={this.increment.bind(this)} icon='plus'/>
        </Button.Group>
      </div>
    );
  }
}
