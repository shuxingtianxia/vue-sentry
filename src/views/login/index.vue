<template>
  <div class="login">
    <div>
      <div class="content">
        <div class="loginBtn" @click="clickShowLogin">
          登录
        </div>
      </div>
      <div class="footer">
        <ul class="ul">
          <li class="item">
            <img class="left" src="@/assets/images/icon_news1@2x.png" alt="">
            <div class="right">
              <p class="text">
                坚持技术创新...
              </p>
              <p class="btn">
                详情
                <i></i>
              </p>
            </div>
          </li>
          <li class="item">
            <img class="left" src="@/assets/images/icon_news2@2x.png" alt="">
            <div class="right">
              <p class="text">
                安世半导体成...
              </p>
              <p class="btn">
                详情
                <i></i>
              </p>
            </div>
          </li>
          <li class="item">
            <img class="left" src="@/assets/images/icon_news3@2x.png" alt="">
            <div class="right">
              <p class="text">
                闻泰科技助力T...
              </p>
              <p class="btn">
                详情
                <i></i>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <login :dialog.sync="dialog" :image="image"></login>
  </div>
</template>
<script>
import Login from './login.vue'
export default {
  name: '',
  components: {
    Login
  },
  data() {
    return {
      dialog: false,
      image: ''
    }
  },

  methods: {
    clickShowLogin() {
      this.dialog = true
    }
  }
}
</script>
<style lang='scss' scoped>
.login {
  position: relative;
  height: 100%;
  background: url('~@/assets/images/img_home.png') no-repeat center;
  .content {
    height: 100%;
    position: relative;
    width: 1203px;
    margin: auto;
    .loginBtn {
      position: absolute;
      left: 0;
      top: 438px;
      width: 112px;
      height: 40px;
      border: 2px solid #FFFFFF;
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 132px;
    background: #08254F;
    opacity: 0.95;
    .ul {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .item {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 700;
        color: white;
        list-style: none;
        &::after {
          content: '';
          width: 2px;
          height: 20px;
          opacity: 0.2;
          background: #fff;
          border-radius: 1px;
          margin-left: 63px;
          margin-right: 78px;
        }
        &:last-child::after {
          display: none;
        }
        .left {
          width: 48px;
          height: 48px;
          margin-right: 21px;
        }
        .right {
          .btn {
            font-size: 12px;
            i {
              display: inline-block;
              width: 12px;
              height: 12px;
              margin-left: 6px;
              background: url('~@/assets/images/icon_next@2x.png') no-repeat center;
              background-size: cover;
            }
          }
        }
      }
    }
  }
}
</style>
