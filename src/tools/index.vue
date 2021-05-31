<template>
  <div class="flyimg"
  :style="{
      width,
      height,
      transform:`translate(${left}px ,${top}px) scale(${sx} ,${sy})`,
      opacity,
  }"
  v-if="exist"
  >
      <img :src="src" >
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">

.flyimg{
    position: fixed;
    left: 0;
    top: 0;
    transition: all .7s;
    z-index: 100;
    transform-origin: 5% 0%;
    img{
        border-radius: 50%;
        width: 100%;
    }
}
</style>