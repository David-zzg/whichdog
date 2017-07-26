<template>
    <div class="loading">
        <div class="loading-bar">
            <div class="loading-inner" :style="{width:$root.width+'%'}"></div>
        </div>
    </div>
</template>
<script>
export default {
    props:['width']
}
</script>
<style lang="scss">
@import "../../assets/main.scss";
    .loading{
        font-family: "微软雅黑";
        margin: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: white;
        z-index: 999;
    }
    .loading-inner{
        background: #333;
        transition: width 200ms;
        width: 0%;
        border-radius: rem(80px);
        height: 100%;
    }
    .loading-bar{
        position: absolute;
        padding: rem(6px);
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 70%;
        border-radius: rem(80px);
        border-width: rem(6px);
        border-color: #000;
        border-style: solid;
        height: rem(40px);
    }
</style>


