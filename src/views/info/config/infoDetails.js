export const buttonArr = [
  {
    icon: 'el-icon-edit',
    text: '返回',
    clickType: 'back'
  }
]
export const fields = [
  {
    type: 'select',
    label: '系统代码',
    prop: 'systemCode',
    span: 8,
    disabled: true,
    rules: [{ required: true, message: '请选择系统代码', trigger: 'change' }]
  },
  {
    type: 'select',
    label: '系统所属项目群',
    prop: 'systemType',
    span: 8,
    disabled: true,
    rules: [{ required: true, message: '请选择系统所属项目群', trigger: 'change' }]
  },
  {
    type: 'select',
    label: '项目类别',
    prop: 'type',
    span: 8,
    disabled: true,
    rules: [{ required: true, message: `请选择项目类别`, trigger: 'change' }]
  },
  {
    type: 'input',
    label: '项目名称',
    prop: 'name',
    disabled: true,
    span: 8,
    maxLength: 64,
    rules: [{ required: true, message: `请输入项目名称`, trigger: 'blur' }]
  },
  {
    type: 'select',
    label: '项目开发语言',
    prop: 'language',
    disabled: true,
    span: 8,
    multiple: true,
    rules: [{ required: true, message: '请选择项目开发语言', trigger: 'change' }]
  },
  {
    type: 'input',
    label: '项目版本',
    prop: 'version',
    disabled: true,
    span: 8,
    maxLength: 64,
    rules: [{ required: true, message: '请输入项目版本', trigger: 'blur' }]
  },
  {
    type: 'select',
    label: '项目阶段',
    prop: 'stage',
    span: 8,
    disabled: true,
    rules: [{ required: true, message: '请选择项目阶段', trigger: 'change' }]
  },
  {
    type: 'select',
    label: '是否延期',
    prop: 'delay',
    disabled: true,
    span: 8,
    rules: [{ required: true, message: '请选择是否延期', trigger: 'change' }]
  },
  {
    type: 'select',
    label: '项目状态',
    prop: 'state',
    span: 8,
    disabled: true,
    rules: [{ required: true, message: '请选择项目状态', trigger: 'change' }]
  },
  {
    type: 'select',
    label: '项目领域',
    prop: 'field',
    disabled: true,
    span: 8,
    rules: [{ required: true, message: '请选择项目领域', trigger: 'change' }]
  },
  {
    type: 'textarea',
    label: '项目介绍',
    prop: 'description',
    disabled: true,
    span: 8,
    maxLength: 64,
    rules: [{ required: true, message: '请输入项目介绍', trigger: 'blur' }]
  }
]
export const fieldsInfo = [
  {
    type: 'input',
    label: '项目人天',
    prop: 'dayCause',
    disabled: true,
    span: 8,
    maxLength: 64,
    placeholder: '请输入人天，例如:50',
    rules: [{ required: true, message: '请输入项目人天', trigger: 'blur' }]
  },
  {
    type: 'select',
    label: '项目等级',
    prop: 'level',
    disabled: true,
    span: 8,
    rules: [{ required: true, message: '请选择项目等级', trigger: 'change' }]
  }
]
export const fieldsAssessment = [
  {
    type: 'select',
    label: '是否参与考核',
    prop: 'assessmentState',
    disabled: true,
    rules: [{ required: true, message: '请选择是否参与考核', trigger: 'change' }]
  }
]
export const rrAttachmentFields = [
  {
    type: 'datetime',
    label: '需求评审日期',
    prop: 'demandReviewDate',
    disabled: true,
    rules: [{ required: true, message: '请选择需求评审日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'rrRadioOne',
    span: 24
  }
]
export const prAttachmentFields = [
  {
    type: 'datetime',
    label: '立项日期',
    prop: 'projectDate',
    disabled: true,
    rules: [{ required: true, message: '请选择立项日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'prRadioOne',
    span: 24
  }
]
export const srAttachmentFields = [
  {
    type: 'datetime',
    label: '计划日期',
    prop: 'schemeReviewPlanDate',
    disabled: true,
    rules: [{ required: true, message: '请选择计划日期', trigger: 'change' }]
  },
  {
    type: 'datetime',
    label: '实际日期',
    prop: 'schemeReviewActualDate',
    disabled: true,
    rules: [{ required: false, message: '请选择实际日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'srRadioOne',
    span: 24
  }
]
export const dpAttachmentFields = [
  {
    type: 'datetime',
    label: '计划日期',
    prop: 'planDate',
    disabled: true,
    rules: [{ required: true, message: '请选择计划日期', trigger: 'change' }]
  },
  {
    type: 'datetime',
    label: '实际日期',
    prop: 'planActualDate',
    disabled: true,
    rules: [{ required: false, message: '请选择实际日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'dpRadioOne',
    span: 24
  }
]
export const qasTestAttachmentFields = [
  {
    type: 'datetime',
    label: '计划日期',
    prop: 'qasPlanDate',
    disabled: true,
    rules: [{ required: true, message: '请选择计划日期', trigger: 'change' }]
  },
  {
    type: 'datetime',
    label: '实际日期',
    prop: 'qasActualDate',
    disabled: true,
    rules: [{ required: false, message: '请选择实际日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'qasRadioOne',
    span: 24
  }
]
export const uatTestAttachmentFields = [
  {
    type: 'datetime',
    label: '计划日期',
    prop: 'uatPlanDate',
    disabled: true,
    rules: [{ required: true, message: '请选择计划日期', trigger: 'change' }]
  },
  {
    type: 'datetime',
    label: '实际日期',
    prop: 'uatActualDate',
    disabled: true,
    rules: [{ required: false, message: '请选择实际日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'uatRadioOne',
    span: 24
  }
]
export const lrAttachmentFields = [
  {
    type: 'datetime',
    label: '计划日期',
    prop: 'linePlanDate',
    disabled: true,
    rules: [{ required: true, message: '请选择计划日期', trigger: 'change' }]
  },
  {
    type: 'datetime',
    label: '实际日期',
    prop: 'lineActualDate',
    disabled: true,
    rules: [{ required: false, message: '请选择实际日期', trigger: 'change' }]
  },
  {
    label: '项目文档',
    prop: 'lrRadioOne',
    span: 24
  }
]
