import React from 'react';
import {Carousel} from 'antd';
import styles from './bannerSlider.less';

export class BannerSlider extends React.Component {
  createBanner(banner) {

  }

  render() {
    return (
      <Carousel>
        {
          this.props.list.map((banner, index) => {
            const {title, content, imageUrl, button} = banner;
            return (
              <div className={styles.container}
                   style={{backgroundImage: imageUrl}} key={index}>
                <div className='container'>
                  <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.summary}>{content}</p>
                    <a className='ant-btn ant-btn-background-ghost'
                       href={button.href}>{button.text}</a>
                  </div>
                </div>
              </div>
            )
          })
        }
      </Carousel>
    );
  }
}
