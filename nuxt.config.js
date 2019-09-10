
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/css/reset.css',
    'element-ui/lib/theme-chalk/index.css'    
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  /* 需要使用 aixos必须配置以下两项axios和proxy*/
  axios: {
    prefix: '/api/',
    proxy: true
  },
  proxy: { // 接口跨域处理
      '/api/': {
      target: 'http://test99.yunyikang.cn',
      pathRewrite: {
      '^/api/': ''
    }
  }
},

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    // mode: 'hash',
    base: '/shanghu/'
    // extendRoutes (routes, resolve) { // 错误页面提示
    //   routes.push({
    //     name: 'err404',
    //     path: '*',
    //     component: resolve(__dirname, './pages/err404.vue')
    //   })
    // }
  }
}
