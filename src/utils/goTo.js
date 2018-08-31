import {connect} from 'dva';
import router from 'umi/router';

function goTo(pathname, isShouldUpdateMenu, dispatch) {
  router.push({
    pathname: pathname
  });
  if (isShouldUpdateMenu) {
    dispatch({
      type: 'menu/updateProjectMenu'
    });
  }
}
export default connect(({menu}) => ({menu}))(goTo);
