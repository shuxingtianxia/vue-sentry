<template>
  <div class="d2-layout-header-aside-group" :style="styleLayoutMainGroup" :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div class="d2-theme-header" flex-box="0" flex>
        <router-link
          to="/index"
          :class="{'logo-group': true, 'logo-transition': asideTransition}"
          :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
          flex-box="0"
        >
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </router-link>
        <div class="toggle-aside-btn" flex-box="0" @click="handleToggleAside">
          <d2-icon name="bars" />
        </div>
        <d2-header-breadcrumb class="breadcrumb" flex-box="0"></d2-header-breadcrumb>
        <div flex-box="1"></div>
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <d2-header-log />
          <d2-header-fullscreen />
          <d2-header-theme />
          <d2-header-size />
          <d2-header-locales />
          <!-- <d2-header-color /> -->
          <d2-header-user />
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          ref="aside"
          flex-box="0"
          :class="{'d2-theme-container-aside': true, 'd2-theme-container-transition': asideTransition}"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth
          }"
        >
          <d2-menu-side />
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs />
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''" mode="out-in">
                  <keep-alive :include="keepAlive">
                    <router-view :key="routerViewKey" />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from './components/menu-side'
import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderLocales from './components/header-locales'
import d2HeaderSize from './components/header-size'
import d2HeaderTheme from './components/header-theme'
import d2HeaderUser from './components/header-user'
import d2HeaderLog from './components/header-log'
// import d2HeaderColor from './components/header-color'
import d2HeaderBreadcrumb from './components/header-breadcrumb'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'D2LayoutHeaderAside',
  components: {
    d2MenuSide,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderLocales,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLog,
    // d2HeaderColor,
    d2HeaderBreadcrumb
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState({
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      asideTransition: state => state.menu.asideTransition
    }),
    ...mapGetters({
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey() {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
      return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return this.themeActiveSetting.backgroundImage ? { backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')` } : {}
    }
  },
  methods: {
    ...mapActions('menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
.d2-theme-container-main-body {
  background: #fff;
  padding: 16px;
  margin-right: 20px;
}
</style>
