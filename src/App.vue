<template>
  <div id="app" :style="{'background-image':'url(/static/'+data.path+'/bg.png)'}">
    <div id="bg">
      <router-view></router-view>
      <span class="ricon-left-bottom"></span>
      <span class="ricon-left-bottom reverse"></span>
    </div>
  </div>
</template>

<script>
import "@static/sprite_rem.css";
export default {
  name: 'app',
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
  position: fixed;

  
  height: 100%;
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
