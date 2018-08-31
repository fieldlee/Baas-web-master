import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './index.less'
import Slider from 'react-slick';

let settings ={
    dots:false,
    infinite:true,
    speed:800,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay: true,
    arrows:true
  }


class Creation extends Component {

  render(){
   
    return(
      <div className={styles.sliderWrap}>
        <div className={styles.sliderChild}>
        <Slider {...settings} className={styles.bannerWrap}>
          <div>
            <img src={require('../../../../assets/images/slider1.png')} className={styles.creationImg}/>
            <span className={styles.title}>创建项目</span>
          </div>
          <div>
            <img src={require('../../../../assets/images/slider2.png')} className={styles.creationImg}/>
            <span className={styles.title}>创建通道</span>
          </div>
          <div>
            <img src={require('../../../../assets/images/slider3.png')} className={styles.creationImg}/>
            <span className={styles.title}>部署合约</span>
          </div>
        </Slider>
        <a className={styles.add} href='/project/info'>+ 创建项目</a>
        </div>
      </div>
  
    )
  }

}
export default Creation;
