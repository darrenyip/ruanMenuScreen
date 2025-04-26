<template>
  <!-- 底部品牌区域 -->
  <div class="menu-footer">
    <!-- 装饰性食材图片 -->
    <img src="@/assets/images/mushroom.svg" alt="蘑菇" class="footer-decor-image mushroom-image" />
    <img src="@/assets/images/vege.svg" alt="蔬菜" class="footer-decor-image vege-image" />
    <img src="@/assets/images/corn.svg" alt="玉米" class="footer-decor-image corn-image" />

    <div class="logo">
      <img src="@/assets/images/ruan_logo_white.svg" alt="轻" class="logo-image" />
    </div>
    <div class="slogan-container">
      <div class="slogan body-font-soft">
        <div class="flour-line">
          <img src="@/assets/images/flour.svg" alt="面粉" class="flour-image" />
        </div>
        <div class="footer-text alimama-font">多点烟火气</div>
        <div class="footer-text alimama-font">少点高科技</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 底部组件不需要特定的逻辑
</script>

<style scoped>
@import '../styles/menu.css';
</style>
