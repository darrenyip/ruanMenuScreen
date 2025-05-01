<template>
  <div class="menu lunch-menu-512">
    <!-- Header Section -->
    <div class="menu-header">
      <img src="@/assets/images/meat.svg" alt="肉类" class="decor-image meat-image" />
      <img src="@/assets/images/carrot.svg" alt="胡萝卜" class="decor-image carrot-image" />
      <img src="@/assets/images/tomato.svg" alt="番茄" class="decor-image tomato-image" />
      <img src="@/assets/images/shrimp.svg" alt="虾" class="decor-image shrimp-image" />

      <h1 class="en-font today-title">TODAY DISHES</h1>
      <h1 class="chinese-title title-font">今日 <span class="en-font">MENUS</span> 菜品</h1>
    </div>

    <!-- Content Section -->
    <div class="menu-content">
      <div v-if="loading" class="loading body-font">加载中...</div>
      <div v-else-if="error" class="error body-font">
        <div>{{ error }}</div>
        <div v-if="noDataError" class="no-data-hint">
          <p>今日菜单暂未发布，请稍后再来查看</p>
        </div>
      </div>
      <template v-else>
        <div class="menu-grid">
          <!-- 荤菜区域 -->
          <template v-if="menuItems.meat && menuItems.meat.length > 0">
            <div class="menu-row meat-type">
              <div class="type-container">
                <div class="type-name title-font">荤菜</div>
                <div class="type-en en-font type-en-pt-2">MEAT</div>
              </div>
              <div class="dish-name alimama-font">{{ menuItems.meat[0].name }}</div>
              <div class="dish-price frutiger-black">{{ Math.floor(menuItems.meat[0].price) }}</div>
            </div>

            <div
              v-for="(dish, index) in menuItems.meat.slice(1)"
              :key="dish.id"
              class="menu-row meat-item"
            >
              <div class="type-container"></div>
              <div class="dish-name alimama-font">{{ dish.name }}</div>
              <div class="dish-price frutiger-black">{{ Math.floor(dish.price) }}</div>
            </div>
          </template>

          <!-- 半荤区域 -->
          <template v-if="menuItems.halfMeat && menuItems.halfMeat.length > 0">
            <div class="menu-row half-meat-type">
              <div class="type-container">
                <div class="type-name title-font">半荤</div>
                <div class="type-en en-font type-en-pt-2">
                  <div>VEGGIE &</div>
                  <div>MEAT MIX</div>
                </div>
              </div>
              <div class="dish-name alimama-font">{{ menuItems.halfMeat[0].name }}</div>
              <div class="dish-price frutiger-black">
                {{ Math.floor(menuItems.halfMeat[0].price) }}
              </div>
            </div>

            <div
              v-for="(dish, index) in menuItems.halfMeat.slice(1)"
              :key="dish.id"
              class="menu-row half-meat-item"
            >
              <div class="type-container"></div>
              <div class="dish-name alimama-font">{{ dish.name }}</div>
              <div class="dish-price frutiger-black">{{ Math.floor(dish.price) }}</div>
            </div>
          </template>

          <!-- 素菜区域 -->
          <template v-if="menuItems.vegetable && menuItems.vegetable.length > 0">
            <div class="menu-row vege-type">
              <div class="type-container">
                <div class="type-name title-font">素菜</div>
                <div class="type-en en-font type-en-pt-2">VEGGIE</div>
              </div>
              <div class="dish-name alimama-font">{{ menuItems.vegetable[0].name }}</div>
              <div class="dish-price frutiger-black">
                {{ Math.floor(menuItems.vegetable[0].price) }}
              </div>
            </div>

            <div
              v-for="(dish, index) in menuItems.vegetable.slice(1)"
              :key="dish.id"
              class="menu-row vege-item"
            >
              <div class="type-container"></div>
              <div class="dish-name alimama-font">{{ dish.name }}</div>
              <div class="dish-price frutiger-black">{{ Math.floor(dish.price) }}</div>
            </div>
          </template>
        </div>
      </template>
    </div>

    <!-- Footer Section -->
    <div class="menu-footer">
      <img
        src="@/assets/images/mushroom.svg"
        alt="蘑菇"
        class="footer-decor-image mushroom-image"
      />
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
  </div>
</template>

<script setup>
import { onMounted, computed, onBeforeUnmount } from 'vue'
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

// 计算属性：是否是"无数据"错误
const noDataError = computed(() => menuStore.noDataError)

// 组件挂载时加载数据并启动自动刷新
onMounted(async () => {
  try {
    await menuStore.fetchMenu(today, 'lunch')
    // 启动自动刷新（每3分钟刷新一次）
    menuStore.startAutoRefresh()
  } catch (err) {
    console.error('加载午餐菜单失败:', err)
  }
})

// 组件卸载前停止自动刷新
onBeforeUnmount(() => {
  menuStore.stopAutoRefresh()
})
</script>

<style scoped>
@import '../styles/menu.css';

.lunch-menu-512 {
  width: 512px;
  height: 896px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #000;
  font-family: 'SimHei', '黑体', Arial, sans-serif;
  overflow: hidden;
  position: relative;
}

/* 标题区域 */
.menu-header {
  height: 180px;
  text-align: center;
  background-color: #cd3c31;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0;
}

/* 装饰性食材图片 */
.decor-image {
  position: absolute;
  filter: brightness(0.7) contrast(1.2);
  z-index: 1;
}

.meat-image {
  width: 120px;
  top: -30%;
  left: 20px;
  transform: rotate(-4deg);
}

.carrot-image {
  width: 80px;
  top: -44%;
  right: 11%;
  transform: rotate(1deg);
}

.tomato-image {
  width: 60px;
  bottom: -16%;
  left: 4%;
}

.shrimp-image {
  width: 70px;
  bottom: -5%;
  right: 3%;
  transform: rotate(-5deg);
}

.menu-header h1 {
  font-size: 24px;
  margin: 0;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    1px 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.today-title {
  letter-spacing: 1px;
}

.chinese-title {
  font-size: 28px;
}

/* 菜单内容区域 */
.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px 20px;
}

.loading,
.error {
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

.error {
  color: #e74c3c;
}

/* 菜单网格 */
.menu-grid {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 菜单行 */
.menu-row {
  display: grid;
  grid-template-columns: 120px 1fr 60px;
  align-items: center;
  padding: 8px;
  min-height: 40px;
  border-bottom: 1px solid #ddd;
}

/* 类型容器 */
.type-container {
  display: flex;
  flex-direction: column;
}

.type-en-pt-2 {
  padding-top: 4px;
}

/* 菜品类型名称 */
.type-name {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  margin-right: 8px;
}

/* 英文类型名称 */
.type-en {
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
}

/* 荤菜样式 */
.meat-type,
.meat-item {
  background-color: #fff9ee;
}

/* 半荤菜样式 */
.half-meat-type,
.half-meat-item {
  background-color: #da3b31;
  color: white;
}

/* 素菜样式 */
.vege-type,
.vege-item {
  background-color: #fff9ee;
}

/* 菜品名称 */
.dish-name {
  font-size: 16px;
  padding-left: 10px;
}

/* 菜品价格 */
.dish-price {
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 底部区域 */
.menu-footer {
  height: 120px;
  background-color: #cd3c31;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 装饰性食材图片 - 底部 */
.footer-decor-image {
  position: absolute;
  filter: brightness(0.7) contrast(1.2);
  z-index: 1;
}

.mushroom-image {
  width: 60px;
  top: 44%;
  left: 16%;
}

.vege-image {
  width: 70px;
  bottom: 16%;
  left: 43%;
}

.corn-image {
  width: 65px;
  bottom: 42%;
  right: 2%;
}

.logo {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
}

.logo-image {
  width: 40px;
  height: 40px;
}

.slogan-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  z-index: 2;
}

.slogan {
  text-align: right;
}

.flour-line {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
}

.flour-image {
  width: 20px;
  height: 20px;
}

.footer-text {
  font-size: 14px;
  margin: 2px 0;
  line-height: 1.2;
}
</style>
