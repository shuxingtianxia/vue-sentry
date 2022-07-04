export const barBtns = [
  {
    text: '新建',
    type: 'primary',
    icon: 'el-icon-plus',
    clickType: 'add'
  },
  {
    text: '编辑',
    type: 'primary',
    icon: 'el-icon-edit',
    clickType: 'edit'
  },
  {
    text: '删除',
    type: 'danger',
    icon: 'el-icon-delete',
    clickType: 'delete'
  }
]

export const toolbar = {
  export: true,
  custom: true,
  print: true,
  fullScreen: true
}

export const tableConfig = [
  {
    label: '系统代码',
    prop: 'systemCode',
    width: 100
  },
  {
    label: '系统所属项目群',
    prop: 'systemTypeDesc',
    width: 120
  },
  {
    label: '项目类别',
    prop: 'typeDesc',
    width: 100
  },
  {
    label: '项目代码',
    prop: 'code',
    width: 100
  },
  {
    label: '项目名称',
    prop: 'name',
    width: 100,
    slotName: 'name'
  },
  {
    label: '项目介绍',
    prop: 'description',
    width: 100
  },
  {
    label: '项目等级',
    prop: 'levelDesc',
    width: 100
  },
  {
    label: '项目领域',
    prop: 'fieldDesc',
    width: 100
  },
  {
    label: '项目开发语言',
    prop: 'language',
    width: 100
  },
  {
    label: '项目版本',
    prop: 'version',
    width: 100
  },
  {
    label: '是否延期',
    prop: 'delay',
    width: 100,
    formatter: ['formatBoolean']
  },
  {
    label: '项目状态',
    prop: 'stateDesc',
    width: 100,
    slotName: 'stateDesc'
  },
  {
    label: '项目组人员',
    prop: 'person',
    width: 120,
    slotName: 'person'
  },
  {
    label: '项目人天',
    prop: 'dayCause',
    width: 100
  },
  {
    label: '需求评审日期',
    prop: 'demandReviewDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '立项日期',
    prop: 'projectDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '方案评审计划日期',
    prop: 'schemeReviewPlanDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '方案评审实际日期',
    prop: 'schemeReviewActualDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '开发计划完成日期',
    prop: 'planDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '开发实际完成日期',
    prop: 'planActualDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: 'QAS计划完成日期',
    prop: 'qasActualDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: 'QAS实际完成日期',
    prop: 'qasPlanDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: 'UAT计划完成日期',
    prop: 'uatPlanDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: 'UAT实际完成日期',
    prop: 'uatActualDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '上线计划日期',
    prop: 'linePlanDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '上线实际日期',
    prop: 'lineActualDate',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '是否参与计算考核',
    prop: 'assessmentState',
    width: 100,
    formatter: ['formatBoolean']
  },
  {
    label: 'SVN文档地址',
    prop: 'svnUrl',
    width: 200,
    slotName: 'svnUrl'
  },
  {
    label: '创建人',
    prop: 'createdBy',
    width: 100
  },
  {
    label: '创建日期',
    prop: 'createdTime',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '修改人',
    prop: 'updatedBy',
    width: 100
  },
  {
    label: '修改日期',
    prop: 'updatedTime',
    width: 150,
    formatter: ['formatDate', 'yyyy-MM-dd']
  },
  {
    label: '项目流程遵从度',
    prop: 'files',
    width: 150,
    slotName: 'files'
  },
  {
    label: '项目阶段',
    prop: 'stageDesc',
    width: 105,
    slotName: 'stageDesc',
    fixed: 'right'
  },
  {
    label: '操作',
    prop: 'infoHandle',
    width: 95,
    slotName: 'infoHandle',
    fixed: 'right'
  }
]

export const filesConfigs = [
  {
    label: '1.需求评审',
    key: 'rrAttachmentInfos'
  },
  {
    label: '2.立项评审',
    key: 'prAttachmentInfos'
  },
  {
    label: '3.解决方案评审',
    key: 'srAttachmentInfos'
  },
  {
    label: '4.开发阶段',
    key: 'dpAttachmentInfos'
  },
  {
    label: '5.QAS测试',
    key: 'qasTestAttachmentInfos'
  },
  {
    label: '6.UAT测试',
    key: 'uatTestAttachmentInfos'
  },
  {
    label: '7.上线评审',
    key: 'lrAttachmentInfos'
  },
  {
    label: '8.项目例会纪要',
    key: 'pmAttachmentInfos'
  }
]
