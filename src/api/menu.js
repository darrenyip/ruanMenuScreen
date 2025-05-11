import pb from '@/api/pocketbase'

/**
 * 获取今日条件的辅助函数
 */
const getTodayCondition = () => {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  // PocketBase 要求使用单引号包裹日期值
  return `date >= '${todayStart.toISOString()}' && date <= '${todayEnd.toISOString()}'`
}

/**
 * 检查当前时间是否在指定的时间范围内
 * @returns {boolean} 如果当前时间在午餐或晚餐时间范围内，则返回true
 */
const isWithinRefreshTimeRanges = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours * 60 + minutes // 转换为分钟计数

  // 定义时间范围（转换为分钟）
  const lunchStart = 10 * 60 // 10:00
  const lunchEnd = 13 * 60 + 30 // 13:30
  const dinnerStart = 16 * 60 // 16:00
  const dinnerEnd = 20 * 60 // 20:00

  // 检查是否在午餐或晚餐时间范围内
  return (
    (currentTime >= lunchStart && currentTime <= lunchEnd) ||
    (currentTime >= dinnerStart && currentTime <= dinnerEnd)
  )
}

/**
 * 根据当前时间判断应该刷新的菜单类型
 * @returns {string|null} 返回应该刷新的菜单类型（'lunch'或'dinner'），如果不在刷新时间范围内则返回null
 */
const getMenuTypeBasedOnTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours * 60 + minutes // 转换为分钟计数

  // 定义时间范围（转换为分钟）
  const lunchStart = 10 * 60 // 10:00
  const lunchEnd = 13 * 60 + 30 // 13:30
  const dinnerStart = 16 * 60 // 16:00
  const dinnerEnd = 20 * 60 // 20:00

  // 判断当前时间段
  if (currentTime >= lunchStart && currentTime <= lunchEnd) {
    return 'lunch'
  } else if (currentTime >= dinnerStart && currentTime <= dinnerEnd) {
    return 'dinner'
  } else {
    return null // 不在刷新时间范围内
  }
}

/**
 * 辅助函数: 按分类组织菜单项
 * @param {Array} menuItems 菜单项数组
 * @returns {Object} 按分类组织的菜单项
 */
function organizeMenuItemsByCategory(menuItems) {
  const result = {
    meat: [],
    halfMeat: [],
    vegetable: [],
    staple: [],
    soup: [],
    drink: [],
  }

  menuItems.forEach((item) => {
    if (item.expand && item.expand.dish) {
      const dish = item.expand.dish
      const category = dish.category

      const displayItem = {
        id: item.id,
        dishId: dish.id,
        name: dish.name,
        price: dish.basePrice,
        hasMultipleSizes: dish.hasMultipleSizes,
        smallPrice: dish.smallPrice,
        largePrice: dish.largePrice,
        sortOrder: item.sortOrder || 9999, // 使用菜品的sortOrder，如果不存在则给一个很大的默认值
      }

      // 确保类别存在，然后添加项目
      if (result[category]) {
        result[category].push(displayItem)
      }
    }
  })

  // 对每个类别的菜品按照sortOrder升序排序
  Object.keys(result).forEach((category) => {
    result[category].sort((a, b) => a.sortOrder - b.sortOrder)
  })

  return result
}

/**
 * 菜单API
 */
export const menuApi = {
  /**
   * 获取指定日期和类型的菜单
   * @param {string} date 日期，格式为YYYY-MM-DD
   * @param {string} type 菜单类型：lunch, dinner,
   * @returns {Promise<Object>} 格式化的菜单数据
   */
  fetchMenu: async (date, type) => {
    try {
      // 将日期转换为开始和结束时间以便匹配
      const startDate = new Date(date)
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date(date)
      endDate.setHours(23, 59, 59, 999)

      // 1. 查找菜单记录 - 使用日期范围查询
      const menuList = await pb.collection('menus').getList(1, 1, {
        filter: `date >= '${startDate.toISOString()}' && date <= '${endDate.toISOString()}' && type='${type}'`,
      })

      if (menuList.items.length === 0) {
        // 修改：创建特殊的NoMenuDataError，而不是普通的Error
        const error = new Error(`没有找到${date}的${type}菜单`)
        error.isNoDataError = true
        throw error
      }

      const menu = menuList.items[0]
      console.log('找到菜单:', menu)

      // 2. 查找该菜单下的所有菜单项，并包含菜品信息
      const menuItems = await pb.collection('menu_items').getFullList({
        filter: `menu='${menu.id}'`,
        expand: 'dish',
      })

      // 3. 按类别组织数据
      const organizedItems = organizeMenuItemsByCategory(menuItems)

      // 4. 返回格式化的菜单数据
      return {
        menuId: menu.id,
        date: date, // 使用原始请求的日期，而不是数据库中的完整时间戳
        type: menu.type,
        items: organizedItems,
      }
    } catch (error) {
      console.error(`获取${type}菜单失败:`, error)
      throw error
    }
  },

  /**
   * 获取最近7天的菜单
   * @returns {Promise<Array>} 菜单列表
   */
  fetchRecentMenus: async () => {
    try {
      // 获取7天前的日期
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const dateStr = sevenDaysAgo.toISOString().split('T')[0]

      // 获取最近7天的菜单
      return pb.collection('menus').getFullList({
        filter: `date >= '${dateStr}'`,
        sort: '-date,type',
      })
    } catch (error) {
      console.error('获取最近菜单失败:', error)
      throw error
    }
  },

  /**
   * 设置定时刷新菜单的功能
   * @param {Function} callback 刷新菜单后的回调函数，接收参数：menuType, menuData
   * @param {number} interval 刷新间隔，单位为毫秒，默认为1分钟
   * @returns {object} 包含停止定时刷新的方法
   */
  setupAutoRefresh: (callback, interval = 1 * 60 * 1000) => {
    let timerId = null
    let consecutiveErrors = 0
    const maxConsecutiveErrors = 3
    let currentInterval = interval
    const errorRetryInterval = 5 * 1000 // 错误重试间隔（5秒）

    // 刷新菜单的函数
    const refreshMenu = async () => {
      const menuType = getMenuTypeBasedOnTime()

      // 只在指定时间范围内进行刷新
      if (menuType) {
        try {
          // 获取当前日期
          const today = new Date().toISOString().split('T')[0]

          // 获取菜单数据
          const menuData = await menuApi.fetchMenu(today, menuType)

          // 请求成功，重置错误计数和刷新间隔
          consecutiveErrors = 0
          currentInterval = interval

          // 执行回调
          if (typeof callback === 'function') {
            callback(menuType, menuData)
          }

          console.log(`[${new Date().toLocaleTimeString()}] 自动刷新${menuType}菜单成功`)

          // 请求成功后，重置定时器为正常间隔（1分钟）
          if (timerId !== null) {
            clearInterval(timerId)
            timerId = setInterval(refreshMenu, currentInterval)
          }
        } catch (error) {
          console.error(`[${new Date().toLocaleTimeString()}] 自动刷新菜单失败:`, error)

          // 如果是"无数据"错误
          if (error.isNoDataError) {
            consecutiveErrors++

            // 根据连续错误次数增加刷新间隔
            if (consecutiveErrors > maxConsecutiveErrors) {
              // 如果连续多次出现"无数据"，延长刷新间隔（比如15分钟）
              if (currentInterval !== 15 * 60 * 1000) {
                currentInterval = 15 * 60 * 1000
                console.log(
                  `[${new Date().toLocaleTimeString()}] 连续多次无菜单数据，延长刷新间隔至15分钟`,
                )

                // 更新定时器
                if (timerId !== null) {
                  clearInterval(timerId)
                  timerId = setInterval(refreshMenu, currentInterval)
                }
              }
            }
          } else {
            // 对于其他类型的错误，设置短时间重试（5秒）
            currentInterval = errorRetryInterval
            console.log(`[${new Date().toLocaleTimeString()}] 请求失败，将在5秒后重试`)

            // 更新定时器
            if (timerId !== null) {
              clearInterval(timerId)
              timerId = setInterval(refreshMenu, currentInterval)
            }
          }
        }
      }
    }

    // 立即执行一次刷新
    refreshMenu()

    // 设置定时器
    timerId = setInterval(refreshMenu, currentInterval)

    // 返回用于停止定时刷新的方法
    return {
      stop: () => {
        if (timerId !== null) {
          clearInterval(timerId)
          timerId = null
          console.log('已停止自动刷新菜单')
        }
      },
    }
  },
}
