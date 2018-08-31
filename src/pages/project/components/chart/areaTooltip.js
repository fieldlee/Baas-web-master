import React from 'react';
import styles from './areaTooltip.less';

export class AreaTooltip extends React.Component {
  render() {
    const {active} = this.props;
    if (active) {
      const {payload} = this.props;
      return (
        <div className={styles.areaTooltip}>{payload[0].value}</div>
      );
    }
    return null;
  }
}
