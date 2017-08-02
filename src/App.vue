<template>
  <div id="app-box">
    <Loading v-show="$root.loading"></Loading>
    <div id="app" :style="{'background-image':'url(/static/'+data.path+'/bg.png)'}">
      <div id="bg">
        <router-view></router-view>
        
      </div>
    </div>
  </div>
</template>

<script>
import "@static/sprite_rem.css";
import Loading from "@pages/Loading"
export default {
  name: 'app',
  components:{
    Loading
  },
  data(){
    return {
      data:window.PETZMAN
    }
  },
}
</script>

<style lang="scss">
@import "./assets/main.scss";
body{
  margin: 0px;
}
#app{
  // position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  // position: fixed;
  min-height: rem(1220px);
  
  // background-image: url('/static/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
#bg{
    position: relative;
    height: rem(1220px);
}
.ricon-left-bottom{
    position: absolute;
    left: rem(20px);
    bottom: rem(30px);
}

.ricon-left-bottom.reverse{
    position: absolute;
    left: auto;
    right: rem(20px);
    bottom: rem(30px);
}
.title-bar{
    width: rem(577px);
    margin: auto;
    align-items: flex-end;
}
</style>
