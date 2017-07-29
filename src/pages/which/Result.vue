<template>
    <div class="result">
        <HeadBar></HeadBar>
        <div class="result-box">
            <span class="ib ricon-decorate"></span>
            <div class="ib result-img" :style="{'background-image':'url(/static/'+$root.config.path+'/options/result_'+data.id+'.png)'}"></div>
            <div class="result-title" id="target">{{data.name}}</div>
        </div>
        <div class="result-content">
            {{data.desc}}
        </div>
        <div class="start-btn ricon-box" @click="show=!show">
            分享好友
        </div>
        <div class="start-btn ricon-box" @click="reload">
            再测一次
        </div>
        <div class='logo'>
            <img src="/static/qr.png"> 
            <div>非正常猫狗研究所</div>
        </div>
        <Share :show.sync="show"></Share>
    </div>
</template>
<script>
import HeadBar from "../../components/Head.vue"
import Share from "../../components/Share.vue"

export default {
    components:{
        HeadBar,Share
    },
    data(){
        return {
            point:this.getPoint(),
            show:false
        }
    },
    methods:{
        //计算分数
        getPoint(){
            var data = window.PETZMAN.options//配置
            var select = this.$root.select//选项
            var point = 0
            for(var i in select){
                point+=data[i].options[select[i]].point
            }
            return point
        },
        //获取结果
        getData(){
            var point = this.point
            var data = window.PETZMAN.result//配置
            for(var i in data){
                if(eval(i)){
                    return data[i]
                }
            }
        },
        //再测一次
        reload(){
            this.$root.select = {}
            this.$router.push({
                path:"/"
            })
        }
    },
    computed:{
        data(){
            return this.getData()
        }
    }
}
</script>
<style lang="scss">
@import "../../assets/main.scss";
.result{
    padding-top: rem(20px);
}
.result-box{
    position: relative;
    margin-top: rem(-40px);
    text-align: center;
    .result-img{
        position: absolute;
        left: 50%;
        top: 40%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transform: translate(-50%,-50%);
        height: rem(260px);
        width: rem(300px);
    }
    .result-title{
        font-size: rem(80px);
        position: absolute;
        bottom: rem(16px);
        width: 100%;
        text-align: center;
        color:#c1142a;
    }
}
.result-content{
    width: rem(612px);
    margin: auto;
    font-size:rem(36px);
    color:#333333;
    margin-top: rem(35px);
    text-align:center;
    height: rem(170px);
}
.start-btn{
    font-size:rem(64px);
    margin: auto;
    line-height: rem(112px);
    margin-top: rem(30px);
    color:#ffffff;
    // background-size: cover;
    letter-spacing:rem(11.33px);
    text-align:center;
    // background-repeat: no-repeat;
    // width: auto!important;
    // height: auto!important;
} 
.logo{
    font-size:rem(37px);
    margin-top: rem(20px);
    color:#c1142a;
    text-align:center;
    img{
        width: rem(120px);
    }
}
</style>