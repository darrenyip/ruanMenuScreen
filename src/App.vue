<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* 重置一些基本样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

/* 默认样式（小屏幕） */
.menu {
  width: 512px;
  height: 896px;
  margin: 0 auto;
  position: relative;
  transform-origin: top left;
  transform: scale(1);
}

/* 大屏幕适配 */
@media screen and (min-width: 2160px) and (min-height: 3840px) {
  .menu {
    width: 2160px;
    height: 3840px;
    transform: scale(1);
  }
}

/* 中等屏幕适配 */
@media screen and (min-width: 1024px) and (min-height: 768px) {
  .menu {
    width: 1024px;
    height: 768px;
    transform: scale(1);
  }
}

/* 小屏幕缩放适配 */
@media screen and (max-width: 511px), screen and (max-height: 895px) {
  .menu {
    width: 512px;
    height: 896px;
    transform: scale(calc(min(100vw / 512, 100vh / 896)));
    transform-origin: top left;
  }
}
</style>
