import React from 'react';
import styles from './wrapMessage.less';

export class WrapMessage extends React.Component {
  render() {
    const {msg, style} = this.props;
    return (
      <div className={styles.wrapMessage} style={style}>
        <p className={styles.wrapMessageContent}>{msg}</p>
      </div>
    );
  }
}
