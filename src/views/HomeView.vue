<template>
  <div class="home">
    <h1>餐厅菜单导航</h1>
    <div class="menu-buttons">
      <router-link to="/lunch-menu" class="menu-btn lunch">午餐菜单</router-link>
      <router-link to="/dinner-menu" class="menu-btn dinner">晚餐菜单</router-link>
      <router-link to="/other-menu" class="menu-btn other">其他菜单</router-link>
    </div>
  </div>
</template>

<script setup>
// 首页导航逻辑
</script>

<style scoped>
.home {
  width: 2160px;
  height: 3840px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 40px;
}

h1 {
  font-size: 100px;
  margin-bottom: 100px;
  color: #333;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 70%;
}

.menu-btn {
  font-size: 72px;
  padding: 60px;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.menu-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.lunch {
  background-color: #8b4513;
}

.dinner {
  background-color: #4b0082;
}

.other {
  background-color: #006400;
}
</style>
