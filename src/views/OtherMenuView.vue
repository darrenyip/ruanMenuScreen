<template>
  <div class="other-menu">
    <h1>其他菜单</h1>
    <div class="menu-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <template v-else>
        <!-- 荤菜 -->
        <div v-if="menuItems.meat.length > 0" class="menu-section">
          <h2>荤菜</h2>
          <div class="dish-list">
            <div v-for="dish in menuItems.meat" :key="dish.id" class="dish-item">
              <span class="dish-name">{{ dish.name }}</span>
              <span class="dish-price">{{ dish.price }}元</span>
            </div>
          </div>
        </div>

        <!-- 半荤 -->
        <div v-if="menuItems.halfMeat.length > 0" class="menu-section">
          <h2>半荤</h2>
          <div class="dish-list">
            <div v-for="dish in menuItems.halfMeat" :key="dish.id" class="dish-item">
              <span class="dish-name">{{ dish.name }}</span>
              <span class="dish-price">{{ dish.price }}元</span>
            </div>
          </div>
        </div>

        <!-- 素菜 -->
        <div v-if="menuItems.vegetable.length > 0" class="menu-section">
          <h2>素菜</h2>
          <div class="dish-list">
            <div v-for="dish in menuItems.vegetable" :key="dish.id" class="dish-item">
              <span class="dish-name">{{ dish.name }}</span>
              <span class="dish-price">{{ dish.price }}元</span>
            </div>
          </div>
        </div>

        <!-- 主食 -->
        <div v-if="menuItems.staple.length > 0" class="menu-section">
          <h2>主食</h2>
          <div class="dish-list">
            <div v-for="dish in menuItems.staple" :key="dish.id" class="dish-item">
              <span class="dish-name">{{ dish.name }}</span>
              <span class="dish-price">{{ dish.price }}元</span>
            </div>
          </div>
        </div>

        <!-- 汤品 -->
        <div v-if="menuItems.soup.length > 0" class="menu-section">
          <h2>汤品</h2>
          <div class="dish-list">
            <div v-for="dish in menuItems.soup" :key="dish.id" class="dish-item">
              <span class="dish-name">{{ dish.name }}</span>
              <span class="dish-price">{{ dish.price }}元</span>
            </div>
          </div>
        </div>

        <!-- 饮品 -->
        <div v-if="menuItems.drink.length > 0" class="menu-section">
          <h2>饮品</h2>
          <div class="dish-list">
            <div v-for="dish in menuItems.drink" :key="dish.id" class="dish-item">
              <span class="dish-name">{{ dish.name }}</span>
              <span class="dish-price">{{ dish.price }}元</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

// 获取当前日期
const today = new Date().toISOString().split('T')[0]

// 计算属性：获取菜单项
const menuItems = computed(
  () =>
    menuStore.currentMenu?.items || {
      meat: [],
      halfMeat: [],
      vegetable: [],
      staple: [],
      soup: [],
      drink: [],
    },
)

// 计算属性：加载状态
const loading = computed(() => menuStore.loading)

// 计算属性：错误信息
const error = computed(() => menuStore.error)

// 组件挂载时加载数据
onMounted(async () => {
  try {
    await menuStore.fetchMenu(today, 'soup')
  } catch (err) {
    console.error('加载其他菜单失败:', err)
  }
})
</script>

<style scoped>
.other-menu {
  width: 2160px;
  height: 3840px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: #e6fff0;
  color: #333;
}

h1 {
  font-size: 80px;
  text-align: center;
  margin-bottom: 60px;
  color: #006400;
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 36px;
}

.loading,
.error {
  font-size: 48px;
  text-align: center;
  margin-top: 100px;
}

.error {
  color: #e74c3c;
}

.menu-section {
  margin-bottom: 80px;
}

h2 {
  font-size: 60px;
  color: #006400;
  margin-bottom: 30px;
  border-bottom: 4px solid #006400;
  padding-bottom: 15px;
}

.dish-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.dish-item {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dish-name {
  font-size: 46px;
  font-weight: bold;
}

.dish-price {
  font-size: 46px;
  color: #2e8b57;
  font-weight: bold;
}
</style>
