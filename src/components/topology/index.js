import React from 'react';
import {connect} from 'dva';
import styles from './index.less'
class Topology extends React.Component{
	render(){
		const { orders, peers } = this.props;
		
		return(
			<div className={styles.topoWrap}>
				<div className={styles.top}>
					{
						orders.map((item,index)=>{
							return(
								<div className={styles.topItem} key={index}>
									<div className={styles.topHr}>
										<div className={`${styles.title} ${styles.topTitle}`}>{item}</div>
										<img src={require('../../assets/images/1.svg')} className={styles.img1}/>
									</div>
									<img src={require('../../assets/images/3.svg')} className={`${styles.img3} ${styles.topImg}`}/>
								</div>
							)
						})
					}
				</div>
				<div className={styles.bottom} id='bottom' >
					{
						peers.map((item,index)=>{
							return(
								<div className={styles.bottomItem} key={index}>
									<div className={styles.bottomSpan}>
										<img src={require('../../assets/images/4.svg')} className={styles.img4}/>
										<img src={require('../../assets/images/2.svg')} className={styles.img2}/>
										<div className={`${styles.title} ${styles.bottomTitle}`}>{item}</div>
									</div>
									<img src={require('../../assets/images/3.svg')} className={`${styles.img3} ${styles.bottomImg}`}/>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}
export default connect()(Topology)	