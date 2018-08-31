import React from 'react';
import {BaseModal} from './base';
import styles from './infoIconBox.less';

export class InfoIconBox extends React.Component {
  render() {
    const {iconUrl, title, isShow, onCancel} = this.props;
    return (
      <BaseModal
        onCancel={onCancel}
        visible={isShow}
      >
        <div className={styles.infoIconBox}>
          {
            iconUrl ? <img className={styles.infoIconImage} src={iconUrl} alt=''/> : ''
          }
          <div className={styles.infoIconContent}>
            {
              title ? <div className={styles.infoIconTitle}>{title}</div> : ''
            }
            {this.props.children}
          </div>
        </div>
      </BaseModal>
    );
  }
}
