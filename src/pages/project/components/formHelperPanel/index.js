import React from 'react';
import NavLink from 'umi/navlink';
import styles from './formHelperPanel.less';

export class FormHelperPanel extends React.Component {
  render() {
    return (
      <div className={styles.formHelperPanel}>
        <ul className={styles.helperList}>
          <li className={`${styles.helperItem} ${styles.examplesIcon}`}>
            <h3 className={styles.exampleTitle}>示例</h3>
            <p>请按照示例填写正确信息，以免配置错误。</p>
            <p>项目名称：链佰食品溯源区块链项目</p>
            <p>域名：lianbai.com</p>
            <p>组织ID: lianbaiOrg</p>
            <p>IP: 192.108.100.10</p>
            <p>版本：1.0</p>
          </li>
          <li className={`${styles.helperItem} ${styles.tutorialIcon}`}>
            <NavLink to='/help/course'>查看教程</NavLink>
          </li>
          <li className={`${styles.helperItem} ${styles.contactIcon}`}>
            <NavLink to='/feedback'>联系平台技术支持</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
