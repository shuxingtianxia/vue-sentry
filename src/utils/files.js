export default {
  // 上传文件
  upload: () => new Promise((resolve) => {
    let elm = document.createElement('input')
    elm.setAttribute('type', 'file')
    elm.setAttribute('multiple', 'multiple')
    elm.setAttribute('accept', '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,image/gif,image/jpeg,image/jpg,image/png,image/svg,application/pdf,application/msword,application/vnd.ms-works,aplication/zip')
    elm.style.display = 'none'
    elm.addEventListener('change', async(e) => {
      const file = e.target.files || e.dataTransfer.files
      document.body.removeChild(elm)
      elm = null
      resolve(file)
    })
    document.body.appendChild(elm)
    elm.click()
  }),
  // 下载后端返回了的blob文件
  download(data, name) {
    if (!data) {
      return
    }
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
  },
  // 下载本地文件
  downloadTemplate(url, name) {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
  }
}
