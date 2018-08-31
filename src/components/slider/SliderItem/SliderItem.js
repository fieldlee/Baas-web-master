import React, { Component } from 'react';
import styles from '../index.less';

export default class SliderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { count, item } = this.props;
    let width = 100 / count + '%';
    return (
      <li className={styles.sliderItem} style={{width: width}}>
        <img src={item.src} alt={item.alt} />
        <span className={styles.itemSpan}>{item.span}</span>
      </li>
    );
  }
}
