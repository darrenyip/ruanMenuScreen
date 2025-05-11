<template>
  <div class="menu other-menu">
    <MenuHeader />
    <OtherMenuContent
      :menuItems="menuItems"
      :loading="loading"
      :error="error"
      :noDataError="noDataError"
    />
    <MenuFooter />
  </div>
</template>

<script setup>
import { onMounted, computed, onBeforeUnmount } from 'vue'
import { useMenuStore } from '@/stores/menu'
import MenuHeader from '@/components/MenuHeader.vue'
import OtherMenuContent from '@/components/OtherMenuContent.vue'
import MenuFooter from '@/components/MenuFooter.vue'

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
    await menuStore.fetchMenu(today, 'other')
    // 启动自动刷新（每1分钟刷新一次）
    menuStore.startAutoRefresh()
  } catch (err) {
    console.error('加载其他菜单失败:', err)
  }
})

// 组件卸载前停止自动刷新
onBeforeUnmount(() => {
  menuStore.stopAutoRefresh()
})
</script>

<style scoped>
@import '../styles/menu.css';

.other-menu {
  /* 其他菜单特定样式 */
}
</style>
