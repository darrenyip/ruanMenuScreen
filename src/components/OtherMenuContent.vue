<template>
  <div class="menu-content">
    <div v-if="loading" class="loading body-font">加载中...</div>
    <div v-else-if="error" class="error body-font">
      <div>{{ error }}</div>
      <div class="no-data-hint">
        <p v-if="noDataError">今日菜单暂未发布，请稍后再来查看</p>
        <p v-if="countdownTime > 0" class="countdown">
          将在 <span class="countdown-time">{{ formatTime(countdownTime) }}</span> 后自动刷新
        </p>
      </div>
    </div>
    <template v-else>
      <div class="menu-grid">
        <!-- 炖汤区域 -->
        <template v-if="menuItems.soup && menuItems.soup.length > 0">
          <div class="menu-row soup-type">
            <div class="type-container">
              <div class="type-name title-font">炖汤</div>
              <div class="type-en en-font type-en-pt-2">SOUP</div>
            </div>
            <div class="dish-name alimama-font" :class="getDishNameClass(menuItems.soup[0].name)">
              {{ menuItems.soup[0].name }}
            </div>
            <div class="dish-price frutiger-black">
              <template v-if="menuItems.soup[0].hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小份</span>
                    <span class="frutiger-black">{{ menuItems.soup[0].smallPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="size-label">大份</span>
                    <span class="frutiger-black">{{ menuItems.soup[0].largePrice }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container">
                  {{ menuItems.soup[0].price }}
                </div>
              </template>
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.soup.slice(1)"
            :key="dish.id"
            class="menu-row soup-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
            </div>
            <div class="dish-price frutiger-black">
              <template v-if="dish.hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小份</span>
                    <span class="frutiger-black">{{ dish.smallPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="size-label">大份</span>
                    <span class="frutiger-black">{{ dish.largePrice }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container">
                  {{ dish.price }}
                </div>
              </template>
            </div>
          </div>
        </template>

        <!-- 主食区域 -->
        <template v-if="menuItems.staple && menuItems.staple.length > 0">
          <div class="menu-row staple-type">
            <div class="type-container">
              <div class="type-name title-font">主食</div>
              <div class="type-en en-font type-en-pt-2">
                <div>STAPLE</div>
                <div>FOOD</div>
              </div>
            </div>
            <div class="dish-name alimama-font" :class="getDishNameClass(menuItems.staple[0].name)">
              {{ menuItems.staple[0].name }}
            </div>
            <div class="dish-price frutiger-black">
              <template v-if="menuItems.staple[0].hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小份</span>
                    <span class="frutiger-black">{{ menuItems.staple[0].smallPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="size-label">大份</span>
                    <span class="frutiger-black">{{ menuItems.staple[0].largePrice }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container">
                  {{ menuItems.staple[0].price }}
                </div>
              </template>
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.staple.slice(1)"
            :key="dish.id"
            class="menu-row staple-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
            </div>
            <div class="dish-price frutiger-black">
              <template v-if="dish.hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小</span>
                    <span class="frutiger-black">{{ dish.smallPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="size-label">大</span>
                    <span class="frutiger-black">{{ dish.largePrice }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container">
                  {{ dish.price }}
                </div>
              </template>
            </div>
          </div>
        </template>

        <!-- 饮料区域 -->
        <template v-if="menuItems.drink && menuItems.drink.length > 0">
          <div class="menu-row drink-type">
            <div class="type-container">
              <div class="type-name title-font">饮料</div>
              <div class="type-en en-font type-en-pt-2">DRINK</div>
            </div>
            <div class="dish-name alimama-font" :class="getDishNameClass(menuItems.drink[0].name)">
              {{ menuItems.drink[0].name }}
            </div>
            <div class="dish-price frutiger-black">
              <template v-if="menuItems.drink[0].hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小</span>
                    <span class="frutiger-black">{{ menuItems.drink[0].smallPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="size-label">大</span>
                    <span class="frutiger-black">{{ menuItems.drink[0].largePrice }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container">
                  {{ menuItems.drink[0].price }}
                </div>
              </template>
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.drink.slice(1)"
            :key="dish.id"
            class="menu-row drink-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
            </div>
            <div class="dish-price frutiger-black">
              <template v-if="dish.hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小</span>
                    <span class="frutiger-black">{{ dish.smallPrice }}</span>
                  </div>
                  <div class="price-item">
                    <span class="size-label">大</span>
                    <span class="frutiger-black">{{ dish.largePrice }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container">
                  {{ dish.price }}
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'

// 根据文本长度决定使用哪个类
const getDishNameClass = (text) => {
  if (!text) return ''
  const length = text.length
  if (length > 15) {
    return 'dish-name-super-long'
  } else if (length > 10) {
    return 'dish-name-extra-long'
  } else if (length > 6) {
    return 'dish-name-long'
  }
  return ''
}

// 定义组件接收的属性
const props = defineProps({
  menuItems: {
    type: Object,
    required: true,
    default: () => ({
      meat: [],
      halfMeat: [],
      vegetable: [],
      staple: [],
      soup: [],
      drink: [],
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  noDataError: {
    type: Boolean,
    default: false,
  },
})

// 获取菜单 store
const menuStore = useMenuStore()

// 倒计时相关逻辑
const countdownTime = ref(menuStore.getRefreshIntervalInSeconds()) // 使用 store 中的刷新间隔
let countdownTimer = null

// 格式化时间为分:秒格式
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' + secs : secs}`
}

// 刷新数据
const refreshData = async () => {
  // 获取当前日期
  const today = new Date().toISOString().split('T')[0]

  // 获取当前菜单类型（从store中获取）
  const menuType = menuStore.currentMenu?.type || 'other'

  // 重新获取数据
  await menuStore.fetchMenu(today, menuType)
  console.log(`[倒计时结束] 重新加载${menuType}菜单`)
}

// 启动倒计时
const startCountdown = () => {
  // 清除可能存在的旧定时器
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }

  // 使用 store 中的刷新间隔
  countdownTime.value = menuStore.getRefreshIntervalInSeconds()

  // 设置新的定时器
  countdownTimer = setInterval(() => {
    if (countdownTime.value > 0) {
      countdownTime.value--
    } else {
      // 时间到，清除定时器
      clearInterval(countdownTimer)

      // 触发刷新
      refreshData()

      // 重新启动倒计时
      startCountdown()
    }
  }, 1000)
}

// 监听错误状态变化
onMounted(() => {
  if (props.error) {
    startCountdown()
  }
})

// 监听props变化
watch(
  () => props.error,
  (newValue) => {
    if (newValue) {
      startCountdown()
    }
  },
)

// 组件卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
@import '../styles/menu.css';

/* 炖汤样式 */
.soup-type,
.soup-item {
  background-color: #fff9ee;
}

/* 主食样式 */
.staple-type,
.staple-item {
  background-color: #da3b31;
}

/* 饮料样式 */
.drink-type,
.drink-item {
  background-color: #fff9ee;
}

/* 价格容器 */
.price-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.price-item {
  display: flex;
  margin-left: 30px;
}

.price-item:first-child {
  margin-left: 0;
}

.size-label {
  font-size: 40px;
  margin-right: 10px;
  font-family: 'AliMama-DongFangDaKai', serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 倒计时样式 */
.countdown {
  margin-top: 20px;
  font-size: 140px;
}

.countdown-time {
  font-weight: bold;
  color: #409eff;
}
</style>
