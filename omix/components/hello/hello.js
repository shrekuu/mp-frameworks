
// components/hello/hello.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    a: { b: Math.random() }
  },

  ready: function () {
    this.context.emitter.emit('foo', { a: 'b' })
    setTimeout(()=>{
      this.oData.a.b = 1
    },3000)
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
