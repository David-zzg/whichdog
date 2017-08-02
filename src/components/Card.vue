<template>
    <div class="card">
        <div class="card-img" :style="{'background-image':path}" >
        </div>
        <div class="font-box" :style="{background:color}">
            {{data.key}}.{{data.title}}
        </div>
        <transition name="fade">
            <div class="card-active" v-show="active">
                <span class="ib ricon-tick"></span>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props:['data','index','page','select'],
    computed:{
        active(){
            return typeof this.select[this.page]!="undefined"&&this.select[this.page]==this.index
        },
        path(){
            return `url(/static/${this.$root.config.path}/options/${parseInt(this.page)+1}_${this.index+1}.png)`
        },
        color(){
            return '#'+this.$route.query.color
        }
    }
}
</script>

<style lang="scss">
@import "../assets/main.scss";
.card{
    width: rem(296px);
    height: rem(326px);
    vertical-align: middle;
    border-radius:rem(8px);
    display: inline-block;
    margin: rem(25px) rem(32px);
    overflow: hidden;
    position: relative;
    border-color: transparent;
    .card-img{
        height: rem(219px);
        border-radius: 0px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .font-box{
        background:#3a6bee;
        height: rem(107px);
        font-size:rem(30px);
        color:#ffffff;
        padding: rem(13px) rem(10px);
        text-align: left;
    }
    .card-active{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        padding-top: rem(50px);
    }
}

</style>
