export default {
  data() {
    return {
      /**
       * 组件定义获取字典关键字及绑定的值
       * dictionaryKey: [{key:'CARType',setModel:function}]
       * 接受数据的数组
       * CARTypeList: [] ------放在组件data中声明
       */
      dictionaryKey: []
    }
  },
  computed: {

  },
  methods: {
    // 获取数据字典，后台没有批量接口
    getDictionary() {
      this.dictionaryKey.length > 0 && this.dictionaryKey.forEach(item => {
        this.$api.getItemValue({ dictName: item.key })
          .then(res => {
            // 是否有默认
            let defaultValue = ''
            for (let i = 0, len = res.data.length; i < len; i++) {
              if (res.data[i].isdefault === '1') {
                defaultValue = res.data[i].itemValue
                break
              }
            }
            if (item.setModel.length > 1) {
              item.setModel(res.data, defaultValue)
            } else {
              item.setModel(res.data)
            }
          })
      })
    }
  }
}
