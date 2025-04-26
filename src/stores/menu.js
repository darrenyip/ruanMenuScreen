import { defineStore } from 'pinia'
import { menuApi } from '@/api/menu'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    currentMenu: null,
    loading: false,
    error: null,
    lastEditedType: null,
    lastFetchTime: {
      lunch: 0,
      dinner: 0,
      soup: 0,
    },
    autoRefreshController: null, // 用于控制自动刷新
  }),

  actions: {
    async fetchMenu(date, type) {
      // 如果距离上次请求同类型菜单的时间太短（防抖）
      const now = Date.now()
      if (now - this.lastFetchTime[type] < 300) {
        // 300ms内不重复请求
        return this.currentMenu
      }

      try {
        this.lastFetchTime[type] = now // 更新请求时间
        this.loading = true
        this.error = null

        // 使用更新后的API获取菜单数据
        const menuData = await menuApi.fetchMenu(date, type)
        this.currentMenu = {
          ...menuData,
          loadTime: Date.now(),
        }
      } catch (error) {
        this.error = error.message || '获取菜单失败'

        // 设置为空数据
        const emptyItems = {
          meat: [],
          halfMeat: [],
          vegetable: [],
          staple: [],
          soup: [],
          drink: [],
        }

        this.currentMenu = {
          menuId: '',
          date,
          type,
          items: emptyItems,
          loadTime: Date.now(),
        }

        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取最近7天的菜单
     */
    async fetchRecentMenus() {
      try {
        this.loading = true
        this.error = null
        return await menuApi.fetchRecentMenus()
      } catch (error) {
        this.error = error.message || '获取最近菜单失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * 启动自动刷新功能
     * @param {number} interval 刷新间隔，单位为毫秒，默认为3分钟
     */
    startAutoRefresh(interval = 3 * 60 * 1000) {
      // 如果已经有自动刷新控制器，先停止它
      this.stopAutoRefresh()

      // 设置自动刷新
      this.autoRefreshController = menuApi.setupAutoRefresh((menuType, menuData) => {
        // 更新当前菜单数据，只有当当前页面与刷新的菜单类型匹配时才更新
        if (this.currentMenu && this.currentMenu.type === menuType) {
          this.currentMenu = {
            ...menuData,
            loadTime: Date.now(),
          }
          console.log(`[Store] 已更新${menuType}菜单数据`)
        }
      }, interval)

      console.log('已启动自动刷新菜单功能')
    },

    /**
     * 停止自动刷新功能
     */
    stopAutoRefresh() {
      if (this.autoRefreshController) {
        this.autoRefreshController.stop()
        this.autoRefreshController = null
      }
    },
  },
})
