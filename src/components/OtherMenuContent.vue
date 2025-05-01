<template>
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
        <!-- 炖汤区域 -->
        <template v-if="menuItems.soup && menuItems.soup.length > 0">
          <div class="menu-row soup-type">
            <div class="type-container">
              <div class="type-name title-font">炖汤</div>
              <div class="type-en en-font type-en-pt-2">SOUP</div>
            </div>
            <div class="dish-name alimama-font">{{ menuItems.soup[0].name }}</div>
            <div class="dish-price frutiger-black">
              <template v-if="menuItems.soup[0].hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小份</span>
                    {{ Math.floor(menuItems.soup[0].smallPrice) }}
                  </div>
                  <div class="price-item">
                    <span class="size-label">大份</span>
                    {{ Math.floor(menuItems.soup[0].largePrice) }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container single-price">
                  {{ Math.floor(menuItems.soup[0].price) }}
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
            <div class="dish-name alimama-font">{{ dish.name }}</div>
            <div class="dish-price frutiger-black">
              <template v-if="dish.hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小份</span>
                    {{ Math.floor(dish.smallPrice) }}
                  </div>
                  <div class="price-item">
                    <span class="size-label">大份</span>
                    {{ Math.floor(dish.largePrice) }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container single-price">
                  {{ Math.floor(dish.price) }}
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
            <div class="dish-name alimama-font">{{ menuItems.staple[0].name }}</div>
            <div class="dish-price frutiger-black">
              <template v-if="menuItems.staple[0].hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小份</span>
                    {{ Math.floor(menuItems.staple[0].smallPrice) }}
                  </div>
                  <div class="price-item">
                    <span class="size-label">大份</span>
                    {{ Math.floor(menuItems.staple[0].largePrice) }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container single-price">
                  {{ Math.floor(menuItems.staple[0].price) }}
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
            <div class="dish-name alimama-font">{{ dish.name }}</div>
            <div class="dish-price frutiger-black">
              <template v-if="dish.hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小</span>
                    {{ Math.floor(dish.smallPrice) }}
                  </div>
                  <div class="price-item">
                    <span class="size-label">大</span>
                    {{ Math.floor(dish.largePrice) }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container single-price">
                  {{ Math.floor(dish.price) }}
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
            <div class="dish-name alimama-font">{{ menuItems.drink[0].name }}</div>
            <div class="dish-price frutiger-black">
              <template v-if="menuItems.drink[0].hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小</span>
                    {{ Math.floor(menuItems.drink[0].smallPrice) }}
                  </div>
                  <div class="price-item">
                    <span class="size-label">大</span>
                    {{ Math.floor(menuItems.drink[0].largePrice) }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container single-price">
                  {{ Math.floor(menuItems.drink[0].price) }}
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
            <div class="dish-name alimama-font">{{ dish.name }}</div>
            <div class="dish-price frutiger-black">
              <template v-if="dish.hasMultipleSizes">
                <div class="price-container">
                  <div class="price-item">
                    <span class="size-label">小</span>
                    {{ Math.floor(dish.smallPrice) }}
                  </div>
                  <div class="price-item">
                    <span class="size-label">大</span>
                    {{ Math.floor(dish.largePrice) }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price-container single-price">
                  {{ Math.floor(dish.price) }}
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
import { defineProps } from 'vue'

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

.single-price {
  /* 将单一价格和多规格价格中的"小"价格对齐 */
  padding-right: 120px; /* 调整此值以匹配对齐 */
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
</style>
