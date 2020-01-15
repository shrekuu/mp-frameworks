//logs.js
import create from '../../utils/create'
import store from '../../store/index'

const util = require('../../utils/util.js')

create.Page(store, {
  use: ['logs'],
  onLoad: function () {
    this.store.data.logs = (wx.getStorageSync('logs') || []).map(log => {
      return util.formatTime(new Date(log))
    })
  }
})
