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
  margin: 0 auto;
  position: relative;
  height: 100vh;
  width: 100vw;
}
</style>
