<template>
    <div class="select-box">
        <TitleBar></TitleBar>
        <div class="subtitle">
            《遇到以下问题你会作出如何选择？》
        </div>
        <div class="question">
            {{parseInt(page)+1}}.{{data.question}}
        </div>
        <div class="card-box">
            <Card  v-for="(item,index) in data.options" :key="index" :data="item" :index="index" :page="page" :select="$root.select" @click.native="redirect(index)"></Card>
        </div>
        <div class="nav">
            <span class="ib ricon-dog " v-for="(item ,index) in max" :key="index" :class="{'active':index==page}" @click="nav(index)">
                <span class="font_20">{{typeof $root.select[index]!="undefined"?(index+1):'?'}}</span>
            </span>
        </div>
    </div>
</template>
<script>
import TitleBar from "../../components/TitleBar.vue"
import Card from "../../components/Card.vue"
export default {
    components:{
        TitleBar,Card
    },
    data(){
        var id = this.$route.params.id
        return {
            // data:window.PETZMAN.options[id],
            // page:parseInt(id)+1,
            max:window.PETZMAN.options.length
        }
    },
    computed:{
        //获取当页的选项
        data(){
            return window.PETZMAN.options[this.page]
        },
        //获取页数
        page(){
            var id = this.$route.params.id
            return id
        },
        hasActive(){
            return this.$root.select[this.page]?true:false
        }
    },
    methods:{
        nav(index){
            this.go(index)
        },
        isFinished(){
            var length = 0
            for(var i in this.$root.select){
                length++
            }
            return length==this.max
        },
        go(index){
            this.$router.push({
                path:'/select/'+index
            })
        },
        //还没有选择的页面
        getUnSelect(){
            debugger
            var index = 0
            for(var i in this.$root.select){
                if(index==i){
                    index++
                }else{
                    return index
                }
            }
            return index
        },
        redirect(index){
            this.$root.select=Object.assign({},this.$root.select,{
                [this.page]:index
            })
            setTimeout(()=>{
                var next = parseInt(this.page)+1
                //切换到下一页
                if(this.$root.isFinished()){
                    this.$router.push({
                        path:'/result'
                    })
                    return
                }
                var p = this.getUnSelect()
                if(p!==false){
                    this.go(p)
                }
            }, 500);
            
            // console.log(this.$root)
            // this.$root
        }
    }
}
</script>
<style lang="scss">
@import "../../assets/main.scss";
.select-box{
    padding-top: rem(20px);
}
.subtitle{
    margin-top: rem(33px);
    font-size:rem(39px);
    color:#c1142a;
    text-align:center;
}
.question{
    font-size:rem(36px);
    height: rem(140px);
    color:#282828;
    text-align:left;
    width:rem(630px);
    margin: auto;
    padding-top: rem(50px);
}
.card-box{
    text-align: center;
}
.nav{
    text-align: center;
    .ricon-dog{
        transition: all 200ms;
        margin: rem(30px);
        position: relative;
        &>span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: white;
        }
        &.active{
            transform: scale(1.5);
        }
    }
}
</style>
