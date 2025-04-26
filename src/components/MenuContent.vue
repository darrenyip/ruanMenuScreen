<template>
  <div class="menu-content">
    <div v-if="loading" class="loading body-font">加载中...</div>
    <div v-else-if="error" class="error body-font">{{ error }}</div>
    <template v-else>
      <div class="menu-grid">
        <!-- 荤菜区域 -->
        <template v-if="menuItems.meat && menuItems.meat.length > 0">
          <div class="menu-row meat-type">
            <div class="type-container">
              <div class="type-name title-font">荤菜</div>
              <div class="type-en en-font type-en-pt-2">MEAT</div>
            </div>
            <div class="dish-name alimama-font">{{ menuItems.meat[0].name }}</div>
            <div class="dish-price frutiger-black">{{ Math.floor(menuItems.meat[0].price) }}</div>
          </div>

          <div
            v-for="(dish, index) in menuItems.meat.slice(1)"
            :key="dish.id"
            class="menu-row meat-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font">{{ dish.name }}</div>
            <div class="dish-price frutiger-black">{{ Math.floor(dish.price) }}</div>
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
            <div class="dish-name alimama-font">{{ menuItems.halfMeat[0].name }}</div>
            <div class="dish-price frutiger-black">
              {{ Math.floor(menuItems.halfMeat[0].price) }}
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.halfMeat.slice(1)"
            :key="dish.id"
            class="menu-row half-meat-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font">{{ dish.name }}</div>
            <div class="dish-price frutiger-black">{{ Math.floor(dish.price) }}</div>
          </div>
        </template>

        <!-- 素菜区域 -->
        <template v-if="menuItems.vegetable && menuItems.vegetable.length > 0">
          <div class="menu-row vege-type">
            <div class="type-container">
              <div class="type-name title-font">素菜</div>
              <div class="type-en en-font type-en-pt-2">VEGGIE</div>
            </div>
            <div class="dish-name alimama-font">{{ menuItems.vegetable[0].name }}</div>
            <div class="dish-price frutiger-black">
              {{ Math.floor(menuItems.vegetable[0].price) }}
            </div>
          </div>

          <div
            v-for="(dish, index) in menuItems.vegetable.slice(1)"
            :key="dish.id"
            class="menu-row vege-item"
          >
            <div class="type-container"></div>
            <div class="dish-name alimama-font">{{ dish.name }}</div>
            <div class="dish-price frutiger-black">{{ Math.floor(dish.price) }}</div>
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
})
</script>

<style scoped>
@import '../styles/menu.css';
</style>
