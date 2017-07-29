// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: `<App/>`,
  data(){
    var config = window.PETZMAN
    return {
      select:this.getSelect(config),
      currentView:'app',
      loading:true,
      width:0,
      config:config,
      max:config.options.length,
    }
  },
  mounted(){
    window.app = this.$root
    var target = document.getElementById('target')
    var last = target.clientHeight
    var index = 0
    var list = []
    //检测字体是否加载完。字体加载完后会导致用字体的容器高度变化
    list.push(new Promise((resolve)=>{
        var interval = setInterval(()=>{
        if(index++>1000||last!=target.clientHeight){
            clearInterval(interval)
            console.log('capture end')
            resolve()
        }
      },100)
    }))
    //进度条
    var widthInterval = setInterval(()=>{
      if(this.loading == true&&this.width<80){
        this.width+=10
      }else{
        clearInterval(widthInterval)
      }
    },200)
    //至少加载1秒
    list.push(new Promise((resolve)=>{
      setTimeout(()=> {
        resolve()
      }, 1000);
    }))
    //加载背景
    list.push(new Promise((resolve)=>{
      var img = new Image()
      img.src="/static/"+this.config.path+"/bg.png"
      img.onload = ()=>{
        console.log('img load')
        resolve()
      }
    }))
    Promise.all(list).then(()=>{
      console.log('all end')
      this.width = 100
      if(this.isFinished()){
          this.$router.push({
              path:'/result'
          })
      }
      this.record()
      setTimeout(()=>{
        this.loading = false
      },200)
    })

  },
  components: { App },
  watch:{
    //更新localstorage
    select(val){
      if(window.localStorage){
      localStorage[this.config.path] = JSON.stringify(val)
      }
    }
  },
  methods:{
    //通过localstorage保存状态
    getSelect(config){
      if(window.localStorage){
        return localStorage[config.path]?JSON.parse(localStorage[config.path]):{}
      }else{
        return {}
      }
    },
    record(type=1,result=null){
        //记录浏览
        var xml = new XMLHttpRequest()
        var url=`/record?name=${this.config.path}&type=${type}`
        url = result?(url+"&result="+result):url
        xml.open("GET", url, false);
        xml.send(null);
    },
    //判断是否事结束状态
    isFinished(){
      var length = 0
      for(var i in this.select){
          length++
      }
        var result = length==this.max
        if(result){
          //结束了
        }else{
        }
      return result
    }
  }
  
})
