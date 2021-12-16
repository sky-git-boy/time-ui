import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/todo',
          name: 'todo',
          component: () => import('./views/todo/Todo.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/todo-list',
          name: 'todo-list',
          component: () => import('./views/todo/TodoList.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/diary',
          name: 'diary',
          component: () => import('./views/diary/Diary.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/goal',
          name: 'Goal',
          component: () => import('./views/goal/Goal.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/calendar/vue-fullcalendar',
          name: 'calendarFullCalendar',
          component: () => import('./views/calendar/FullCalendar.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/calendar/vue-simple-calendar',
          name: 'calendarSimpleCalendar',
          component: () => import('./views/calendar/SimpleCalendar.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/stats',
          name: '/stats',
          component: () => import('@/views/stats/Stats.vue')
        },
        {
          path: '/profile',
          name: '/profile',
          component: () => import('@/views/profile/Profile.vue')
        },
        {
          path: '/test',
          name: '/test',
          component: () => import('@/views/test.vue')
        },
      ],
    },
    {
      path: '',
      component: () => import('@/layouts/main/Main2.vue'),
      children: [{
          path: '/tomato',
          name: 'Tomato',
          component: () => import('@/views/pages/Tomato.vue')
        },
        {
          path: '/music',
          name: 'Music',
          component: () => import('@/views/pages/Music.vue')
        },
      ]
    },
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [{
          path: '/pages/login',
          name: 'pageLogin',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/register',
          name: 'pageRegister',
          component: () => import('@/views/pages/Register.vue')
        },
        {
          path: '/pages/forgot-password',
          name: '/forgotPassword',
          component: () => import('@/views/pages/ForgotPassword.vue')
        },
        {
          path: '/pages/error-404',
          name: 'pageError404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

export default router
