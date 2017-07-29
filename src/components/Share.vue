<template>
    <transition name="fade">
        <div class="cover" v-show="show" @click="$emit('update:show', false)">
            <span class="ib ricon-point"></span>
        </div>
    </transition>
</template>
<script>
export default {
    props:['show']
}
</script>

<style lang="scss">
@import "../assets/main.scss";
.cover{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0,0,0,0.5);
}
.ricon-point{
    position: absolute;
    right: rem(60px);
    top: rem(30px);
}
</style>
