<template>
  <div class="errPage-container">
    <div class="jumpBtn">
      <el-button class="toSSO" round @click="toSSO">
        <!-- <a :href="$config.ssoUrl">返回SSO首页</a> -->
        返回SSO首页
      </el-button>
      <el-button class="toPermission" round @click="toApply">
        <!-- <a href="https://oa.wingtech.com/"> 去申请权限</a> -->
        去申请权限
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoPermission',
  methods: {
    toSSO() {
      window.location.href = this.$config.ssoUrl
    },
    toApply() {
      window.location.href = 'https://oa.wingtech.com/'
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.errPage-container{
  width: 1920px;
  height: 937px;
  background-image: url('~@/assets/images/img_bg.png');
}
.toPermission{
  position: absolute;
  top: 650px;
  left: 975px;
  height: 48px;
  width:202px;
  border:1px solid #E60012;
  color: #E60012;
  font-size: 16px;
}
.toSSO{
  position: absolute;
  top: 650px;
  left: 743px;
  height: 48px;
  width:202px;
  background: #E60012;
  color: white;
  font-size: 16px;
}
</style>
