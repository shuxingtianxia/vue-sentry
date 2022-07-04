<template>
  <div class="project-info">
    <el-alert v-if="delayShow" :title="delays" type="error" class="el-icon-message-solid delays-style">
    </el-alert>
    <WtListView ref="wtListView" style="clear: both;" :options="options" :search-data="searchData" :other-config="otherConfig" :form-config="formConfig" :bar-btns="barBtns" :toolbar="toolbar" :table-config="tableConfig" :request-config="requestConfig"
                search-str="valueMap"
                data-type="content"
                @handleClickBtn="handleClickBtn"
                @getSelectedList="getSelectedList"
    >
      <template v-slot:name="{data}">
        <span style="color:#409EFF; cursor:pointer" @click="nameClick(data.row)">{{ data.row.name }}</span>
      </template>
      <!-- 项目状态 -->
      <template v-slot:stateDesc="{data}">
        <span v-if="data.row.stateDesc === '预警' || data.row.stateDesc === '暂停' || data.row.stateDesc === '延误'" style="color: red">{{ data.row.stateDesc }}</span>
        <span v-else-if="data.row.stateDesc === '完成'" style="color: rgb(109, 191, 129)">{{ data.row.stateDesc }}</span>
        <span v-else>{{ data.row.stateDesc }}</span>
      </template>
      <!-- 项目组人员 点击展示 -->
      <template v-slot:person="{data}">
        <el-popover placement="right" style="width:100%" trigger="click" :visible-arrow="false">
          <div>
            <p class="members-title">
              项目组人员
            </p>
            <hr align="center" style="width:98%; color:#727270" size="1">
            <ul v-if="userProjectRoleList !== []" style="padding:10px;">
              <li v-for="(item, index) in userProjectRoleList" :key="index" style="margin-left:10px;">
                <span class="members">{{ item.projectRoleDesc }}：</span>{{ getUserName(item.projectUser).join('、') || '暂无' }}
              </li>
            </ul>
          </div>
          <el-button slot="reference" style="color:#409EFF" @click="membersClick(data.row)">
            查看详情
          </el-button>
        </el-popover>
      </template>
      <!-- 项目阶段 悬浮展示 -->
      <template v-slot:stageDesc="{data}">
        <span style="color:#409EFF">{{ data.row.stageDesc }}</span>
      </template>
      <template v-slot:files="{data}">
        <el-tooltip class="item" effect="dark" :content="'文件完整度'+data.row.compliance" placement="top">
          <el-button :type="data.row.compliance === '100.00%' ? 'primary' : 'info'">
            {{ data.row.compliance === '100.00%' ? '完整':'不完整' }}
          </el-button>
        </el-tooltip>
        <!-- <el-button v-if="data.row.compliance !== '0.00%'" type="primary" @click="seeFiles(data.row)">
          查看附件
        </el-button> -->
      </template>
      <template v-slot:infoHandle="{data}">
        <el-button type="primary" @click="editClick(data.row)">
          编辑
        </el-button>
      </template>
      <!-- svn文档地址 -->
      <template v-slot:svnUrl="{data}">
        <el-link type="primary" @click="preview(data.row.svnUrl)">
          {{ data.row.svnUrl }}
        </el-link>
      </template>
    </WtListView>
    <!-- <WtFilesDownload ref="wtFilesDownload" :files-config="filesConfigs" :file-table="fileTable"></WtFilesDownload> -->
  </div>
</template>
<script>
import { barBtns, toolbar, tableConfig, filesConfigs } from './config/info'
export default {
  name: 'InfoList',
  components: {
  },
  data() {
    return {
      delays: '',
      timer: '',
      delayShow: true,
      delayIndex: 1,
      selectedList: [], // 选中的数据
      delayList: [], // 延期的数据
      userProjectRoleList: [], // 项目代码数据
      barBtns,
      toolbar,
      tableConfig,
      filesConfigs,
      options: {},
      requestConfig: {
        getTableData: this.$api.getProjectInfoList,
        import: this.$api.importExcel
      },
      searchData: {
        name: '',
        level: ''
      },
      otherConfig: {
        checkboxFixed: 'left',
        radio: false,
        checkbox: true,
        expand: false
      },
      // 条件筛选框
      formConfig: [
        {
          type: 'input',
          label: '项目名称',
          prop: 'name',
          placeholder: '项目名称'
        },
        {
          type: 'select',
          label: '项目等级',
          prop: 'level',
          props: {
            value: 'itemValue',
            label: 'description'
          }
        },
        {
          type: 'select',
          label: '项目领域',
          prop: 'field',
          props: {
            value: 'itemValue',
            label: 'description'
          }
        },
        {
          type: 'select',
          label: '项目状态',
          prop: 'state',
          props: {
            value: 'itemValue',
            label: 'description'
          }
        }
      ],
      // 项目阶段 悬浮展示文字
      stageList: [
        {
          stageSpan: '①',
          stageText: '需求评审'
        },
        {
          stageSpan: '②',
          stageText: '立项评审'
        },
        {
          stageSpan: '③',
          stageText: '方案评审'
        },
        {
          stageSpan: '④',
          stageText: '开发阶段'
        },
        {
          stageSpan: '⑤',
          stageText: 'QAS测试'
        },
        {
          stageSpan: '⑥',
          stageText: 'UAT测试'
        },
        {
          stageSpan: '⑦',
          stageText: '上线评审'
        }
      ],
      fileTable: {}
    }
  },
  created() {
    this.delayInfo()
    this.getCommon()
  },
  methods: {
    // 预览
    preview(url) {
      window.open(url)
    },
    // 截取用户名称
    getUserName(value) {
      const names = []
      const str = value.split('_').slice(0)
      str.shift()
      str.forEach(item => {
        if (item.indexOf('、') !== -1) {
          names.push(item.split('、')[0])
        } else {
          names.push(item)
        }
      })
      return names
    },
    // 查看详情
    membersClick(row) {
      // 调用接口查询成员信息
      this.userProjectRoleList = []
      this.$api.getDataInfo(row.id).then(res => {
        if (res.code === 200) {
          this.userProjectRoleList = res.data.userRoleList
        }
      })
    },
    // 查看附件
    seeFiles(row) {
      this.$refs.wtFilesDownload.dialog = true
      const arr = ['rrAttachmentInfos', 'prAttachmentInfos', 'srAttachmentInfos', 'dpAttachmentInfos', 'qasTestAttachmentInfos', 'uatTestAttachmentInfos', 'lrAttachmentInfos', 'pmAttachmentInfos']
      arr.forEach(item => {
        this.$set(this.fileTable, item, row[item] || [])
      })
    },
    // 查询延期的项目
    delayInfo() {
      this.$api.projectInfoDelayInfo().then(res => {
        if (res.code === 200) {
          this.delayList = res.data
        }
        if (this.delayList && this.delayList.length > 1) {
          this.delays = this.delayList[0]
          this.delayShow = true
          this.timer = setInterval(this.getDelay, 10000)
        } else if (this.delayList.length === 1) {
          this.delayShow = true
          this.delays = this.delayList[0]
        } else {
          this.delayShow = false
        }
      })
    },
    // 延期项目大于1 循环展示
    getDelay() {
      if (this.delayIndex === this.delayList.length) {
        this.delays = this.delayList[0]
        this.delayIndex = 1
      } else {
        this.delayIndex += 1
        this.delays = this.delayList[this.delayIndex - 1]
      }
    },
    // 获取下拉菜单列表
    getCommon() {
      const dictNames = 'projectLevel,projectField,projectState'
      this.$api.getMoreItemValue({ dictNames }).then(res => {
        if (res.code === 200) {
          this.$set(this.options, 'level', res.data.projectLevel)
          this.$set(this.options, 'field', res.data.projectField)
          this.$set(this.options, 'state', res.data.projectState)
        }
      })
    },
    nameClick(row) {
      this.$router.push({ name: 'InfoDetails', query: { id: row.id }})
    },
    editClick(row) {
      this.$router.push({ name: 'InfoEdit', query: { type: 'edit', id: row.id }})
    },
    // 点击顶部按钮
    handleClickBtn(type) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'InfoAdd' })
          break
        case 'edit':
          if (this.selectedList.length !== 1) return this.$message.warning('请选择一条数据')
          this.$router.push({ name: 'InfoEdit', query: { type: 'edit', id: this.selectedList[0].id }})
          break
        case 'delete':
          if (this.selectedList.length !== 1) return this.$message.warning('请选择一条数据')
          this.$confirm('确定要删除该数据吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.$api.delProjectInfo([this.selectedList[0].id]).then(res => {
              if (res.code === 200) {
                this.$message.success('刪除成功')
                this.$bus.$emit('getTableList')
              }
            })
          })
          break
        default:
          break
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    // 选中的值
    getSelectedList(selectedList) {
      this.selectedList = selectedList
    }
  }
}
</script>
<style lang='scss' scoped>
.col-blue {
  color:#409eff;
}
.delays-style {
  margin-bottom:10px;
  width:350px;
  font-weight:bold;
  float:right;
}
.members-title {
  padding: 10px 0;
  font-weight:bold;
  text-align:center;
}
.members {
  width:120px;
  text-align:left;
  display:block;
  float:left;
}
</style>
