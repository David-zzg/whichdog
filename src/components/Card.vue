<template>
    <div class="card">
        <div class="card-img" :style="{'background-image':path}" >
        </div>
        <div class="font-box">
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
        }
    }
}
</script>

<style lang="scss">
@import "../assets/main.scss";
.card{
    width: rem(243px);
    height: rem(243px);
    vertical-align: middle;
    border-radius:rem(8px);
    display: inline-block;
    margin: rem(25px) rem(30px);
    overflow: hidden;
    position: relative;
    border-color: transparent;
    .card-img{
        height: rem(180px);
        border-radius: 0px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .font-box{
        background:#181d5f;
        height: rem(63px);
        font-size:rem(24px);
        color:#ffffff;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
