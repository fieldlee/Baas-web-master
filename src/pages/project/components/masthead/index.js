import React from 'react';
import styles from './masthead.less';

export class Masthead extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <div className={styles.masthead}>
        <div className='container'>
          <h2 className={styles.mastheadTitle}>{title}</h2>
        </div>
      </div>
    );
  }
}