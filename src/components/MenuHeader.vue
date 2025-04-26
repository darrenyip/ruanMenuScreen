<template>
  <!-- 标题区域 -->
  <div class="menu-header">
    <!-- 装饰性食材图片 -->
    <img src="@/assets/images/meat.svg" alt="肉类" class="decor-image meat-image" />
    <img src="@/assets/images/carrot.svg" alt="胡萝卜" class="decor-image carrot-image" />
    <img src="@/assets/images/tomato.svg" alt="番茄" class="decor-image tomato-image" />
    <img src="@/assets/images/shrimp.svg" alt="虾" class="decor-image shrimp-image" />

    <h1 class="en-font today-title">TODAY DISHES</h1>
    <h1 class="chinese-title title-font">今日 <span class="en-font">MENUS</span> 菜品</h1>
  </div>
</template>

<script setup>
// 头部组件不需要特定的逻辑
</script>

<style scoped>
@import '../styles/menu.css';
</style>
