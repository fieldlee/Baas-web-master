import React from 'react';
import {connect} from 'dva';
import { Spin } from 'antd';
import styles from './index.less';
import List from './list';
import Circle from '../../components/canvas';
import Topology from '../../components/topology';
import { Row, Col } from 'antd';


class MaintainDetail extends React.Component{
	componentDidMount(){
    this.props.dispatch({
      type:'project/getProjectDetail',
      payload:{id:this.props.match.params.id}
    });
		this.props.dispatch({
			type:'maintainDetail/projectservers',
			payload:{id:this.props.match.params.id}
		});
		this.props.dispatch({
			type:'maintainDetail/topology',
			payload:{id:this.props.match.params.id}
		})
	}
	handleMouseOver(index){
		this.props.dispatch({
			type:'maintainDetail/hover',
			payload:{index:index}
		})
		
	}
	handleClick(index,ip){
		this.props.dispatch({
			type:'maintainDetail/serverinfo',
			payload:{ip:ip,index:index,id:this.props.match.params.id}
		})
	}
	render(){
		const {list,currentIndex,serviceChild,name,orders,peers} = this.props.maintainDetail;

		return(
			<div className={styles.wrap}>
				<div className={styles.topology}>
					<Topology orders={orders} peers={peers}/>
				</div>
				<Row gutter={16}> 
					{
						list.map((item,index)=>{	
							return(
								<Col lg={12}>
									<div className={currentIndex==index?`${styles.item} ${styles.active}`:`${styles.item}`} key={index}  onClick={this.handleClick.bind(this,index,item.ip)}>
										<div className={styles.left}>
											<div className={styles.ipAdd}>IP:{item.ip}</div>
											<div className={styles.serviceChild}>
												<div className={styles.serviceImg}>
													<img src={currentIndex==index?require('../../assets/images/order_active.svg'):require('../../assets/images/order.svg')} className={styles.img}/>
													<div className={styles.num}>{item.num}</div>
													<div className={styles.title}>子服务器</div>
												</div>
												
												<img src={require('../../assets/images/stroke.svg')} className={styles.img1}/>										
												
												<div className={styles.serviceName}>
													{
														item.list.map((item,index)=>{
															return(
																<div key={index}>{item}</div>
															)
														})
													}
												</div>
											</div>
										</div>
										<div className={styles.right}>									
											<Circle lineWidth='15' name1={`canvas1_${index}1`} name2={`canvas1_${index}2`} strokeStyle1='#F2F2F2' strokeStyle2='#01A4FF' percent={item.cpu} width='105' title='cpu'/>
											<Circle lineWidth='15' name1={`canvas2_${index}1`} name2={`canvas2_${index}2`} strokeStyle1='#F2F2F2' strokeStyle2='#F7931E' percent={item.mem} width='105' title='内存'/>
										</div>
									</div>
								</Col>
							)
						})
					}
				</Row>
				<List list={serviceChild} id={this.props.match.params.id}/>
				
				{
					this.props.maintainDetail.loading&&(
						<div className={styles.loading}>
							<Spin size="large" className={styles.loadingSpin}/>
						</div>
					)
				}
			</div>
		)
	}
}
export default connect(({maintainDetail})=>({maintainDetail}))(MaintainDetail)