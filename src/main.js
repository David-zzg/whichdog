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
      currentView:'app',
      loading:true,
      width:20
    }
  },
  mounted(){
    var target = document.getElementById('target')
    var last = target.clientHeight
    var index = 0
    var list = []
    list.push(new Promise((resolve)=>{
        var interval = setInterval(()=>{
        if(index++>200||last!=target.clientHeight){
            clearInterval(interval)
            resolve()
        }
      },100)
    }))
    var widthInterval = setInterval(()=>{
      if(this.loading = true&&this.width<80){
        this.width+=10
      }else{
        clearInterval(widthInterval)
      }
    },200)
    list.push(new Promise((resolve)=>{
      setTimeout(()=> {
        resolve()
      }, 1000);
    }))
    Promise.all(list).then(()=>{
      this.width = 100
      setTimeout(()=>{
        this.loading = false
      },200)
    })

  },
  components: { loading:Loading,app:App }
})
