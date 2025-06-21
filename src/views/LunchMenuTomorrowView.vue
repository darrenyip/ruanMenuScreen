<template>
  <div class="menu lunch-menu-tomorrow">
    <MenuHeader />
    <MenuContent
      :menuItems="menuItems"
      :loading="loading"
      :error="error"
      :noDataError="noDataError"
      :displayMode="'all'"
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

// 获取明天的日期
const getTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

const tomorrow = getTomorrow()

// 计算属性：获取菜单项（显示所有内容，不做限制）
const menuItems = computed(() => {
  return (
    menuStore.currentMenu?.items || {
      meat: [],
      halfMeat: [],
      vegetable: [],
      staple: [],
      soup: [],
      drink: [],
    }
  )
})

// 计算属性：加载状态
const loading = computed(() => menuStore.loading)

// 计算属性：错误信息
const error = computed(() => menuStore.error)

// 计算属性：是否是"无数据"错误
const noDataError = computed(() => menuStore.noDataError)

// 组件挂载时加载数据（明日菜单不需要自动刷新）
onMounted(async () => {
  try {
    // 先停止任何现有的自动刷新，避免与今日菜单的自动刷新冲突
    menuStore.stopAutoRefresh()
    await menuStore.fetchMenu(tomorrow, 'lunch')
  } catch (err) {
    console.error('加载明天午餐菜单失败:', err)
  }
})

// 组件卸载前清理（明日菜单页面不使用自动刷新）
onBeforeUnmount(() => {
  // 不需要停止自动刷新，因为我们没有启动它
})
</script>

<style scoped>
@import '../styles/menu.css';

.lunch-menu-tomorrow {
  /* 明天午餐菜单特定样式 */
}
</style>
