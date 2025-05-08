import { defineStore } from 'pinia'
import { menuApi } from '@/api/menu'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    currentMenu: null,
    loading: false,
    error: null,
    noDataError: false, // 新增标志：是否是"无数据"错误
    lastEditedType: null,
    lastFetchTime: {
      lunch: 0,
      dinner: 0,
      other: 0,
    },
    autoRefreshController: null, // 用于控制自动刷新
    refreshInterval: 3 * 60 * 1000, // 默认刷新间隔（3分钟）
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
        this.noDataError = false // 重置无数据错误标志

        // 使用更新后的API获取菜单数据
        const menuData = await menuApi.fetchMenu(date, type)
        this.currentMenu = {
          ...menuData,
          loadTime: Date.now(),
        }
      } catch (error) {
        console.error(`菜单加载失败: ${error.message}`)

        // 区分"无数据"错误和其他错误
        if (error.isNoDataError) {
          this.error = `暂无${date}的${type}菜单数据`
          this.noDataError = true
        } else {
          this.error = `无法加载菜单数据: ${error.message}`
          this.noDataError = false
        }

        // 设置一个空的菜单结构，确保UI不会崩溃
        this.currentMenu = {
          menuId: '',
          date,
          type,
          items: {
            meat: [],
            halfMeat: [],
            vegetable: [],
            staple: [],
            soup: [],
            drink: [],
          },
          loadTime: Date.now(),
        }
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
        this.noDataError = false
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
      // 保存刷新间隔
      this.refreshInterval = interval

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

          // 清除之前的错误
          this.error = null
          this.noDataError = false

          console.log(`[Store] 已更新${menuType}菜单数据`)
        }
      }, interval)

      console.log('已启动自动刷新菜单功能')
    },

    /**
     * 获取当前设置的刷新间隔（单位：秒）
     */
    getRefreshIntervalInSeconds() {
      return Math.floor(this.refreshInterval / 1000)
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
