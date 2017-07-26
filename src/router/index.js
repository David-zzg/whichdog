import Vue from 'vue'
import Router from 'vue-router'
import Banner from '@pages/Banner'
import Select from '@pages/Select'
import Result from '@pages/Result'
// const Select = resolve => require(['@pages/Select'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Banner',
      component: Banner
    },
    {
      path:'/select/:id',
      name:"Select",
      component:Select
    },{
      path:'/result',
      name:"result",
      component:Result
    }
  ]
})
