import React, { Component } from 'react';

import styles from './index.less';

import SliderItem from './SliderItem/SliderItem';
import SliderDots from './SliderDots/SliderDots';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 0,
    };
  }

  // 向前向后多少
  turn(n) {
    var _n = this.state.nowLocal + n;
    if(_n < 0) {
      _n = _n + this.props.items.length;
    }
    if(_n >= this.props.items.length) {
      _n = _n - this.props.items.length;
    }
    this.setState({nowLocal: _n});
  }

  // 开始自动轮播
  goPlay() {
    if(this.props.autoplay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1);
      }, this.props.delay * 1000);
    }
  }

  // 暂停自动轮播
  pausePlay() {
    clearInterval(this.autoPlayFlag);
  }

  componentDidMount() {
    this.goPlay();
  }

  render() {
    let count = this.props.items.length;

    let itemNodes = this.props.items.map((item, idx) => {
      return <SliderItem item={item} count={count} key={'item' + idx} />;
    });

   /* let arrowsNode = <SliderArrows turn={this.turn.bind(this)}/>;*/

    let dotsNode = <SliderDots turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

    return (
      <div className={styles.slider}>
        <div
          className={`${styles.slider} ${styles.slider1}`}
          onMouseOver={this.props.pause?this.pausePlay.bind(this):null} onMouseOut={this.props.pause?this.goPlay.bind(this):null}>
            <ul style={{
                left: -100 * this.state.nowLocal + "%",
                transitionDuration: this.props.speed + "s",
                width: this.props.items.length * 100 + "%"
              }}>
                {itemNodes}
            </ul>
          
            {this.props.dots?dotsNode:null}
        </div>
        {this.props.arrows?
          <div className={styles.sliderArrowsWrap}>
            <img src={require('../../assets/images/left.png')} 
              className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`} 
              onClick={this.turn.bind(this, -1)}
              onMouseOver={this.props.pause?this.pausePlay.bind(this):null} 
              onMouseOut={this.props.pause?this.goPlay.bind(this):null}
              />
            <img src={require('../../assets/images/right.png')} 
              className={`${styles.sliderArrow} ${styles.sliderArrowRight}`} 
              onClick={this.turn.bind(this, 1)}
              onMouseOver={this.props.pause?this.pausePlay.bind(this):null} 
              onMouseOut={this.props.pause?this.goPlay.bind(this):null}
            />
          </div>

          :null}
      </div>
      );
  }
}

Slider.defaultProps = {
  speed: 1,
  delay: 2,
  pause: true,
  autoplay: true,
  dots: true,
  arrows: true,
  items: [],
};
Slider.autoPlayFlag = null;
