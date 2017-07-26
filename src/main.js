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
    window.app = this.$root
    var target = document.getElementById('target')
    var last = target.clientHeight
    var index = 0
    var list = []
    list.push(new Promise((resolve)=>{
        var interval = setInterval(()=>{
        if(index++>1000||last!=target.clientHeight){
            clearInterval(interval)
            console.log('capture end')
            resolve()
        }
      },100)
    }))
    var widthInterval = setInterval(()=>{
      if(this.loading == true&&this.width<80){
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
    list.push(new Promise((resolve)=>{
      var img = new Image()
      img.src="/static/"+window.PETZMAN.path+"/bg.png"
      img.onload = ()=>{
        console.log('img load')
        resolve()
      }
    }))
    Promise.all(list).then(()=>{
      console.log('all end')
      this.width = 100
      setTimeout(()=>{
        this.loading = false
      },200)
    })

  },
  components: { loading:Loading,app:App }
})
