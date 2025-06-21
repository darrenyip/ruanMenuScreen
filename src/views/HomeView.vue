<template>
  <div class="home">
    <h1>餐厅菜单导航</h1>

    <h2>今日菜单</h2>
    <div class="menu-buttons">
      <router-link to="/lunch-menu" class="menu-btn lunch">午餐菜单</router-link>
      <router-link to="/dinner-menu" class="menu-btn dinner">晚餐菜单</router-link>
      <router-link to="/other-menu" class="menu-btn other">其他菜单</router-link>
    </div>

    <h2>明日菜单</h2>
    <div class="menu-buttons">
      <router-link to="/lunch-menu-tomorrow" class="menu-btn lunch-tomorrow">明日午餐</router-link>
      <router-link to="/dinner-menu-tomorrow" class="menu-btn dinner-tomorrow"
        >明日晚餐</router-link
      >
      <router-link to="/other-menu-tomorrow" class="menu-btn other-tomorrow">明日其他</router-link>
    </div>
  </div>
</template>

<script setup>
// 首页导航逻辑
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 40px;
}

h1 {
  font-size: 100px;
  margin-bottom: 60px;
  color: #333;
}

h2 {
  font-size: 60px;
  margin-bottom: 40px;
  margin-top: 60px;
  color: #555;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 70%;
  margin-bottom: 60px;
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

/* 明日菜单按钮样式 - 使用稍微不同的色调 */
.lunch-tomorrow {
  background-color: #a0522d;
}

.dinner-tomorrow {
  background-color: #6a0dad;
}

.other-tomorrow {
  background-color: #228b22;
}
</style>
