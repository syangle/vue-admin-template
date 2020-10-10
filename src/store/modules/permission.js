import { asyncRouterMap, constantRoutes } from '@/router'

/*
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRouterMap
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
const permission = {
  state: {
    routes: [],
    addRoutes: []
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },

  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRouterMap || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  },
  getters: {
    // 只要权限路由数组发生变化就重新计算
    addRoutes (state) {
      return state.addRoutes
    }
  }

}
export default permission