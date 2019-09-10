<template>
  <div class='server'>
      设置二爷
  </div>
</template>
<script>
import http from '~/plugins/axios.js'
export default {
  // 这里引入context是上下文参数，代替了this，
  // 因为在asyncData方法是在组件初始化时调用，所以没法通过this来引用组件实例对象。// 在服务端或路由更新之前被调用
  async asyncData(context) { 
      return await context.$axios.post('/shv2/index/shop_index', null)
        .then(res => {
          return { indexData: res.data }
        })
    },
  data () {
    return {
      indexData: ''
    }
  },
  created () {
    
    console.log(this.indexData)
  },
  mounted () {
    http.get('/shv2/index/shop_index', {}).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    // console.log(api)
  },
  methods: {
    
    
  }
}
</script>
<style>
.server {
    width: 300px;
}
</style>
