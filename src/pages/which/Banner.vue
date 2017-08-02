<template>
    <div class="banner">
        <TitleBar></TitleBar>
        <div class="main-content">
            <HeadComponent></HeadComponent>
            <!-- <div class="flex flex-center">
                <span class="ib ricon-left-top"></span>
                <span class="ib ricon-top"></span>
                <span class="ib ricon-left-top reverse"></span>
            </div> -->
            <div class="flex">
                <div class="_1em">汪星的神秘力量</div>
                <span class="ib ricon-banner"></span>
                <div class="_1em" >来自外太空的传说</div>
            </div>
            <div class="flex title-bar">
                <span class="ib ricon-star"></span>
                <span class="title">非正常</br>
                猫狗研究所</span>
                <span class="ib ricon-star"></span>
            </div>
            <div class=" start-box tc">
                <router-link to="/select/0" tag="div" class="start ricon-box" >
                    开始测试
                </router-link>
            </div>
            <span class="ricon-left-bottom"></span>
            <span class="ricon-left-bottom reverse"></span>
        </div>
    </div>
</template>
<script>
import HeadComponent from "../../components/Head.vue"
import TitleBar from "../../components/TitleBar.vue"
export default {
    components:{
        HeadComponent,TitleBar
    }
}
</script>

<style lang="scss">
@import "../../assets/main.scss";
    .banner{
        padding-top: rem(20px);
        
        .main-content{
            padding: rem(44px) rem(20px);
            .flex{
                justify-content: space-between;
            }
        }
        
        ._1em{
            width: 1em;
            padding-top: rem(20px);
            font-size: rem(40px);
            color:$blue;
        }
        .title{
            text-align: center;
            font-size:rem(64px);
            color:#c1142a;
            letter-spacing:rem(14.5px);
        }
        
        
    }
   .start{
            font-size:rem(64px);
            margin: auto;
            line-height: rem(112px);
            margin-top: rem(30px);
            color:#ffffff;
            // background-size: cover;
            letter-spacing:rem(14.5px);
            text-align:center;
            // background-repeat: no-repeat;
            // width: auto!important;
            // height: auto!important;
        } 
</style>

