<template>
  <div v-if="dialog" class="dialog-wrapper">
    <div class="dialog">
      <div class="left"></div>
      <div class="right">
        <template v-if="isLogin">
          <h3>账号登录</h3>
          <p class="welcome">
            欢迎登录 ”闻泰 · 物流系统”
          </p>
          <!-- 输入回车键会自动触发登录函数 -->
          <el-form ref="form" key="form" class="form" :model="form" :rules="rules" @keyup.enter.native="clickLogin">
            <el-form-item prop="email">
              <el-input v-model="form.email" placeholder="请输入账号" @focus="handleFocus" @blur="handleBlur">
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-default"
                  src="@/assets/images/login/icon_account@2x.png"
                >
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-success"
                  src="@/assets/images/login/icon1_account.png"
                >
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-error"
                  src="@/assets/images/login/icon4_account.png"
                >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" :type="isShowPwd ? 'text' : 'password'" @focus="handleFocus" @blur="handleBlur">
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-default"
                  src="@/assets/images/login/icon_passwprd@2x.png"
                >
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-success"
                  src="@/assets/images/login/icon2_passwprd.png"
                >
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-error"
                  src="@/assets/images/login/icon5_passwprd.png"
                >
                <img
                  slot="suffix"
                  class="el-icon-edit el-input__icon icon-img show-pwd"
                  :src="isShowPwd ? showPwdImg : hidePwdImg "
                  @click="showPwd"
                >
              </el-input>
            </el-form-item>
            <el-form-item prop="checkCode">
              <div class="code">
                <el-input v-model="form.checkCode" class="code-input" placeholder="输入验证码" :maxlength="4" @focus="handleFocus" @blur="handleBlur">
                  <img
                    slot="prefix"
                    class="el-icon-edit el-input__icon icon-img icon-default"
                    src="@/assets/images/login/icon_passwprd@2x(1).png"
                  >
                  <img
                    slot="prefix"
                    class="el-icon-edit el-input__icon icon-img icon-success"
                    src="@/assets/images/login/icon3_verification.png"
                  >
                  <img
                    slot="prefix"
                    class="el-icon-edit el-input__icon icon-img icon-error"
                    src="@/assets/images/login/icon6_verification.png"
                  >
                </el-input>
                <img class="img" :src="image" alt="" @click="getCode()">
              </div>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button class="btn" @click="clickLogin">
                登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <p class="forget" @click="isLogin = false">
                忘记密码?
              </p>
            </el-form-item>
          </el-form>
        </template>
        <template v-else>
          <h3 class="forget-pwd">
            忘记密码
          </h3>
          <el-form ref="form1" key="form1" class="form forget" :model="form1" :rules="rules1" @keyup.enter.native="clickForget">
            <el-form-item prop="email">
              <el-input v-model="form1.email" placeholder="请输入账号" @focus="handleFocus" @blur="handleBlur">
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-default"
                  src="@/assets/images/login/icon_account@2x.png"
                >
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-success"
                  src="@/assets/images/login/icon1_account.png"
                >
                <img
                  slot="prefix"
                  class="el-icon-edit el-input__icon icon-img icon-error"
                  src="@/assets/images/login/icon4_account.png"
                >
              </el-input>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button class="btn" @click="clickForget">
                确认找回
              </el-button>
            </el-form-item>
            <el-form-item>
              <p class="to-login" @click="isLogin = true">
                去登录
              </p>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <div class="close">
        <span @click="close"></span>
      </div>
    </div>
  </div>
</template>
<script>
import hidePwdImg from '@/assets/images/login/icon_hide@2x.png'
import showPwdImg from '@/assets/images/login/icon_show.png'
export default {
  name: '',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowPwd: false,
      isLogin: true,
      hidePwdImg,
      showPwdImg,
      image: '', // 验证码
      form: {
        email: 'admin',
        password: 'cb8^VfCWFn#gmRabu'
      },
      rules: {
        email: [
          { required: true, message: '请输入账号', trigger: 'blur' }

        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      form1: {
        email: ''
      },
      rules1: {
        email: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      },
      id: Date.now()
    }
  },
  created() {
    // 获取验证码
    this.getCode()
  },
  methods: {
    // 获取验证码
    getCode() {
      this.$api.checkCode(this.id).then(res => {
        this.image = window.URL.createObjectURL(res)
      })
    },
    // 查看密码
    showPwd() {
      this.isShowPwd = !this.isShowPwd
    },
    // 登录
    clickLogin() {
      this.form.id = this.id
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('account/login', this.form).then(res => {
            if (res.code === 200) {
              this.$router.push({ path: '/' })
            } else {
              this.getCode()
              this.form.checkCode = ''
            }
          })
        } else {
          return false
        }
      })
    },
    // 忘记密码
    // clickForget() {
    //   this.$refs.form1.validate(valid => {
    //     if (valid) {
    //       forget(this.form1).then(res => {
    //         if (res.code === 200) {
    //           this.$message.success('密码已发到您的邮箱，请查看')
    //         }
    //       })
    //     } else {
    //       return false
    //     }
    //   })
    // },
    // 获得焦点
    handleFocus(event) {
      event.target.parentElement.classList.add('is-focus')
    },
    // 失去焦点
    handleBlur(event) {
      event.target.parentElement.classList.remove('is-focus')
    },
    // 关闭弹窗
    close() {
      this.$emit('update:dialog', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.dialog-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1000;
}
.dialog {
  position: relative;
  width: 970px;
  height: 600px;
  display: flex;
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  .left {
    width: 496px;
    background: url('~@/assets/images/login/img_login.png');
    height: 100%;
    border-radius: 12px 0 0 12px;
  }
  .right {
    width: 494px;
    height: 100%;
    background: #EEF5FF;
    padding: 129px 124px 102px 64px;
    box-sizing: border-box;
    border-radius: 0 12px 12px 0;
    h3 {
      color: #08254F;
      font-size: 26px;
      font-weight: bold;
    }
    >p {
      color: #2079FF;
      font-size: 13px;
    }
    .form {
      width: 286px;
      margin-top: 43px;
      ::v-deep .el-input__inner {
        height: 40px;
        padding-left: 45px;
      }
      .code {
        display: flex;
        justify-content: space-between;
        ::v-deep .el-input__inner {
          width: 141px;
        }
        .img {
          display: inline-block;
          width: 128px;
          height: 40px;
          cursor: pointer;
        }
      }
      .login-btn {
        margin-bottom: 0px;
      }
      .btn {
        width: 100%;
        height: 40px;
        color: #fff;
        font-size: 14px;
        background: #2079FF;
        border-radius: 4px;
      }
      .forget {
        font-size: 12px;
        color: #8F8F8F;
        cursor: pointer;
      }
    }
    // 忘记密码
    .forget-pwd {
      margin-top: 56px;
    }
    .forget {
      .to-login {
        margin-top: 8px;
        color: #2079FF;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
  .close {
    position: absolute;
    right: 39px;
    top: 56px;
    span {
      display: inline-block;
      font-size: 18px;
      width: 16px;
      height: 16px;
      background: url('~@/assets/images/login/icon_delete@2x.png');
      background-size: cover;
      cursor: pointer;
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 32px;
}
.el-form-item:last-child {
  margin-bottom: 0;
}
::v-deep .el-form-item__error {
  right: 16px;
  left: auto;
  margin-top: 4px;
}
// 获得焦点
.is-focus {
  .icon-error {
    display: none;
  }
  .icon-default {
    display: none;
  }
  .icon-success {
    display: block;
  }
}
// 错误提示
.is-error {
  .icon-error {
    display: block;
  }
  .icon-default {
    display: none;
  }
  .icon-success {
    display: none;
  }
}
.icon-error {
  display: none;
}
.icon-success {
  display: none;
}
// 获得焦点

.icon-img {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin: 11px 11px;
}
// 显示密码
.show-pwd {
  cursor: pointer;
}
</style>
