import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'guide', affix: true }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: '/system',
    meta: {
      title: '系统管理',
      icon: 'lock'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        name: '/system/user',
        meta: {
          title: '用户管理',
          icon: 'people'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: '/system/role',
        meta: {
          title: '角色管理',
          icon: 'user'
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        name: '/system/menu',
        meta: {
          title: '菜单管理',
          icon: 'nested'
        }
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict/type'),
        name: '/system/dict',
        meta: {
          title: '字典管理',
          icon: 'zip'
        }
      }
    ]
  },

  {
    path: '/log',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: '/log',
    meta: {
      title: '日志管理',
      icon: 'edit'
    },
    children: [
      {
        path: 'oper-log',
        component: () => import('@/views/log/operLog/index'),
        name: '/log/oper-log',
        meta: {
          title: '操作日志管理',
          icon: 'clipboard'
        }
      },
      {
        path: 'sms-log',
        component: () => import('@/views/log/smsLog/index'),
        name: '/log/sms-log',
        meta: {
          title: '短信日志管理',
          icon: 'email'
        }
      }
    ]
  },

  {
    path: '/portal',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: '/portal',
    meta: {
      title: '前台管理',
      icon: 'table'
    },
    children: [
      {
        path: 'music',
        component: () => import('@/views/portal/music/index'),
        name: '/portal/music',
        meta: {
          title: '白噪音管理',
          icon: 'star'
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/portal/notice/index'),
        name: '/portal/notice',
        meta: {
          title: '通知公告',
          icon: 'message'
        }
      },
      {
        path: 'slide',
        component: () => import('@/views/portal/slide/index'),
        name: '/portal/slide',
        meta: {
          title: '轮播图管理',
          icon: 'education'
        }
      }
    ]
  },

  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'data/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'data',
        meta: { title: '数据字典', icon: 'list' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
