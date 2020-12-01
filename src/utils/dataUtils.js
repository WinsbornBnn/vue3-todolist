/**
 * 创建存储器 基于LocalStorage的封装
 * 允许存储基于JSON格式的数据
 */
export default {
  getItem (key) {
    const item = localStorage.getItem(key)
    // 获取到数据后，直接转换成JSON对象
    return item ? JSON.parse(item) : null
  },
  setItem (key, value) {
    // 需要存储的数据，将会转换成字符串
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 删除指定key值的数据
  removeItem (key) {
    localStorage.removeItem(key)
  },
  // 清空当前系统的存储
  clearAllitem () {
    localStorage.clear()
  }
}
