<template>
  <div class="menu lunch-menu">
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

// 显示模式：显示所有常规菜品
const displayMode = computed(() => 'all')

// 计算属性：获取菜单项（不包括套餐）
const menuItems = computed(() => {
  const items = menuStore.currentMenu?.items || {
    meat: [],
    halfMeat: [],
    vegetable: [],
    staple: [],
    soup: [],
    drink: [],
    combo: [],
  }

  // 返回除套餐外的所有菜品
  return {
    meat: items.meat || [],
    halfMeat: items.halfMeat || [],
    vegetable: items.vegetable || [],
    staple: items.staple || [],
    soup: items.soup || [],
    drink: items.drink || [],
  }
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
    await menuStore.fetchMenu(today, 'lunch')
    // 启动自动刷新（每1分钟刷新一次）
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

.lunch-menu {
  /* 午餐菜单特定样式 */
}
</style>
