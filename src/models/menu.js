import auth from '../utils/auth';

function getHeaderMenu() {
  const user = auth.getUser();
  const menus = [
    {
      id: 0,
      name: '首页',
      route: '/'
    }
  ];
  if (user && user.role === 'user') {
    menus.push({
      id: 2,
      name: '项目中心',
      route: '/panel',
      test: /\/panel/
    });
  }
  return menus;
}

function getPathnameId() {
  const path = window.location.pathname;
  const names = path.split('/');
  let pid;
  if (names.length >= 4 || names.indexOf('maintain') !== -1) {
    pid = names.pop();
  }
  return pid;
}

function getProjectMenu() {
  const pId = getPathnameId();
  let disabled = !pId;

  return [
    {
      id: '1',
      name: '项目信息',
      iconClassName: 'icon iconProjectInfo',
      test: /\/project\/info/,
      route: pId ? `/project/info/${pId}` : '/project/info'
    },
    {
      id: '2',
      name: '项目配置',
      iconClassName: 'icon iconProjectConfig',
      test: /\/project\/(add|detail)/,
      route: pId ? `/project/detail/${pId}` : '/project/add'
    },
    {
      id: '3',
      name: '通道配置',
      iconClassName: 'icon iconProjectChainCode',
      test: /\/project\/chaincode/,
      disabled,
      route: `/project/chaincode/${pId}`
    },
    {
      id: '4',
      name: '项目维护',
      iconClassName: 'icon iconProjectMaintain',
      test: /\/maintain/,
      disabled,
      route: `/maintain/${pId}`
    },
  ];
}

function getAdminMenu() {
  return [
    {
      id: '0',
      name: '项目管理',
      test: /^\/admin\/?$/,
      route: '/admin',
      subMenu: [
        {
          id: '00',
          name: '项目审批',
          test: /^\/admin\/?$/,
          route: '/admin',
        },
        {
          id: '01',
          name: '项目维护',
          test: /^\/admin\/maintain$/,
          route: '/admin/maintain',
        }
      ]
    },
    {
      id: '1',
      name: '人员管理',
      test: /^\/admin\/user/,
      route: '/admin/user'
    },
    {
      id: '2',
      name: '项目日志',
      test: /^\/admin\/log$/,
      route: '/admin/log'
    }
  ];
}

export default {
  namespace: 'menu',
  state: {
    menuList: getHeaderMenu(),
    projectMenu: getProjectMenu(),
    adminMenu: getAdminMenu()
  },
  reducers: {
    updateProjectMenu(state) {
      return {...state, projectMenu: getProjectMenu()}
    },
    updateAdminMenu(state) {
      return {...state, adminMenu: getAdminMenu()}
    },
    updateHeaderMenu(state) {
      return {...state, menuList: getHeaderMenu()}
    },
  }
};
