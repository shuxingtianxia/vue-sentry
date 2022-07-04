<template>
  <!-- 用户编辑页面 -->
  <div class="add">
    <div class="button-div">
      <wt-button-mult style="margin: 18px 0 0 30px" :button-arr="buttonArr" @clickBtn="clickBtn"></wt-button-mult>
    </div>
    <div>
      <p class="title-style">
        <i class="el-icon-s-custom icon header-icon"></i>基本信息
      </p>
      <WtFormPanel ref="wtFormPanel" :data-source="dataSource" :options="options" :fields="fields">
        <template v-slot:stage>
          <el-select v-model="stageValue" disabled style="width: 100%">
          </el-select>
        </template>
        <template v-slot:state>
          <el-select v-model="stateValue" disabled style="width: 100%">
            <el-option :value="0" :label="'正常'">
            </el-option>
          </el-select>
        </template>
      </WtFormPanel>
      <hr align="center" class="hr-style">
      <WtFormPanel ref="wtInfoForm" :data-source="dataSource" :options="options" :fields="fieldsInfo"></WtFormPanel>
      <hr align="center" class="hr-style">
      <WtFormPanel ref="wtAssessmentForm" :data-source="dataSource" :options="options" :fields="fieldsAssessment"></WtFormPanel>
    </div>
    <div>
      <p class="title-style">
        <i class="el-icon-s-custom icon header-icon"></i>项目流程遵从度
      </p>
      <p class="compliance-style">
        <span style="color:#409eff; font-size:18px;"><i class="el-icon-star-on icon header-icon"></i></span>当前项目总体流程遵从度：0%
      </p>
      <el-collapse v-model="activeNames">
        <!-- 需求评审 面板 -->
        <el-collapse-item class="left-margin" title="需求评审" name="3">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">①</span> 需求评审
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="rrRequired" @change="isRequired('rr')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="rrAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="rrAttachmentFields">
            <template v-slot:rrRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  评审后需求清单
                </p>
                <el-radio-group v-model="rrRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  需求分析报告
                </p>
                <el-radio-group v-model="rrRadioTwo">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
        <!-- 立项评审 面板 -->
        <el-collapse-item class="left-margin" title="立项评审" name="4">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">②</span> 立项评审
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="prRequired" @change="isRequired('pr')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="prAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="prAttachmentFields">
            <template v-slot:prRadioOne>
              <div class="file-divs">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  立项报告（含计划、项目组、预算）
                </p>
                <el-radio-group v-model="prRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
        <!-- 解决方案评审 面板 -->
        <el-collapse-item class="left-margin" title="解决方案评审" name="5">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">③</span> 解决方案评审
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="srRequired" @change="isRequired('sr')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="srAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="srAttachmentFields">
            <template v-slot:srRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  需求规格说明书
                </p>
                <el-radio-group v-model="srRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  原型图
                </p>
                <el-radio-group v-model="srRadioTwo">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
        <!-- 开发阶段 面板 -->
        <el-collapse-item class="left-margin" title="开发阶段" name="6">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">④</span> 开发阶段
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="dpRequired" @change="isRequired('dp')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="dpAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="dpAttachmentFields">
            <template v-slot:dpRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  数据库设计
                </p>
                <el-radio-group v-model="dpRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  开发文档设计
                </p>
                <el-radio-group v-model="dpRadioTwo">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  系统部署说明
                </p>
                <el-radio-group v-model="dpRadioTherr">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
        <!-- QAS测试 面板 -->
        <el-collapse-item class="left-margin" title="QAS测试" name="7">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">⑤</span> QAS测试
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="qasRequired" @change="isRequired('qas')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="qasAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="qasTestAttachmentFields">
            <template v-slot:qasRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  测试报告
                </p>
                <el-radio-group v-model="qasRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  系统测试用例
                </p>
                <el-radio-group v-model="qasRadioTwo">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
        <!-- UAT测试 面板 -->
        <el-collapse-item class="left-margin" title="UAT测试" name="8">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">⑥</span> UAT测试
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="uatRequired" @change="isRequired('uat')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="uatAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="uatTestAttachmentFields">
            <template v-slot:uatRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  UAT测试报告
                </p>
                <el-radio-group v-model="uatRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  用户操作手册
                </p>
                <el-radio-group v-model="uatRadioTwo">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  上线检查单
                </p>
                <el-radio-group v-model="uatRadioTherr">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
        <!-- 上线评审 面板 -->
        <el-collapse-item class="left-margin" title="上线评审" name="9">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">⑦</span> 上线评审
            </p>
          </template>
          <div style="margin: 0 0 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="lrRequired" @change="isRequired('lr')">
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <WtFormPanel ref="lrAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="lrAttachmentFields">
            <template v-slot:lrRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  上线评审报告
                </p>
                <el-radio-group v-model="lrRadioOne">
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
              </div>
            </template>
          </WtFormPanel>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { buttonArr, fields, fieldsInfo, fieldsAssessment, rrAttachmentFields, prAttachmentFields, srAttachmentFields, dpAttachmentFields, qasTestAttachmentFields, uatTestAttachmentFields, lrAttachmentFields } from './config/add'
export default {
  name: 'InfoAdd',
  components: {
  },
  data() {
    return {
      activeNames: [],
      stageValue: '需求评审',
      stageKey: '0',
      stateValue: 0,
      option: [],
      value: [],
      datas: [],
      list: [],
      loading: false,
      buttonArr,
      dataSource: {
        rrAttachmentInfos: [],
        prAttachmentInfos: [],
        srAttachmentInfos: [],
        dpAttachmentInfos: [],
        qasTestAttachmentInfos: [],
        uatTestAttachmentInfos: [],
        lrAttachmentInfos: []
      },
      fields,
      fieldsInfo,
      fieldsAssessment,
      rrAttachmentFields,
      prAttachmentFields,
      srAttachmentFields,
      dpAttachmentFields,
      qasTestAttachmentFields,
      uatTestAttachmentFields,
      lrAttachmentFields,
      options: {
        assessmentState: [
          {
            itemValue: true,
            description: '是'
          },
          {
            itemValue: false,
            description: '否'
          }
        ],
        delay: [
          {
            itemValue: true,
            description: '是'
          },
          {
            itemValue: false,
            description: '否'
          }
        ]
      },
      fileList: [],
      // 必要阶段
      rrRequired: 'true',
      prRequired: 'true',
      srRequired: 'true',
      dpRequired: 'true',
      qasRequired: 'true',
      uatRequired: 'true',
      lrRequired: 'true',
      // 需求评审radio按钮
      rrRadioOne: 'false',
      rrRadioTwo: 'false',
      prRadioOne: 'false',
      srRadioOne: 'false',
      srRadioTwo: 'false',
      dpRadioOne: 'false',
      dpRadioTwo: 'false',
      dpRadioTherr: 'false',
      qasRadioOne: 'false',
      qasRadioTwo: 'false',
      uatRadioOne: 'false',
      uatRadioTwo: 'false',
      uatRadioTherr: 'false',
      lrRadioOne: 'false'
    }
  },
  created() {
    this.routerPath = this.$route.fullPath
    this.getCommon()
  },
  activated() {
    if (this.routerPath === this.$route.fullPath) return
    this.routerPath = this.$route.fullPath
    this.$clearData(this.dataSource)
    this.getCommon()
  },
  methods: {
    // 获取下拉菜单列表
    getCommon() {
      const dictNames = 'projectLevel,projectField,developLanguage,systemCode,projectType,systemType'
      this.$api.getMoreItemValue({ dictNames }).then(res => {
        if (res.code === 200) {
          this.$set(this.options, 'level', res.data.projectLevel)
          this.$set(this.options, 'field', res.data.projectField)
          this.$set(this.options, 'language', res.data.developLanguage)
          this.$set(this.options, 'systemCode', res.data.systemCode)
          this.$set(this.options, 'type', res.data.projectType)
          this.$set(this.options, 'systemType', res.data.systemType)
        }
      })
    },
    // 确定必选 对应的阶段内容必填
    isRequired(item) {
      switch (item) {
        case 'rr':
          this.rrAttachmentFields[0].rules[0].required = this.rrRequired === 'true'
          break
        case 'pr':
          this.prAttachmentFields[0].rules[0].required = this.prRequired === 'true'
          break
        case 'sr':
          this.srAttachmentFields[0].rules[0].required = this.srRequired === 'true'
          break
        case 'dp':
          this.dpAttachmentFields[0].rules[0].required = this.dpRequired === 'true'
          break
        case 'qas':
          this.qasTestAttachmentFields[0].rules[0].required = this.qasRequired === 'true'
          break
        case 'uat':
          this.uatTestAttachmentFields[0].rules[0].required = this.uatRequired === 'true'
          break
        case 'lr':
          this.lrAttachmentFields[0].rules[0].required = this.lrRequired === 'true'
          break
        default:
          break
      }
      const reqList = [this.rrRequired, this.prRequired, this.srRequired, this.dpRequired, this.qasRequired, this.uatRequired, this.lrRequired]
      for (let index = 0; index < reqList.length; index++) {
        if (reqList[index] === 'true') {
          if (index === 0) {
            this.stageValue = '需求评审'
            this.stageKey = '0'
            return
          } else if (index === 1) {
            this.stageValue = '立项评审'
            this.stageKey = '1'
            return
          } else if (index === 2) {
            this.stageValue = '方案评审'
            this.stageKey = '2'
            return
          } else if (index === 3) {
            this.stageValue = '开发阶段'
            this.stageKey = '3'
            return
          } else if (index === 4) {
            this.stageValue = 'QAS测试'
            this.stageKey = '4'
            return
          } else if (index === 5) {
            this.stageValue = 'UAT测试'
            this.stageKey = '5'
            return
          } else if (index === 6) {
            this.stageValue = '上线评审'
            this.stageKey = '6'
            return
          }
        }
      }
    },
    // 点击顶部按钮
    clickBtn(type) {
      switch (type) {
        case 'add':
          this.save()
          break
        default:
          break
      }
    },
    // 保存
    save() {
      const flag = [false, false, false, false, false, false, false, false, false, false]
      const forms = [this.$refs.wtFormPanel, this.$refs.wtInfoForm, this.$refs.wtAssessmentForm, this.$refs.rrAttachmentForm, this.$refs.prAttachmentForm, this.$refs.srAttachmentForm, this.$refs.dpAttachmentForm, this.$refs.qasAttachmentForm, this.$refs.uatAttachmentForm, this.$refs.lrAttachmentForm]
      const reqList = [this.rrRequired, this.prRequired, this.srRequired, this.dpRequired, this.qasRequired, this.uatRequired, this.lrRequired]
      // 获取多个表单 所有表单校验OK 才能提交
      forms.forEach((item, index) => {
        item.validate(valid => {
          if (valid) {
            flag[index] = true
          }
        })
      })
      // 判断是否所有阶段都未选择
      if (!reqList.includes('true')) {
        return this.$message.error('至少需要选择一个必需阶段')
      }
      if (!flag.includes(false)) {
        // 判断各个阶段是否必要 必要阶段对应的信息必须填写 确认填写后对应传参
        if (this.rrRequired === 'true') {
          if (!this.rrRadioOne || !this.rrRadioTwo) {
            return this.$message.error('请选择需求评审阶段项目文档是否完成')
          } else {
            this.dataSource.rr = true
            this.dataSource.rql = this.rrRadioOne === 'true'
            this.dataSource.ral = this.rrRadioTwo === 'true'
          }
        } else {
          this.dataSource.rr = false
        }
        if (this.prRequired === 'true') {
          if (!this.prRadioOne) {
            return this.$message.error('请选择立项评审阶段项目文档是否完成')
          } else {
            this.dataSource.pr = true
            this.dataSource.pir = this.prRadioOne === 'true'
          }
        } else {
          this.dataSource.pr = false
        }
        if (this.srRequired === 'true') {
          if (!this.srRadioOne || !this.srRadioTwo) {
            return this.$message.error('请选择解决方案评审阶段项目文档是否完成')
          } else {
            this.dataSource.sr = true
            this.dataSource.prd = this.srRadioOne === 'true'
            this.dataSource.ui = this.srRadioTwo === 'true'
          }
        } else {
          this.dataSource.sr = false
        }
        if (this.dpRequired === 'true') {
          if (!this.dpRadioOne || !this.dpRadioTwo || !this.dpRadioTherr) {
            return this.$message.error('请选择开发阶段项目文档是否完成')
          } else {
            this.dataSource.dp = true
            this.dataSource.db = this.dpRadioOne === 'true'
            this.dataSource.lld = this.dpRadioTwo === 'true'
            this.dataSource.dd = this.dpRadioTherr === 'true'
          }
        } else {
          this.dataSource.dp = false
        }
        if (this.qasRequired === 'true') {
          if (!this.qasRadioOne || !this.qasRadioTwo) {
            return this.$message.error('请选择QAS测试阶段项目文档是否完成')
          } else {
            this.dataSource.qasTest = true
            this.dataSource.str = this.qasRadioOne === 'true'
            this.dataSource.stc = this.qasRadioTwo === 'true'
          }
        } else {
          this.dataSource.qasTest = false
        }
        if (this.uatRequired === 'true') {
          if (!this.uatRadioOne || !this.uatRadioTwo || !this.uatRadioTherr) {
            return this.$message.error('请选择UAT测试阶段项目文档是否完成')
          } else {
            this.dataSource.uatTest = true
            this.dataSource.uatStr = this.uatRadioOne === 'true'
            this.dataSource.um = this.uatRadioTwo === 'true'
            this.dataSource.olc = this.uatRadioTherr === 'true'
          }
        } else {
          this.dataSource.uatTest = false
        }
        if (this.lrRequired === 'true') {
          if (!this.lrRadioOne) {
            return this.$message.error('请选择上线评审阶段项目文档是否完成')
          } else {
            this.dataSource.lr = true
            this.dataSource.olr = this.lrRadioOne === 'true'
          }
        } else {
          this.dataSource.lr = false
        }
        this.dataSource.languageList = this.dataSource.language
        this.dataSource.userProjectRole = null
        this.dataSource.stage = this.stageKey
        this.dataSource.state = this.stateValue
        this.$api.addProjectInfo(this.dataSource).then(res => {
          if (res.code === 200) {
            this.$message.success('保存成功')
            this.$bus.$emit('getTableList')
            this.closeTag()
          }
        })
      } else {
        this.$message.error('请检查所有必填项是否填写')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.icon {
  margin: 0 5px;
}
::v-deep .el-collapse-item__header {
  margin-bottom: 5px;
}
.hr-style{
  border:1px #cccccc dotted;
  margin:10px 0 30px 0;
}
.title-style {
  color:#409eff;
  font-weight:bold;
  background: #f0f6fd;
  margin: 3% 0 15px 0;
  height:40px;
  line-height: 40px;
}
.compliance-style {
  margin: 0 0 20px 30px;
  width:600px;
  height: 35px;
  font-weight:bold;
  line-height: 35px;
  background-color:rgb(165, 210, 247);
  opacity:0.8
}
.left-margin {
  margin-left: 25px;
}
.collapse-title {
  color:#409eff;
  font-weight:bold;
}
.collapse-span {
  margin-left:30px;
  font-size:16px;
}
.uploads-tip {
  margin-left:180px;
  color:#b4b3b3;
  font-size:10px;
}
.radio-tip {
  margin-left:15px;
  margin-bottom:10px;
  color:#888080;
  font-weight: bold;
  font-size:13px;
}
.button-div {
  width: 101%;
  height: 64px;
  position: absolute;
  background-color: rgb(255, 255, 255);
  z-index: 99;
  top: 0;
  left: 0;
  opacity:0.9;
  border-bottom: 1px #DCDFE6 solid;
}
.file-div {
  margin-right: 20px;
  float:left;
  width:180px;
  height: 160px;
  border:1px #DCDFE6 solid;
  border-radius: 10px;
}
.file-divs {
  margin-right: 20px;
  float:left;
  width:230px;
  height: 160px;
  border:1px #DCDFE6 solid;
  border-radius: 10px;
}
.file-img {
 margin: 10px 15px;
 color: #409eff;
 font-size: 50px
}
.radio-One {
  float:left;
  margin-left:15px;
}
.radio-Two {
  float:left;
  margin-left:-15px;
}
.required-title {
  color: #409eff;
  font-size: 10px;
  font-weight: bold;
}
</style>
