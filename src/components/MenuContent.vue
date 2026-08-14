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
        <!-- 荤菜区域 -->
        <template v-if="menuItems.meat && menuItems.meat.length > 0">
          <div class="menu-row meat-type">
            <div class="type-container">
              <div class="type-name title-font">荤菜</div>
              <div class="type-en en-font type-en-pt-2">MEAT</div>
            </div>
            <div class="dish-name alimama-font" :class="getDishNameClass(menuItems.meat[0].name)">
              {{ menuItems.meat[0].name }}
              <img
                v-if="menuItems.meat[0].isSam"
                :src="samsLogo"
                class="sams-logo"
                alt="山姆会员店"
              />
            </div>
            <div class="dish-price frutiger-black">{{ menuItems.meat[0].price }}</div>
          </div>

          <div
            v-for="(dish, index) in menuItems.meat.slice(1)"
            :key="dish.id"
            class="menu-row meat-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
              <img v-if="dish.isSam" :src="samsLogo" class="sams-logo" alt="山姆会员店" />
            </div>
            <div class="dish-price frutiger-black">{{ dish.price }}</div>
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
            <div
              class="dish-name alimama-font"
              :class="getDishNameClass(menuItems.halfMeat[0].name)"
            >
              {{ menuItems.halfMeat[0].name }}
              <img
                v-if="menuItems.halfMeat[0].isSam"
                :src="samsLogo"
                class="sams-logo"
                alt="山姆会员店"
              />
            </div>
            <div class="dish-price frutiger-black">
              {{ menuItems.halfMeat[0].price }}
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.halfMeat.slice(1)"
            :key="dish.id"
            class="menu-row half-meat-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
              <img v-if="dish.isSam" :src="samsLogo" class="sams-logo" alt="山姆会员店" />
            </div>
            <div class="dish-price frutiger-black">{{ dish.price }}</div>
          </div>
        </template>

        <!-- 素菜区域 -->
        <template v-if="menuItems.vegetable && menuItems.vegetable.length > 0">
          <div class="menu-row vege-type">
            <div class="type-container">
              <div class="type-name title-font">素菜</div>
              <div class="type-en en-font type-en-pt-2">VEGGIE</div>
            </div>
            <div
              class="dish-name alimama-font"
              :class="getDishNameClass(menuItems.vegetable[0].name)"
            >
              {{ menuItems.vegetable[0].name }}
              <img
                v-if="menuItems.vegetable[0].isSam"
                :src="samsLogo"
                class="sams-logo"
                alt="山姆会员店"
              />
            </div>
            <div class="dish-price frutiger-black">
              {{ menuItems.vegetable[0].price }}
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.vegetable.slice(1)"
            :key="dish.id"
            class="menu-row vege-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
              <img v-if="dish.isSam" :src="samsLogo" class="sams-logo" alt="山姆会员店" />
            </div>
            <div class="dish-price frutiger-black">{{ dish.price }}</div>
          </div>
        </template>

        <!-- 套餐区域 -->
        <template v-if="menuItems.combo && menuItems.combo.length > 0">
          <div class="menu-row combo-type">
            <div class="type-container">
              <div class="type-name title-font">套餐</div>
              <div class="type-en en-font type-en-pt-2">COMBO</div>
            </div>
            <div
              class="dish-name alimama-font"
              :class="getDishNameClass(menuItems.combo[0].name)"
            >
              {{ menuItems.combo[0].name }}
            </div>
            <div class="dish-price frutiger-black">
              {{ menuItems.combo[0].price }}
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.combo.slice(1)"
            :key="dish.id"
            class="menu-row combo-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font" :class="getDishNameClass(dish.name)">
              {{ dish.name }}
            </div>
            <div class="dish-price frutiger-black">{{ dish.price }}</div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'
import samsLogo from '@/assets/images/sams.jpg'

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
      combo: [],
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
  displayMode: {
    type: String,
    default: 'all',
    validator: (value) => ['all', 'comboOnly'].includes(value),
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
  const menuType = menuStore.currentMenu?.type || 'lunch'

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

.error {
  text-align: center;
  padding: 2rem;
  color: #f56c6c;
}

.no-data-hint {
  margin-top: 1rem;
  color: #909399;
}

.countdown {
  margin-top: 20px;
  font-size: 140px;
}

.countdown-time {
  font-weight: bold;
  color: #409eff;
}

/* 山姆会员店 logo 样式 */
.sams-logo {
  display: inline-block;
  width: 140px;
  height: auto;
  margin-left: 10px;
  vertical-align: middle;
  position: relative;
  top: -2px;
}

/* 针对较长菜名的调整 */
.dish-name-long .sams-logo,
.dish-name-extra-long .sams-logo,
.dish-name-super-long .sams-logo {
  width: 50px;
}

/* 确保图片加载时不会导致布局跳动 */
.dish-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
