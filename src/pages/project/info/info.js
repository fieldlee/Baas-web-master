import React from 'react';
import {connect} from 'dva';
import {Row, Col} from 'antd';
import {InfoAreaChart} from '../components/chart/areaChart';
import orgImage from '../../../assets/images/project/info/org.png'
import chaincodeImage from '../../../assets/images/project/info/chaincode.png'
import channelImage from '../../../assets/images/project/info/channel.png'
import peerImage from '../../../assets/images/project/info/peer.png'
import blockImage from '../../../assets/images/project/info/block.png'
import dealImage from '../../../assets/images/project/info/deal.png'
import styles from './info.less';

const STATUS_TYPE = {
  unknow: 0,
  saved: 1,
  resaved: 2,
  deployed: 3,
  channeled: 4,
  chaincodeed: 5
};

const steps = [
  {
    name: '创建项目',
    iconClassName: 'statusAddIcon'
  },
  {
    name: '项目审核',
    iconClassName: 'statusCheckIcon'
  },
  {
    name: '项目部署',
    iconClassName: 'statusChaincodeIcon'
  },
  {
    name: '创建通道',
    iconClassName: 'statusDeployIcon'
  },
  {
    name: '部署合约',
    iconClassName: 'statusChannelIcon'
  },
  {
    name: '合约维护',
    iconClassName: 'statusMaintainIcon'
  }
];

const getProjectStatusStepList = (status) => {
  const currentStep = STATUS_TYPE[status];
  return (
    <div className={styles.steps}>
      {
        steps.map((item, index) => {
          let statusClassNames = styles.stepItem;
          if (currentStep === index) {
            statusClassNames = `${statusClassNames} ${styles.current} ${styles.fished}`;
          }
          if (currentStep > index) {
            statusClassNames = `${statusClassNames} ${styles.fished}`;
          }

          return (
            <div key={index} className={statusClassNames}>
              <div className={styles.stepIcon}>
                <i
                  className={`${styles.statusIcon} ${styles[item.iconClassName]}`}/>
              </div>
              <div className={styles.stepTitle}>{item.name}</div>
            </div>
          );
        })
      }
      <div
        className={currentStep > 4 ? `${styles.stepItem} ${styles.fished}` : styles.stepItem}/>
    </div>
  );
};

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: 'menu/updateProjectMenu'
    });
  }

  render() {
    const {project} = this.props;
    const {status, orgs, addChannels, hasApp, chainInfo, chainChartInfo} = project;

    let peersCount = 0;
    orgs.map((item) => {
      const peers = item.peers;
      if (peers) {
        peersCount += item.peers.length;
      }
    });

    let chaincodesCount = 0;
    if (addChannels) {
      addChannels.map((item) => {
        const chaincodes = item.chaincodes;
        if (chaincodes) {
          chaincodesCount += chaincodes.length;
        }
      });
    }

    let blocks;
    let txs;
    const parseChartData = (chartData, limit) => {
      const results = [];
      let signKey;
      let count = 0;
      for (let key in chartData) {
        results.push({name: key, data: chartData[key]});
        signKey = key;
        count++;
      }
      if (count < limit) {
        console.log(signKey);
      }
      return results;
    };

    if (chainChartInfo) {
      const block = chainChartInfo.block;
      const tx = chainChartInfo.tx;

      blocks = parseChartData(block, 7);
      txs = parseChartData(tx, 7);
    }

    return (
      <div className={styles.projectInfo}>
        <div className={styles.infoBox}>
          {getProjectStatusStepList(hasApp ? 'chaincodeed' : status)}
        </div>
        <div className={styles.infoBox}>
          <ul className={styles.info}>
            <li className={styles.infoItem}>
              <img className={styles.infoImage} src={orgImage} alt='组织'
                   width={64} height={58}/>
              <div className={styles.infoContent}>
                <div className={styles.infoTitle}>组织</div>
                <p className={styles.infoCount}>{orgs.length}</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <img className={styles.infoImage} src={peerImage} alt='节点'
                   width={58} height={58}/>
              <div className={styles.infoContent}>
                <div className={styles.infoTitle}>节点</div>
                <p className={styles.infoCount}>{peersCount}</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <img className={styles.infoImage} src={channelImage} alt='通道'
                   width={56} height={56}/>
              <div className={styles.infoContent}>
                <div className={styles.infoTitle}>通道</div>
                <p
                  className={styles.infoCount}>{addChannels && addChannels.length || 0}</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <img className={styles.infoImage} src={chaincodeImage} alt='智能合约'
                   width={56} height={56}/>
              <div className={styles.infoContent}>
                <div className={styles.infoTitle}>智能合约</div>
                <p
                  className={styles.infoCount}>{chaincodesCount}</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <img className={styles.infoImage} src={blockImage} alt='块'
                   width={56} height={56}/>
              <div className={styles.infoContent}>
                <div className={styles.infoTitle}>块</div>
                <p
                  className={styles.infoCount}>{chainInfo && chainInfo.block || 0}</p>
              </div>
            </li>
            <li className={styles.infoItem}>
              <img className={styles.infoImage} src={dealImage} alt='交易'
                   width={56} height={56}/>
              <div className={styles.infoContent}>
                <div className={styles.infoTitle}>交易</div>
                <p
                  className={styles.infoCount}>{chainInfo && chainInfo.tx || 0}</p>
              </div>
            </li>
          </ul>
        </div>
        {
          chainChartInfo ?
            <Row gutter={16}>
              <Col span={12}>
                <div className={`${styles.infoBox} ${styles.infoChartBox}`}>
                  <h4 className={styles.infoBoxTitle}>块(个)</h4>
                  <div className={styles.infoBoxContent}>
                    <InfoAreaChart data={blocks}/>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={`${styles.infoBox} ${styles.infoChartBox}`}>
                  <h4 className={styles.infoBoxTitle}>交易(个)</h4>
                  <div className={styles.infoBoxContent}>
                    <InfoAreaChart data={txs}/>
                  </div>
                </div>
              </Col>
            </Row>
            :
            null
        }
      </div>
    );
  }
}

export default connect(project => project)(ProjectInfo);
