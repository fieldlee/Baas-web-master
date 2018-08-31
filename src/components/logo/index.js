import React from 'react';
import NavLink from 'umi/navlink';
import logo from '../../assets/images/logo.svg';
import styles from './logo.less';

export class Logo extends React.Component {
  render() {
    const {width, height} = this.props;
    return (
      <NavLink className={styles.logo} to='/'><img src={logo} width={width}
                                               height={height}
                                                     alt='链佰'/></NavLink>
    );
  }
}