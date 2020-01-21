const util = {

  // 用于生成咨询消息的 id
  getGUID (length = 30) {
    let guid = ''
    let n = ''
    for (let i = 1; i <= length; i++) {
      n = Math.floor(Math.random() * 16.0).toString(16)
      guid += n
    }
    return guid
  },

  showLoading (message = '正在加载...') {
    this.hideToast()
    wx.showLoading({
      title: message,
      mask: true,
    })
  },

  hideLoading () {
    try {wx.stopPullDownRefresh() } catch (e) {}
    wx.hideLoading()
    wx.hideToast()
  },

  // 跟 hideLoading 一样
  hideToast () {
    this.hideLoading()
  },

  showToast (message, duration = 2000, callback = null) {
    this.hideLoading()
    wx.showToast({
      title: message,
      icon: 'none',
      duration,
    })

    if (typeof callback === 'function') {
      setTimeout(callback, duration)
    }
  },
}

export default utils
