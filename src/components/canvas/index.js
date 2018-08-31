import React, { Component } from 'react';
import {connect} from 'dva';
import styles from './index.less'

class Canvas extends React.Component{
 
  componentDidMount() {
    const {lineWidth,strokeStyle1,strokeStyle2,percent,name1,name2} = this.props
    var canvas_1 = document.querySelector(`.${name1}`);
    var canvas_2 = document.querySelector(`.${name2}`);
    var ctx_1 = canvas_1.getContext('2d');
    var ctx_2 = canvas_2.getContext('2d');
    ctx_1.lineWidth = lineWidth;
    ctx_1.strokeStyle = strokeStyle1;
    //画底部的灰色圆环
    ctx_1.beginPath();
    ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2, 0, Math.PI * 2, false);
    ctx_1.closePath();
    ctx_1.stroke();
    if (percent < 0 || percent > 100) {
      throw new Error('percent must be between 0 and 100');
      return
    }
    ctx_2.lineWidth = lineWidth-1;
    ctx_2.strokeStyle = strokeStyle2;
    var angle = 0;
    var timer;
    (function draw() {
      timer = requestAnimationFrame(draw);
      ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height)
      //百分比圆环
      ctx_2.beginPath();
      ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 0, angle * Math.PI / 180, false);
      angle=angle+5;
      var percentAge = parseInt((angle / 360) * 100)
      if (angle > (percent / 100 * 360)) {
        percentAge = percent
        window.cancelAnimationFrame(timer);
      };
      ctx_2.stroke();
      ctx_2.closePath();
      ctx_2.save();
      ctx_2.beginPath();
      ctx_2.rotate(90 * Math.PI / 180)
      ctx_2.font = '22px Arial';
      ctx_2.fillStyle = strokeStyle2;
      var text = percentAge;
      if(text==100){
        ctx_2.fillText(text, 30, -42);
      }
      else if(text>10){
        ctx_2.fillText(text, 18, -42);
      }
      else{        
        ctx_2.fillText(text, 28, -42);
      }
      
      ctx_2.closePath();
      ctx_2.restore();
    })()
  }
  
  render(){
    const {width,name2,name1,title,strokeStyle2} = this.props
    return(
      <div className={styles.circle}>
        <canvas id="canvas_1" className={`canvas canvas1 ${name1}`} width={width} height={width}>
          <p>抱歉，您的浏览器不支持canvas</p>
        </canvas>
       
        <canvas id="canvas_2"  className={`canvas canvas2 ${name2}`} width={width} height={width}>
          <p>抱歉，您的浏览器不支持canvas</p>
        </canvas>
        <div className={styles.per} style={{fontSize:'12px',color:`${strokeStyle2}`}}>%</div>
        <div className={styles.title}>{title}</div>

      </div>
    )
  }
}
export default connect()(Canvas)