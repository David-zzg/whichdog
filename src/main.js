// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Loading from '@pages/Loading'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: `<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>`,
  data(){
    return {
      select:{},
      currentView:'loading'
    }
  },
  mounted(){
    var list = []
    list.push(fetch('/static/WenYue-XinQingNianTi-NC-W8.otf'))
    list.push(fetch('/static/which/bg.png'))
    list.push(new Promise((resolve)=>{
      setTimeout(()=> {
        resolve()
      }, 1000);
    }))
    Promise.all(list).then(()=>{
      this.currentView = "app"
    })

  },
  components: { loading:Loading,app:App }
})
