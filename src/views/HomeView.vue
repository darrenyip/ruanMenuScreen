<template>
  <div class="home">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- Logo 和标题 -->
    <header class="header">
      <!-- <img src="@/assets/images/ruan_logo_white.svg" alt="Logo" class="logo" /> -->
      <h1 class="title">菜单导航</h1>
      <p class="subtitle">选择您要查看的菜单</p>
    </header>

    <!-- 今日菜单区域 -->
    <section class="menu-section">
      <div class="section-header">
        <span class="section-icon">📅</span>
        <h2 class="section-title">今日菜单</h2>
      </div>

      <div class="menu-grid">
        <router-link to="/lunch-menu" class="menu-card lunch">
          <div class="card-icon">🍱</div>
          <div class="card-content">
            <span class="card-title">午餐菜单</span>
            <span class="card-desc">荤菜 · 半荤 · 素菜</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/lunch-menu-2" class="menu-card lunch-combo">
          <div class="card-icon">🍽️</div>
          <div class="card-content">
            <span class="card-title">午餐套餐</span>
            <span class="card-desc">超值套餐组合</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/dinner-menu" class="menu-card dinner">
          <div class="card-icon">🌙</div>
          <div class="card-content">
            <span class="card-title">晚餐菜单</span>
            <span class="card-desc">荤菜 · 半荤 · 素菜</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/dinner-menu-2" class="menu-card dinner-combo">
          <div class="card-icon">✨</div>
          <div class="card-content">
            <span class="card-title">晚餐套餐</span>
            <span class="card-desc">超值套餐组合</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>

      <!-- 其他菜单单独一行 -->
      <div class="menu-grid-single">
        <router-link to="/other-menu" class="menu-card other">
          <div class="card-icon">🥤</div>
          <div class="card-content">
            <span class="card-title">其他菜单</span>
            <span class="card-desc">饮品 · 小食 · 加料</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>
    </section>

    <!-- 明日菜单区域 -->
    <section class="menu-section tomorrow-section">
      <div class="section-header">
        <span class="section-icon">🌅</span>
        <h2 class="section-title">明日菜单</h2>
      </div>

      <div class="menu-grid">
        <router-link to="/lunch-menu-tomorrow" class="menu-card tomorrow lunch-tomorrow">
          <div class="card-icon">🍱</div>
          <div class="card-content">
            <span class="card-title">明日午餐</span>
            <span class="card-desc">荤菜 · 半荤 · 素菜</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/lunch-menu-tomorrow-2" class="menu-card tomorrow lunch-combo-tomorrow">
          <div class="card-icon">🍽️</div>
          <div class="card-content">
            <span class="card-title">明日午餐套餐</span>
            <span class="card-desc">超值套餐组合</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/dinner-menu-tomorrow" class="menu-card tomorrow dinner-tomorrow">
          <div class="card-icon">🌙</div>
          <div class="card-content">
            <span class="card-title">明日晚餐</span>
            <span class="card-desc">荤菜 · 半荤 · 素菜</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>

        <router-link to="/dinner-menu-tomorrow-2" class="menu-card tomorrow dinner-combo-tomorrow">
          <div class="card-icon">✨</div>
          <div class="card-content">
            <span class="card-title">明日晚餐套餐</span>
            <span class="card-desc">超值套餐组合</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>

      <!-- 明日其他单独一行 -->
      <div class="menu-grid-single">
        <router-link to="/other-menu-tomorrow" class="menu-card tomorrow other-tomorrow">
          <div class="card-icon">🥤</div>
          <div class="card-content">
            <span class="card-title">明日其他</span>
            <span class="card-desc">饮品 · 小食 · 加料</span>
          </div>
          <div class="card-arrow">→</div>
        </router-link>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <p>点击卡片进入对应菜单页面</p>
    </footer>
  </div>
</template>

<script setup>
// 首页导航逻辑
</script>

<style scoped>
.home {
  min-height: 100vh;
  height: auto;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 60px 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 背景装饰圆 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
  top: -200px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
  bottom: -100px;
  left: -100px;
  animation: float 15s ease-in-out infinite reverse;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #ffd93d 0%, #ff914d 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.15; }
}

/* 头部 */
.header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
}

.logo {
  width: 200px;
  height: auto;
  margin-bottom: 30px;
  filter: drop-shadow(0 4px 20px rgba(233, 69, 96, 0.3));
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 4px 20px rgba(233, 69, 96, 0.3)); }
  50% { filter: drop-shadow(0 4px 40px rgba(233, 69, 96, 0.5)); }
}

.title {
  font-size: 80px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 15px 0;
  letter-spacing: 8px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  letter-spacing: 4px;
}

/* 菜单区域 */
.menu-section {
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}

.section-icon {
  font-size: 50px;
}

.section-title {
  font-size: 52px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  letter-spacing: 6px;
}

/* 菜单网格 */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 单独一行的网格 */
.menu-grid-single {
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: 40px auto 0 auto;
}

.menu-grid-single .menu-card {
  width: calc(50% - 20px);
}

/* 菜单卡片 */
.menu-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  min-height: 280px;
}

.menu-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-card:hover::before {
  opacity: 1;
}

.menu-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

.card-icon {
  font-size: 70px;
  margin-bottom: 25px;
  transition: transform 0.3s ease;
}

.menu-card:hover .card-icon {
  transform: scale(1.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.card-title {
  font-size: 60px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 3px;
}

.card-desc {
  font-size: 36px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
}

.card-arrow {
  position: absolute;
  bottom: 25px;
  right: 30px;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.menu-card:hover .card-arrow {
  color: #fff;
  transform: translateX(10px);
}

/* 今日菜单卡片颜色 */
.lunch {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.3);
}

.lunch-combo {
  background: linear-gradient(135deg, #ff8c42 0%, #ffb347 100%);
  box-shadow: 0 15px 40px rgba(255, 140, 66, 0.3);
}

.dinner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
}

.dinner-combo {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 15px 40px rgba(168, 85, 247, 0.3);
}

.other {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  box-shadow: 0 15px 40px rgba(17, 153, 142, 0.3);
}

/* 明日菜单卡片 */
.tomorrow {
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.tomorrow:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

.lunch-tomorrow:hover {
  border-color: #ff6b35;
  box-shadow: 0 20px 50px rgba(255, 107, 53, 0.2);
}

.lunch-combo-tomorrow:hover {
  border-color: #ff8c42;
  box-shadow: 0 20px 50px rgba(255, 140, 66, 0.2);
}

.dinner-tomorrow:hover {
  border-color: #667eea;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
}

.dinner-combo-tomorrow:hover {
  border-color: #a855f7;
  box-shadow: 0 20px 50px rgba(168, 85, 247, 0.2);
}

.other-tomorrow:hover {
  border-color: #11998e;
  box-shadow: 0 20px 50px rgba(17, 153, 142, 0.2);
}

/* 明日区域 */
.tomorrow-section {
  padding-top: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 底部 */
.footer {
  text-align: center;
  margin-top: 60px;
  position: relative;
  z-index: 1;
}

.footer p {
  font-size: 26px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  letter-spacing: 2px;
}

/* 入场动画 */
.header {
  animation: fadeInDown 0.5s ease-out;
}

.menu-section:first-of-type {
  animation: fadeInUp 0.4s ease-out 0.1s both;
}

.tomorrow-section {
  animation: fadeInUp 0.4s ease-out 0.2s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 卡片依次入场 */
.menu-card {
  animation: cardIn 0.4s ease-out both;
}

/* 今日菜单卡片动画延迟 */
.menu-section:first-of-type .menu-grid .menu-card:nth-child(1) { animation-delay: 0.1s; }
.menu-section:first-of-type .menu-grid .menu-card:nth-child(2) { animation-delay: 0.15s; }
.menu-section:first-of-type .menu-grid .menu-card:nth-child(3) { animation-delay: 0.2s; }
.menu-section:first-of-type .menu-grid .menu-card:nth-child(4) { animation-delay: 0.25s; }
.menu-section:first-of-type .menu-grid-single .menu-card { animation-delay: 0.3s; }

/* 明日菜单卡片动画延迟 */
.tomorrow-section .menu-grid .menu-card:nth-child(1) { animation-delay: 0.35s; }
.tomorrow-section .menu-grid .menu-card:nth-child(2) { animation-delay: 0.4s; }
.tomorrow-section .menu-grid .menu-card:nth-child(3) { animation-delay: 0.45s; }
.tomorrow-section .menu-grid .menu-card:nth-child(4) { animation-delay: 0.5s; }
.tomorrow-section .menu-grid-single .menu-card { animation-delay: 0.55s; }

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
