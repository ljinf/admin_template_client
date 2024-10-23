// 全局公用的getters 可以把一些常用的getters从模块里抽出来，...mapGetters(['userInfo']) 而不是...mapGetters('app', ['userInfo'])
const getters = {

  device: state => state.setting.device,
  language: state => state.setting.language,



  userInfo: state => state.user.info,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,

  menuOption: state => state.menu.menuOptions,
}

export default getters
