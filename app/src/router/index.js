import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Config from '../config'
Vue.use(Router)

export default new Router({
//  mode: 'history',
  base: Config.base_path,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: {
      }
    },
    {
      path: '/email/:email',
      name: 'List',
      component: List
    }
  ]
})
