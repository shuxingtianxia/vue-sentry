export default {
  formatStatus({ cellValue }, list) {
    const data = list.find(item => item.value === cellValue)
    if (data) return data.label
  }
}
