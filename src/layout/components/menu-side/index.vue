<template>
  <div class="d2-layout-header-aside-menu-side">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="asideCollapse"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="asideTransition"
        :router="true"
        mode="vertical"
      >
        <sidebar-item v-for="route in asideRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapState('menu', [
      'asideCollapse',
      'asideTransition'
    ]),
    // 获取侧边菜单
    ...mapGetters([
      'asideRoutes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  ::v-deep .el-scrollbar__wrap {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
