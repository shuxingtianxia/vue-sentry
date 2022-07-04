<template>
  <!-- 用户编辑页面 -->
  <div class="edit">
    <div class="button-div">
      <wt-button-mult style="margin: 18px 0 0 30px" :button-arr="buttonArr" @clickBtn="clickBtn"></wt-button-mult>
    </div>
    <div>
      <p class="title-style">
        <i class="el-icon-s-custom icon header-icon"></i>基本信息
      </p>
      <WtFormPanel ref="wtFormPanel" :data-source="dataSource" :options="options" :fields="fields">
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
        <span style="color:#409eff; font-size:18px;"><i class="el-icon-star-on icon header-icon"></i></span>当前项目总体流程遵从度：{{ dataSource.compliance }}
      </p>
      <el-collapse v-model="activeNames">
        <!-- 需求评审 面板 -->
        <el-collapse-item class="left-margin" title="需求评审" name="3">
          <template slot="title">
            <p class="collapse-title">
              <span class="collapse-span">①</span> 需求评审
            </p>
            <p v-if="rrCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="rrUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left; margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="rrRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="rrAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(rrAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ rrAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ rrAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ rrAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="rrAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="rrAttachmentFields">
            <template v-slot:rrRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  评审后需求清单
                </p>
                <el-radio-group v-model="rrRadioOne" :disabled="rrDis">
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
                <el-radio-group v-model="rrRadioTwo" :disabled="rrDis">
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
            <p v-if="prCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="prUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left;margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="prRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="prAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(prAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ prAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ prAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ prAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="prAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="prAttachmentFields">
            <template v-slot:prRadioOne>
              <div class="file-divs">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  立项报告（含计划、项目组、预算）
                </p>
                <el-radio-group v-model="prRadioOne" :disabled="prDis">
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
            <p v-if="srCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="srUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left;margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="srRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="srAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(srAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ srAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ prAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ srAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="srAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="srAttachmentFields">
            <template v-slot:srRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  需求规格说明书
                </p>
                <el-radio-group v-model="srRadioOne" :disabled="srDis">
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
                <el-radio-group v-model="srRadioTwo" :disabled="srDis">
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
            <p v-if="dpCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="dpUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left;margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="dpRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="dpAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(dpAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ dpAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ dpAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ dpAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="dpAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="dpAttachmentFields">
            <template v-slot:dpRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  数据库设计
                </p>
                <el-radio-group v-model="dpRadioOne" :disabled="dpDis">
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
                <el-radio-group v-model="dpRadioTwo" :disabled="dpDis">
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
                <el-radio-group v-model="dpRadioTherr" :disabled="dpDis">
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
            <p v-if="qasCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="qasUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left;margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="qasRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="qasAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(qasAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ qasAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ qasAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ qasAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="qasAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="qasTestAttachmentFields">
            <template v-slot:qasRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  测试报告
                </p>
                <el-radio-group v-model="qasRadioOne" :disabled="qasDis">
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
                <el-radio-group v-model="qasRadioTwo" :disabled="qasDis">
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
            <p v-if="uatCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="uatUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left;margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="uatRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="uatAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(uatAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ uatAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ uatAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ uatAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="uatAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="uatTestAttachmentFields">
            <template v-slot:uatRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  UAT测试报告
                </p>
                <el-radio-group v-model="uatRadioOne" :disabled="uatDis">
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
                <el-radio-group v-model="uatRadioTwo" :disabled="uatDis">
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
                <el-radio-group v-model="uatRadioTherr" :disabled="uatDis">
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
            <p v-if="lrCompleteShow" class="complete-span">
              已完成
            </p>
            <p v-if="lrUnaccomplishedShow" class="unaccomplished-span">
              未完成
            </p>
          </template>
          <div style="float:left;margin: -2px 20px 20px 80px">
            <span class="required-title">必要阶段：</span>
            <el-radio-group v-model="lrRequired" disabled>
              <el-radio label="true">
                是
              </el-radio>
              <el-radio label="false">
                否
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="lrAssessmentList.length > 0" class="assessment-div">
            <span class="right-mag">考核年份：{{ new Date(parseInt(lrAssessmentList[0].re_year)).getFullYear() || '' }}</span>
            <span class="right-mag">丨</span>
            <span class="right-mag">考核季度：{{ lrAssessmentList[0].reQuarter }}</span>
            <p class="assessment-span">
              当前阶段遵从度：{{ lrAssessmentList[0].fraction }}<br><span class="assessment-p">遵从度总分：2分</span>
            </p>
            <span class="right-mag">丨</span>
            <span class="right-mag">意见：{{ lrAssessmentList[0].opinions }}</span>
          </div>
          <WtFormPanel ref="lrAttachmentForm" style="display: block; clear: both;" :data-source="dataSource" :options="options" :fields="lrAttachmentFields">
            <template v-slot:lrRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  上线评审报告
                </p>
                <el-radio-group v-model="lrRadioOne" :disabled="lrDis">
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
import { buttonArr, fields, fieldsInfo, fieldsAssessment, rrAttachmentFields, prAttachmentFields, srAttachmentFields, dpAttachmentFields, qasTestAttachmentFields, uatTestAttachmentFields, lrAttachmentFields } from './config/edit'
export default {
  name: 'InfoEdit',
  components: {
  },
  data() {
    return {
      option: [],
      value: [],
      datas: [],
      list: [],
      loading: false,
      buttonArr,
      // 储存考核信息等参数
      rrAssessmentList: [],
      prAssessmentList: [],
      srAssessmentList: [],
      dpAssessmentList: [],
      qasAssessmentList: [],
      uatAssessmentList: [],
      lrAssessmentList: [],
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
      rrRadioOne: '',
      rrRadioTwo: '',
      prRadioOne: '',
      srRadioOne: '',
      srRadioTwo: '',
      dpRadioOne: '',
      dpRadioTwo: '',
      dpRadioTherr: '',
      qasRadioOne: '',
      qasRadioTwo: '',
      uatRadioOne: '',
      uatRadioTwo: '',
      uatRadioTherr: '',
      lrRadioOne: '',
      // 控制各个阶段项目文件已完成未完成 是否可选
      rrDis: false,
      prDis: false,
      srDis: false,
      dpDis: false,
      qasDis: false,
      uatDis: false,
      lrDis: false,
      // 控制折叠面板上已完成未完成提示 是否展示
      rrCompleteShow: false,
      prCompleteShow: false,
      srCompleteShow: false,
      dpCompleteShow: false,
      qasCompleteShow: false,
      uatCompleteShow: false,
      lrCompleteShow: false,
      rrUnaccomplishedShow: false,
      prUnaccomplishedShow: false,
      srUnaccomplishedShow: false,
      dpUnaccomplishedShow: false,
      qasUnaccomplishedShow: false,
      uatUnaccomplishedShow: false,
      lrUnaccomplishedShow: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    type() {
      return this.$route.query.type
    }
  },
  created() {
    this.routerPath = this.$route.fullPath
    this.getCommon()
    this.getDetail()
  },
  activated() {
    if (this.routerPath === this.$route.fullPath) return
    this.routerPath = this.$route.fullPath
    this.$clearData(this.dataSource)
    this.getCommon()
    this.getDetail()
  },
  methods: {
    //  获取详情
    getDetail() {
      this.$api.projectInfoDetail(this.id).then(res => {
        if (res.code === 200) {
          this.dataSource = res.data
          if (this.dataSource.language) {
            this.dataSource.language = this.dataSource.language.split(',')
          }
          // 获取各阶段考核信息 对应储存
          if (res.data.projectDelReviewList && res.data.projectDelReviewList.length > 0) {
            for (let index = 0; index < res.data.projectDelReviewList.length; index++) {
              switch (res.data.projectDelReviewList[index].stage) {
                case '0':
                  this.rrAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                case '1':
                  this.prAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                case '2':
                  this.srAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                case '3':
                  this.dpAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                case '4':
                  this.qasAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                case '5':
                  this.uatAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                case '6':
                  this.lrAssessmentList.push(res.data.projectDelReviewList[index])
                  break
                default:
                  break
              }
            }
          }
          // 获取各阶段 是否必要及是否完成项目文件等选项对应储存
          this.rrRequired = this.dataSource.rr.toString()
          if (this.rrRequired === 'true') {
            this.rrRadioOne = this.dataSource.rql.toString()
            this.rrRadioTwo = this.dataSource.ral.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.rrAssessmentList.length && this.rrAssessmentList[0].firstFile && this.rrAssessmentList[0].secondFile) {
              this.rrCompleteShow = true
            } else {
              this.rrUnaccomplishedShow = true
            }
          } else {
            this.rrDis = true
            this.rrAttachmentFields[0].rules[0].required = false
          }
          this.prRequired = this.dataSource.pr.toString()
          if (this.prRequired === 'true') {
            this.prRadioOne = this.dataSource.pir.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.prAssessmentList.length && this.prAssessmentList[0].firstFile) {
              this.prCompleteShow = true
            } else {
              this.prUnaccomplishedShow = true
            }
          } else {
            this.prDis = true
            this.prAttachmentFields[0].rules[0].required = false
          }
          this.srRequired = this.dataSource.sr.toString()
          if (this.srRequired === 'true') {
            this.srRadioOne = this.dataSource.prd.toString()
            this.srRadioTwo = this.dataSource.ui.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.srAssessmentList.length && this.srAssessmentList[0].firstFile && this.srAssessmentList[0].secondFile) {
              this.srCompleteShow = true
            } else {
              this.srUnaccomplishedShow = true
            }
          } else {
            this.srDis = true
            this.srAttachmentFields[0].rules[0].required = false
            this.srAttachmentFields[1].disabled = true
          }
          this.dpRequired = this.dataSource.dp.toString()
          if (this.dpRequired === 'true') {
            this.dpRadioOne = this.dataSource.db.toString()
            this.dpRadioTwo = this.dataSource.lld.toString()
            this.dpRadioTherr = this.dataSource.dd.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.dpAssessmentList.length && this.dpAssessmentList[0].firstFile && this.dpAssessmentList[0].secondFile && this.dpAssessmentList[0].thirdFile) {
              this.dpCompleteShow = true
            } else {
              this.dpUnaccomplishedShow = true
            }
          } else {
            this.dpDis = true
            this.dpAttachmentFields[0].rules[0].required = false
            this.dpAttachmentFields[1].disabled = true
          }
          this.qasRequired = this.dataSource.qasTest.toString()
          if (this.qasRequired === 'true') {
            this.qasRadioOne = this.dataSource.str.toString()
            this.qasRadioTwo = this.dataSource.stc.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.qasAssessmentList.length && this.qasAssessmentList[0].firstFile && this.qasAssessmentList[0].secondFile) {
              this.qasCompleteShow = true
            } else {
              this.qasUnaccomplishedShow = true
            }
          } else {
            this.qasDis = true
            this.qasTestAttachmentFields[0].rules[0].required = false
            this.qasTestAttachmentFields[1].disabled = true
          }
          this.uatRequired = this.dataSource.uatTest.toString()
          if (this.uatRequired === 'true') {
            this.uatRadioOne = this.dataSource.uatStr.toString()
            this.uatRadioTwo = this.dataSource.um.toString()
            this.uatRadioTherr = this.dataSource.olc.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.uatAssessmentList.length && this.uatAssessmentList[0].firstFile && this.uatAssessmentList[0].secondFile && this.uatAssessmentList[0].thirdFile) {
              this.uatCompleteShow = true
            } else {
              this.uatUnaccomplishedShow = true
            }
          } else {
            this.uatDis = true
            this.uatTestAttachmentFields[0].rules[0].required = false
            this.uatTestAttachmentFields[1].disabled = true
          }
          this.lrRequired = this.dataSource.lr.toString()
          if (this.lrRequired === 'true') {
            this.lrRadioOne = this.dataSource.olr.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.lrAssessmentList.length && this.lrAssessmentList[0].firstFile) {
              this.lrCompleteShow = true
            } else {
              this.lrUnaccomplishedShow = true
            }
          } else {
            this.lrDis = true
            this.lrAttachmentFields[0].rules[0].required = false
            this.lrAttachmentFields[1].disabled = true
          }
          // 根据当前阶段判断上面阶段的时间组件和各个项目阶段文件已完成未完成选项是否可修改
          switch (res.data.stage) {
            case '1':
              this.rrDis = true
              break
            case '2':
              this.rrDis = true
              this.prDis = true
              break
            case '3':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.srAttachmentFields[1].disabled = true
              break
            case '4':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.dpDis = true
              this.srAttachmentFields[1].disabled = true
              this.dpAttachmentFields[1].disabled = true
              break
            case '5':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.dpDis = true
              this.qasDis = true
              this.srAttachmentFields[1].disabled = true
              this.dpAttachmentFields[1].disabled = true
              this.qasTestAttachmentFields[1].disabled = true
              break
            case '6':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.dpDis = true
              this.qasDis = true
              this.uatDis = true
              this.srAttachmentFields[1].disabled = true
              this.dpAttachmentFields[1].disabled = true
              this.qasTestAttachmentFields[1].disabled = true
              this.uatTestAttachmentFields[1].disabled = true
              break
            default:
              break
          }
        }
      })
    },
    // 获取下拉菜单列表
    getCommon() {
      const dictNames = 'projectLevel,projectField,developLanguage,projectState,projectStage,projectType,systemCode,systemType'
      this.$api.getMoreItemValue({ dictNames }).then(res => {
        if (res.code === 200) {
          this.$set(this.options, 'level', res.data.projectLevel)
          this.$set(this.options, 'field', res.data.projectField)
          this.$set(this.options, 'language', res.data.developLanguage)
          this.$set(this.options, 'state', res.data.projectState)
          this.$set(this.options, 'stage', res.data.projectStage)
          this.$set(this.options, 'systemCode', res.data.systemCode)
          this.$set(this.options, 'type', res.data.projectType)
          this.$set(this.options, 'systemType', res.data.systemType)
        }
      })
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
      // 获取多个表单 所有表单校验OK 才能提交
      forms.forEach((item, index) => {
        item.validate(valid => {
          if (valid) {
            flag[index] = true
          }
        })
      })
      if (!flag.includes(false)) {
        this.dataSource.languageList = this.dataSource.language
        this.dataSource.userProjectRole = null
        this.dataSource.rql = this.rrRadioOne === 'true'
        this.dataSource.ral = this.rrRadioTwo === 'true'
        this.dataSource.pir = this.prRadioOne === 'true'
        this.dataSource.prd = this.srRadioOne === 'true'
        this.dataSource.ui = this.srRadioTwo === 'true'
        this.dataSource.db = this.dpRadioOne === 'true'
        this.dataSource.lld = this.dpRadioTwo === 'true'
        this.dataSource.dd = this.dpRadioTherr === 'true'
        this.dataSource.str = this.qasRadioOne === 'true'
        this.dataSource.stc = this.qasRadioTwo === 'true'
        this.dataSource.uatStr = this.uatRadioOne === 'true'
        this.dataSource.um = this.uatRadioTwo === 'true'
        this.dataSource.olc = this.uatRadioTherr === 'true'
        this.dataSource.olr = this.lrRadioOne === 'true'
        this.$api.editProjectInfo(this.dataSource).then(res => {
          if (res.code === 200) {
            this.$message.success('保存成功')
            this.$bus.$emit('getTableList')
            this.getDetail()
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
  float: left;
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
.assessment-div {
  margin:0 0 15px 50px;
  color: #409eff;
  font-size:10px;
  font-weight:bold;
  float: left;
}
.right-mag {
  margin-right: 30px;
  float: left
}
.assessment-span {
  margin: 0 30px 0 60px;
  float: left
}
.assessment-p {
  color: #b4b3b3;
  font-size:8px
}
.button-div {
  width: 88%;
  height: 64px;
  position: fixed;
  background-color: rgb(255, 255, 255);
  z-index: 99;
  top: 101px;
  left: 200px;
  opacity:0.9;
  border-bottom: 1px #DCDFE6 solid;
}
.required-title {
  color: #409eff;
  font-size: 10px;
  font-weight: bold;
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
.radio-tip {
  margin-left:15px;
  margin-bottom:10px;
  color:#888080;
  font-weight: bold;
  font-size:13px;
}
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #585656;
  cursor: not-allowed;
}
::v-deep .el-radio__input.is-disabled+span.el-radio__label {
  color: #585656;
  cursor: not-allowed;
}
::v-deep .el-textarea.is-disabled .el-textarea__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #C0C4CC;
  cursor: not-allowed;
}
.complete-span {
  float: left;
  margin-left: 20px;
  border-radius: 4px;
  width: 50px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: rgba(67, 207, 124, 1);
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
}
.unaccomplished-span {
  float: left;
  border-radius: 4px;
  margin-left: 20px;
  width: 50px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: rgba(166, 166, 166, 1);
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
}
</style>
