<template>
  <!-- 底部品牌区域 -->
  <div class="menu-footer">
    <!-- 装饰性食材图片 -->
    <img src="@/assets/images/mushroom.svg" alt="蘑菇" class="footer-decor-image mushroom-image" />
    <img src="@/assets/images/vege.svg" alt="蔬菜" class="footer-decor-image vege-image" />
    <img src="@/assets/images/corn.svg" alt="玉米" class="footer-decor-image corn-image" />

    <router-link to="/" class="logo">
      <img src="@/assets/images/ruan_logo_white.svg" alt="轻" class="logo-image" />
    </router-link>
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
import { RouterLink } from 'vue-router'
</script>

<style scoped>
@import '../styles/menu.css';

.logo {
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.logo:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.logo:active {
  transform: scale(0.95);
}
</style>
