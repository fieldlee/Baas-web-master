import React, { Component } from 'react';
import styles from '../index.less';

export default class SliderArrows extends Component {
  constructor(props) {
    super(props);
  }

  handleArrowClick(option) {
    this.props.turn(option);
  }

  render() {
    return (
      <div className={styles.sliderArrowsWrap}>
        <img src={require('../../../assets/images/left.png')} className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`} onClick={this.handleArrowClick.bind(this, -1)}/>
        <img src={require('../../../assets/images/right.png')} className={`${styles.sliderArrow} ${styles.sliderArrowRight}`} onClick={this.handleArrowClick.bind(this, 1)}/>
        {/*<span
          className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
          onClick={this.handleArrowClick.bind(this, -1)}>
          &lt;
        </span>
        <span
          className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
          onClick={this.handleArrowClick.bind(this, 1)}>
          &gt;
        </span>*/}
      </div>
    );
  }
}
