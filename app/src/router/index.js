import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Config from '../config'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: Config.base_path,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      props: {
        msg: 'Welcome to Your Vue.js PWA'
      }
    }
  ]
})
