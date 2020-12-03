import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '生产看板', icon: 'dashboard' }
    }]
  },
  
  {
    path: '/faction',
    alwaysShow:true,
    component: Layout,
    redirect:'/faction',
    name: 'timingData',
    meta: { title: '实时数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name:'faction',
        component:()=>import('@/views/faction/index'),
        meta: { title: '设备实时状态', icon: 'el-icon-truck' }
      },
      {
        path: 'workonoff',
        name:'workonoff',
        component:()=>import('@/views/faction/workonoff'),
        meta: { title: '上下工管理', icon: 'el-icon-set-up' }
      },
      
    ]
  },
  {
    path: '/pick',
    alwaysShow:true,
    component: Layout,
    redirect:'/pick',
    name: 'pick',
    meta: { title: '采摘数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name:'pickrecord',
        component:()=>import('@/views/pick/index'),
        meta: { title: '采摘记录', icon: 'table' }
      },   
      
    ]
  },
  
  {
    path: '/produce',
    alwaysShow:true,
    component: Layout,
    redirect:'/produce',
    name: 'produce',
    meta: { title: '生产数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'feeding',
        name:'feeding',
        component:()=>import('@/views/produce/feeding'),
        meta: { title: '投料记录', icon: 'table' }
      },
      {
        path: 'DynamicScale',
        name:'DynamicScale',
        component:()=>import('@/views/produce/DynamicScale'),
        meta: { title: '动态称记录', icon: 'table' }
      }, 
    ]
  },

  {
    path: '/check',
    alwaysShow:true,
    component: Layout,
    redirect:'/check',
    name: 'check',
    meta: { title: '抽检数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name:'checkrecord',
        component:()=>import('@/views/check/index'),
        meta: { title: '抽检记录', icon: 'table' }
      },   
      
    ]
  },

  {
    path: '/report',
    alwaysShow:true,
    component: Layout,
    redirect:'/report',
    name: 'report',
    meta: { title: '统计报表', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'picknum',
        name:'picknum',
        component:()=>import('@/views/report/picknum'),
        meta: { title: '采摘量统计', icon: 'el-icon-s-data' }
      }, 
      {
        path: 'pickperson',
        name:'pickperson',
        component:()=>import('@/views/report/pickperson'),
        meta: { title: '采摘人统计', icon: 'el-icon-s-data' }
      },  
      {
        path: 'feedingnum',
        name:'feedingnum',
        component:()=>import('@/views/report/feedingnum'),
        meta: { title: '投料量统计', icon: 'el-icon-s-data' }
      },  
      {
        path: 'instock',
        name:'instock',
        component:()=>import('@/views/report/instock'),
        meta: { title: '在库统计', icon: 'el-icon-s-data' }
      },  
      {
        path: 'instockloss',
        name:'instockloss',
        component:()=>import('@/views/report/instockloss'),
        meta: { title: '在库损害统计', icon: 'el-icon-s-data' }
      },  
      {
        path: 'efficiency',
        name:'efficiency',
        component:()=>import('@/views/report/efficiency/efficiency'),
        meta: { title: '效率统计', icon: 'el-icon-s-data' }
      },  
      {
        path: 'sum',
        name:'sum',
        component:()=>import('@/views/report/sum'),
        meta: { title: '产量统计', icon: 'el-icon-s-data' }
      },  
      {
        path: 'sumqualificationrate',
        name:'sumqualificationrate',
        component:()=>import('@/views/report/sumqualificationrate'),
        meta: { title: '产量合格率', icon: 'el-icon-s-flag' }
      },  
      {
        path: 'sumqualificationratedetail',
        name:'sumqualificationratedetail',
        component:()=>import('@/views/report/sumqualificationratedetail/sumqualificationratedetail'),
        meta: { title: '产量合格率明细', icon: 'el-icon-s-flag' }
      },  
      {
        path: 'inputoutput',
        name:'inputoutput',
        component:()=>import('@/views/report/inputoutput'),
        meta: { title: '投入产出比统计', icon: 'el-icon-s-flag' }
      },    
      
    ]
  },

  {
    path: '/basedata',
    alwaysShow:true,
    component: Layout,
    redirect:'/basedata',
    name: 'Basedata',
    meta: { title: '基础数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name:'basedata',
        component:()=>import('@/views/basedata/index'),
        meta: { title: '基础数据', icon: 'table' }
      },   
      
    ]
  },
  
  {
    path: '/sysmanagement',
    alwaysShow:true,
    component: Layout,
    redirect:'/sysmanagement',
    name: 'Sysmanagement',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        name:'sysmanagement',
        component:()=>import('@/views/sysmanagement/index'),
        meta: { title: '系统管理', icon: 'el-icon-s-platform' }
      },   
     
    ]
  },
  


  
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
