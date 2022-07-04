<template>
  <!-- 管理员编辑页面 -->
  <div class="editAdmin">
    <div class="button-div">
      <wt-button-mult style="margin: 18px 0 0 30px" :button-arr="buttonArr" @clickBtn="clickBtn"></wt-button-mult>
    </div>
    <div>
      <p class="title-style">
        <i class="el-icon-s-custom icon header-icon"></i>基本信息
      </p>
      <WtFormPanel ref="wtFormPanel" :data-source="dataSource" :options="options" :fields="fields"></WtFormPanel>
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
      <p style="font-size:12px;margin: 0 0 20px 60px;font-weight:bold;">
        SVN文档地址：
        <el-link type="primary" @click="preview(dataSource.svnUrl)">
          {{ dataSource.svnUrl }}
        </el-link>
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
          <div style="margin: 0 20px 20px 110px">
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
          <WtFormPanel ref="rrAttachmentForms" :data-source="rrSource" :options="options" :fields="rrAttachmentField"></WtFormPanel>
          <WtFormPanel ref="rrAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="rrAttachmentFields">
            <template v-slot:rrRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  评审后需求清单
                </p>
                <el-radio-group v-model="rrRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="rrFirst" :disabled="rrDis">
                  <el-radio label="true" class="radio-One" :disabled="rrFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  需求分析报告
                </p>
                <el-radio-group v-model="rrRadioTwo" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="rrSecond" :disabled="rrDis">
                  <el-radio label="true" class="radio-One" :disabled="rrSecondPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
          <div style="margin: 0 20px 20px 110px">
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
          <WtFormPanel ref="prAttachmentForms" :data-source="prSource" :options="options" :fields="prAttachmentField"></WtFormPanel>
          <WtFormPanel ref="prAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="prAttachmentFields">
            <template v-slot:prRadioOne>
              <div class="file-divs">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  立项报告（含计划、项目组、预算）
                </p>
                <el-radio-group v-model="prRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="prFirst" :disabled="prDis">
                  <el-radio label="true" class="radio-One" :disabled="prFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
          <div style="margin: 0px 20px 20px 110px">
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
          <WtFormPanel ref="srAttachmentForms" :data-source="srSource" :options="options" :fields="srAttachmentField"></WtFormPanel>
          <WtFormPanel ref="srAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="srAttachmentFields">
            <template v-slot:srRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  需求规格说明书
                </p>
                <el-radio-group v-model="srRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="srFirst" :disabled="srDis">
                  <el-radio label="true" class="radio-One" :disabled="srFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  原型图
                </p>
                <el-radio-group v-model="srRadioTwo" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="srSecond" :disabled="srDis">
                  <el-radio label="true" class="radio-One" :disabled="srSecondPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
          <div style="margin: 0 20px 20px 110px">
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
          <WtFormPanel ref="dpAttachmentForms" :data-source="dpSource" :options="options" :fields="dpAttachmentField"></WtFormPanel>
          <WtFormPanel ref="dpAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="dpAttachmentFields">
            <template v-slot:dpRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  数据库设计
                </p>
                <el-radio-group v-model="dpRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="dpFirst" :disabled="dpDis">
                  <el-radio label="true" class="radio-One" :disabled="dpFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  开发文档设计
                </p>
                <el-radio-group v-model="dpRadioTwo" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="dpSecond" :disabled="dpDis">
                  <el-radio label="true" class="radio-One" :disabled="dpSecondPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  系统部署说明
                </p>
                <el-radio-group v-model="dpRadioTherr" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="dpThird" :disabled="dpDis">
                  <el-radio label="true" class="radio-One" :disabled="dpThirdPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
          <div style="margin: 0 20px 20px 110px">
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
          <WtFormPanel ref="qasAttachmentForms" :data-source="qasSource" :options="options" :fields="qasAttachmentField"></WtFormPanel>
          <WtFormPanel ref="qasAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="qasTestAttachmentFields">
            <template v-slot:qasRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  测试报告
                </p>
                <el-radio-group v-model="qasRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="qasFirst" :disabled="qasDis">
                  <el-radio label="true" class="radio-One" :disabled="qasFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  系统测试用例
                </p>
                <el-radio-group v-model="qasRadioTwo" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="qasSecond" :disabled="qasDis">
                  <el-radio label="true" class="radio-One" :disabled="qasSecondPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
          <div style="margin: 0 20px 20px 110px">
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
          <WtFormPanel ref="uatAttachmentForms" :data-source="dpSource" :options="options" :fields="uatAttachmentField"></WtFormPanel>
          <WtFormPanel ref="uatAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="uatTestAttachmentFields">
            <template v-slot:uatRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  UAT测试报告
                </p>
                <el-radio-group v-model="uatRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="uatFirst" :disabled="uatDis">
                  <el-radio label="true" class="radio-One" :disabled="uatFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  用户操作手册
                </p>
                <el-radio-group v-model="uatRadioTwo" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="uatSecond" :disabled="uatDis">
                  <el-radio label="true" class="radio-One" :disabled="uatSecondPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
                  </el-radio>
                </el-radio-group>
              </div>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  上线检查单
                </p>
                <el-radio-group v-model="uatRadioTherr" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="uatThird" :disabled="uatDis">
                  <el-radio label="true" class="radio-One" :disabled="uatThirdPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
          <div style="margin: 0 20px 20px 110px">
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
          <WtFormPanel ref="lrAttachmentForms" :data-source="lrSource" :options="options" :fields="lrAttachmentField"></WtFormPanel>
          <WtFormPanel ref="lrAttachmentForm" style="display: block" :data-source="dataSource" :options="options" :fields="lrAttachmentFields">
            <template v-slot:lrRadioOne>
              <div class="file-div">
                <p class="el-icon-document file-img"></p>
                <p class="radio-tip">
                  上线评审报告
                </p>
                <el-radio-group v-model="lrRadioOne" disabled>
                  <el-radio label="true" class="radio-One">
                    已完成
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    未完成
                  </el-radio>
                </el-radio-group>
                <hr align="center" class="hr-styles">
                <el-radio-group v-model="lrFirst" :disabled="lrDis">
                  <el-radio label="true" class="radio-One" :disabled="lrFirstPassDis">
                    通过
                  </el-radio>
                  <el-radio label="false" class="radio-Two">
                    不通过
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
import { buttonArr, fields, fieldsInfo, fieldsAssessment, rrAttachmentFields, rrAttachmentField, prAttachmentFields, srAttachmentFields, dpAttachmentFields, qasTestAttachmentFields, uatTestAttachmentFields, lrAttachmentFields, prAttachmentField, srAttachmentField, dpAttachmentField, qasAttachmentField, uatAttachmentField, lrAttachmentField } from './config/editAdmin'
export default {
  name: 'InfoEdit',
  components: {
  },
  data() {
    return {
      buttonArr,
      // 储存考核信息等参数
      rrSource: { stage: 0 },
      prSource: { stage: 1 },
      srSource: { stage: 2 },
      dpSource: { stage: 3 },
      qasSource: { stage: 4 },
      uatSource: { stage: 5 },
      lrSource: { stage: 6 },
      forms: '',
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
      rrAttachmentField,
      prAttachmentField,
      srAttachmentField,
      dpAttachmentField,
      qasAttachmentField,
      uatAttachmentField,
      lrAttachmentField,
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
        ],
        reQuarter: [
          {
            itemValue: 'Q1',
            description: 'Q1'
          },
          {
            itemValue: 'Q2',
            description: 'Q2'
          },
          {
            itemValue: 'Q3',
            description: 'Q3'
          },
          {
            itemValue: 'Q4',
            description: 'Q4'
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
      lrUnaccomplishedShow: false,
      // 通过不通过
      rrFirst: '',
      rrSecond: '',
      prFirst: '',
      srFirst: '',
      srSecond: '',
      dpFirst: '',
      dpSecond: '',
      dpThird: '',
      qasFirst: '',
      qasSecond: '',
      uatFirst: '',
      uatSecond: '',
      uatThird: '',
      lrFirst: '',
      // 控制各个阶段项目文件通过不通过 是否可选
      rrDis: false,
      prDis: false,
      srDis: false,
      dpDis: false,
      qasDis: false,
      uatDis: false,
      lrDis: false,
      // 控制通过按钮是否可点
      rrFirstPassDis: false,
      rrSecondPassDis: false,
      prFirstPassDis: false,
      srFirstPassDis: false,
      srSecondPassDis: false,
      dpFirstPassDis: false,
      dpSecondPassDis: false,
      dpThirdPassDis: false,
      qasFirstPassDis: false,
      qasSecondPassDis: false,
      uatFirstPassDis: false,
      uatSecondPassDis: false,
      uatThirdPassDis: false,
      lrFirstPassDis: false
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
    // 编辑时 查询详情 跳至下一阶段按钮放开
    if (this.id) {
      this.getDetail()
      this.getCommon()
    }
  },
  activated() {
    if (this.routerPath === this.$route.fullPath) return
    this.routerPath = this.$route.fullPath
    this.$clearData(this.dataSource)
    if (this.type === 'edit') {
      this.getDetail()
      this.getCommon()
    }
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
                  this.rrSource = res.data.projectDelReviewList[index]
                  break
                case '1':
                  this.prSource = res.data.projectDelReviewList[index]
                  break
                case '2':
                  this.srSource = res.data.projectDelReviewList[index]
                  break
                case '3':
                  this.dpSource = res.data.projectDelReviewList[index]
                  break
                case '4':
                  this.qasSource = res.data.projectDelReviewList[index]
                  break
                case '5':
                  this.uatSource = res.data.projectDelReviewList[index]
                  break
                case '6':
                  this.lrSource = res.data.projectDelReviewList[index]
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
            if (this.rrSource && this.rrSource.firstFile && this.rrSource.secondFile) {
              this.rrCompleteShow = true
              this.rrUnaccomplishedShow = false
            } else {
              this.rrCompleteShow = false
              this.rrUnaccomplishedShow = true
            }
            if (this.rrSource && this.rrSource.firstFile) {
              this.rrFirst = 'true'
            } else {
              this.rrFirst = 'false'
            }
            if (this.rrSource && this.rrSource.secondFile) {
              this.rrSecond = 'true'
            } else {
              this.rrSecond = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.rrFirstPassDis = !this.dataSource.rql
            this.rrSecondPassDis = !this.dataSource.ral
          } else {
            // 必要阶段为否时 所有选项不可点
            this.rrDis = true
            this.rrAttachmentField.forEach(element => { element.disabled = true })
          }
          this.prRequired = this.dataSource.pr.toString()
          if (this.prRequired === 'true') {
            this.prRadioOne = this.dataSource.pir.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.prSource && this.prSource.firstFile) {
              this.prCompleteShow = true
              this.prUnaccomplishedShow = false
            } else {
              this.prCompleteShow = false
              this.prUnaccomplishedShow = true
            }
            if (this.prSource && this.prSource.firstFile) {
              this.prFirst = 'true'
            } else {
              this.prFirst = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.prFirstPassDis = !this.dataSource.pir
          } else {
            // 必要阶段为否时 所有选项不可点
            this.prDis = true
            this.prAttachmentField.forEach(element => { element.disabled = true })
          }
          this.srRequired = this.dataSource.sr.toString()
          if (this.srRequired === 'true') {
            this.srRadioOne = this.dataSource.prd.toString()
            this.srRadioTwo = this.dataSource.ui.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.srSource && this.srSource.firstFile && this.srSource.secondFile) {
              this.srCompleteShow = true
              this.srUnaccomplishedShow = false
            } else {
              this.srCompleteShow = false
              this.srUnaccomplishedShow = true
            }
            if (this.srSource && this.srSource.firstFile) {
              this.srFirst = 'true'
            } else {
              this.srFirst = 'false'
            }
            if (this.srSource && this.srSource.secondFile) {
              this.srSecond = 'true'
            } else {
              this.srSecond = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.srFirstPassDis = !this.dataSource.prd
            this.srSecondPassDis = !this.dataSource.ui
          } else {
            // 必要阶段为否时 所有选项不可点
            this.srDis = true
            this.srAttachmentField.forEach(element => { element.disabled = true })
          }
          this.dpRequired = this.dataSource.dp.toString()
          if (this.dpRequired === 'true') {
            this.dpRadioOne = this.dataSource.db.toString()
            this.dpRadioTwo = this.dataSource.lld.toString()
            this.dpRadioTherr = this.dataSource.dd.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.dpSource && this.dpSource.firstFile && this.dpSource.secondFile && this.dpSource.thirdFile) {
              this.dpCompleteShow = true
              this.dpUnaccomplishedShow = false
            } else {
              this.dpCompleteShow = false
              this.dpUnaccomplishedShow = true
            }
            if (this.dpSource && this.dpSource.firstFile) {
              this.dpFirst = 'true'
            } else {
              this.dpFirst = 'false'
            }
            if (this.dpSource && this.dpSource.secondFile) {
              this.dpSecond = 'true'
            } else {
              this.dpSecond = 'false'
            }
            if (this.dpSource && this.dpSource.thirdFile) {
              this.dpThird = 'true'
            } else {
              this.dpThird = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.dpFirstPassDis = !this.dataSource.db
            this.dpSecondPassDis = !this.dataSource.lld
            this.dpThirdPassDis = !this.dataSource.dd
          } else {
            // 必要阶段为否时 所有选项不可点
            this.dpDis = true
            this.dpAttachmentField.forEach(element => { element.disabled = true })
          }
          this.qasRequired = this.dataSource.qasTest.toString()
          if (this.qasRequired === 'true') {
            this.qasRadioOne = this.dataSource.str.toString()
            this.qasRadioTwo = this.dataSource.stc.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.qasSource && this.qasSource.firstFile && this.qasSource.secondFile) {
              this.qasCompleteShow = true
              this.qasUnaccomplishedShow = false
            } else {
              this.qasCompleteShow = false
              this.qasUnaccomplishedShow = true
            }
            if (this.qasSource && this.qasSource.firstFile) {
              this.qasFirst = 'true'
            } else {
              this.qasFirst = 'false'
            }
            if (this.qasSource && this.qasSource.secondFile) {
              this.qasSecond = 'true'
            } else {
              this.qasSecond = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.qasFirstPassDis = !this.dataSource.str
            this.qasSecondPassDis = !this.dataSource.stc
          } else {
            // 必要阶段为否时 所有选项不可点
            this.qasDis = true
            this.qasAttachmentField.forEach(element => { element.disabled = true })
          }
          this.uatRequired = this.dataSource.uatTest.toString()
          if (this.uatRequired === 'true') {
            this.uatRadioOne = this.dataSource.uatStr.toString()
            this.uatRadioTwo = this.dataSource.um.toString()
            this.uatRadioTherr = this.dataSource.olc.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.uatSource && this.uatSource.firstFile && this.uatSource.secondFile && this.uatSource.thirdFile) {
              this.uatCompleteShow = true
              this.uatUnaccomplishedShow = false
            } else {
              this.uatCompleteShow = false
              this.uatUnaccomplishedShow = true
            }
            if (this.uatSource && this.uatSource.firstFile) {
              this.uatFirst = 'true'
            } else {
              this.uatFirst = 'false'
            }
            if (this.uatSource && this.uatSource.secondFile) {
              this.uatSecond = 'true'
            } else {
              this.uatSecond = 'false'
            }
            if (this.uatSource && this.uatSource.thirdFile) {
              this.uatThird = 'true'
            } else {
              this.uatThird = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.uatFirstPassDis = !this.dataSource.uatStr
            this.uatSecondPassDis = !this.dataSource.um
            this.uatThirdPassDis = !this.dataSource.olc
          } else {
            // 必要阶段为否时 所有选项不可点
            this.uatDis = true
            this.uatAttachmentField.forEach(element => { element.disabled = true })
          }
          this.lrRequired = this.dataSource.lr.toString()
          if (this.lrRequired === 'true') {
            this.lrRadioOne = this.dataSource.olr.toString()
            // 判断当前阶段是否有评审信息 并且对应的项目文件都已通过 通过展示已完成图标
            if (this.lrSource && this.lrSource.firstFile) {
              this.lrCompleteShow = true
              this.lrUnaccomplishedShow = false
            } else {
              this.lrCompleteShow = false
              this.lrUnaccomplishedShow = true
            }
            if (this.lrSource && this.lrSource.firstFile) {
              this.lrFirst = 'true'
            } else {
              this.lrFirst = 'false'
            }
            // 根据文件是否完成 判断通过按钮是否可用
            this.lrFirstPassDis = !this.dataSource.olr
          } else {
            // 必要阶段为否时 所有选项不可点
            this.lrDis = true
            this.lrAttachmentField.forEach(element => { element.disabled = true })
          }
          // 根据当前阶段判断上面阶段的考核组件和各个项目阶段文件已完成未完成选项是否可修改
          switch (res.data.stage) {
            case '0':
              this.forms = this.$refs.rrAttachmentForms
              break
            case '1':
              this.rrDis = true
              this.forms = this.$refs.prAttachmentForms
              this.rrAttachmentField.forEach(element => { element.disabled = true })
              break
            case '2':
              this.rrDis = true
              this.prDis = true
              this.forms = this.$refs.srAttachmentForms
              this.rrAttachmentField.forEach(element => { element.disabled = true })
              this.prAttachmentField.forEach(element => { element.disabled = true })
              break
            case '3':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.forms = this.$refs.dpAttachmentForms
              this.rrAttachmentField.forEach(element => { element.disabled = true })
              this.prAttachmentField.forEach(element => { element.disabled = true })
              this.srAttachmentField.forEach(element => { element.disabled = true })
              break
            case '4':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.dpDis = true
              this.forms = this.$refs.qasAttachmentForms
              this.rrAttachmentField.forEach(element => { element.disabled = true })
              this.prAttachmentField.forEach(element => { element.disabled = true })
              this.srAttachmentField.forEach(element => { element.disabled = true })
              this.dpAttachmentField.forEach(element => { element.disabled = true })
              break
            case '5':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.dpDis = true
              this.qasDis = true
              this.forms = this.$refs.uatAttachmentForms
              this.rrAttachmentField.forEach(element => { element.disabled = true })
              this.prAttachmentField.forEach(element => { element.disabled = true })
              this.srAttachmentField.forEach(element => { element.disabled = true })
              this.dpAttachmentField.forEach(element => { element.disabled = true })
              this.qasAttachmentField.forEach(element => { element.disabled = true })
              break
            case '6':
              this.rrDis = true
              this.prDis = true
              this.srDis = true
              this.dpDis = true
              this.qasDis = true
              this.uatDis = true
              this.forms = this.$refs.lrAttachmentForms
              this.rrAttachmentField.forEach(element => { element.disabled = true })
              this.prAttachmentField.forEach(element => { element.disabled = true })
              this.srAttachmentField.forEach(element => { element.disabled = true })
              this.dpAttachmentField.forEach(element => { element.disabled = true })
              this.qasAttachmentField.forEach(element => { element.disabled = true })
              this.uatAttachmentField.forEach(element => { element.disabled = true })
              break
            default:
              break
          }
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
      console.log(this.forms)
      this.forms.validate(valid => {
        if (valid) {
          this.dataSource.languageList = this.dataSource.language
          this.dataSource.userProjectRole = null
          this.dataSource.projectDelReviewList = []
          this.rrSource.firstFile = this.rrFirst === 'true'
          this.rrSource.secondFile = this.rrSecond === 'true'
          this.prSource.firstFile = this.prFirst === 'true'
          this.srSource.firstFile = this.srFirst === 'true'
          this.srSource.secondFile = this.srSecond === 'true'
          this.dpSource.firstFile = this.dpFirst === 'true'
          this.dpSource.secondFile = this.dpSecond === 'true'
          this.dpSource.thirdFile = this.dpThird === 'true'
          this.qasSource.firstFile = this.qasFirst === 'true'
          this.qasSource.secondFile = this.qasSecond === 'true'
          this.uatSource.firstFile = this.uatFirst === 'true'
          this.uatSource.secondFile = this.uatSecond === 'true'
          this.uatSource.thirdFile = this.uatThird === 'true'
          this.lrSource.firstFile = this.lrFirst === 'true'
          this.dataSource.projectDelReviewList.push(this.rrSource, this.prSource, this.srSource, this.dpSource, this.qasSource, this.uatSource, this.lrSource)
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
      })
    },
    // 获取下拉菜单列表
    getCommon() {
      const dictNames = 'projectLevel,projectField,developLanguage,systemCode,projectType,systemType,projectState,projectStage'
      this.$api.getMoreItemValue({ dictNames }).then(res => {
        if (res.code === 200) {
          this.$set(this.options, 'level', res.data.projectLevel)
          this.$set(this.options, 'field', res.data.projectField)
          this.$set(this.options, 'language', res.data.developLanguage)
          this.$set(this.options, 'systemCode', res.data.systemCode)
          this.$set(this.options, 'type', res.data.projectType)
          this.$set(this.options, 'systemType', res.data.systemType)
          this.$set(this.options, 'state', res.data.projectState)
          this.$set(this.options, 'stage', res.data.projectStage)
        }
      })
    },
    // 预览
    preview(url) {
      window.open(url)
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
.hr-styles{
  border:1px #cccccc dashed;
  margin:10px 0 10px 0;
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
  margin-right: 15px;
  color: #409eff;
  font-size: 10px;
  font-weight: bold;
}
.file-div {
  margin-right: 20px;
  float:left;
  width:180px;
  height: 200px;
  border:1px #DCDFE6 solid;
  border-radius: 10px;
}
.file-divs {
  margin-right: 20px;
  float:left;
  width:230px;
  height: 200px;
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
  color: #585656;
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
