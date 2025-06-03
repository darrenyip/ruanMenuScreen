<template>
  <div class="menu dinner-menu-2">
    <MenuHeader />
    <MenuContent
      :menuItems="menuItems"
      :loading="loading"
      :error="error"
      :noDataError="noDataError"
      :displayMode="displayMode"
    />
    <MenuFooter />
  </div>
</template>

<script setup>
import { onMounted, computed, onBeforeUnmount } from 'vue'
import { useMenuStore } from '@/stores/menu'
import MenuHeader from '@/components/MenuHeader.vue'
import MenuContent from '@/components/MenuContent.vue'
import MenuFooter from '@/components/MenuFooter.vue'

const menuStore = useMenuStore()

// 获取当前日期
const today = new Date().toISOString().split('T')[0]

// 计算总菜品数量
const totalDishCount = computed(() => {
  const menu = menuStore.currentMenu?.items || {}
  const meatCount = menu.meat?.length || 0
  const halfMeatCount = menu.halfMeat?.length || 0
  const vegetableCount = menu.vegetable?.length || 0
  return meatCount + halfMeatCount + vegetableCount
})

// 计算显示模式
const displayMode = computed(() => {
  if (totalDishCount.value > 12) {
    return 'vegetableOnly' // 第二屏只显示素菜
  }
  return 'all' // 显示所有菜品
})

// 计算属性：获取菜单项
const menuItems = computed(() => {
  const items = menuStore.currentMenu?.items || {
    meat: [],
    halfMeat: [],
    vegetable: [],
    staple: [],
    soup: [],
    drink: [],
  }

  // 如果总数超过12个，第二屏只显示素菜
  if (totalDishCount.value > 12) {
    return {
      ...items,
      meat: [],
      halfMeat: [],
    }
  }

  return items
})

// 计算属性：加载状态
const loading = computed(() => menuStore.loading)

// 计算属性：错误信息
const error = computed(() => menuStore.error)

// 计算属性：是否是"无数据"错误
const noDataError = computed(() => menuStore.noDataError)

// 组件挂载时加载数据并启动自动刷新
onMounted(async () => {
  try {
    await menuStore.fetchMenu(today, 'dinner')
    // 启动自动刷新（每1分钟刷新一次）
    menuStore.startAutoRefresh()
  } catch (err) {
    console.error('加载晚餐菜单失败:', err)
  }
})

// 组件卸载前停止自动刷新
onBeforeUnmount(() => {
  menuStore.stopAutoRefresh()
})
</script>

<style scoped>
@import '../styles/menu.css';

.dinner-menu-2 {
  /* 晚餐菜单第二屏特定样式 */
}
</style>
