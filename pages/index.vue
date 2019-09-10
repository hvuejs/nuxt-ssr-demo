<template>
  <div class="container">
     <div class='home'>
      <el-container style="height: 100%;">
        <el-aside style="width: auto;height: 100%;">
            <div class="home-aside">
                  <div class="home-aside-navs" style="width: 152px;">
                      <div><img src="../assets/image/icon/logo.png" alt="" /></div>
                    <ul ref='domNavData'> 
                        <li v-for="(val,i) in navMenuList" :key='i' :data-name='val.indexofurl' @click='handleNav(val)' :class="{'li-active': classIndex == val.indexofurl}">
                            <i :class='val.class'></i>
                            <span>{{ val.title }}</span>
                        </li>
                    </ul>
                      <div class="home-footer">
                          <transition name="fade">
                              <dl v-show="isLoginOut" class="bg_f">
                                  <dd class="ac pointer" @click="loginout">退出登录</dd>
                              </dl>
                          </transition>
                        <span class="pointer" @click='isLoginOut = !isLoginOut'>退出</span>
                      </div>
                  </div>
                  <div class="home-aside-navs2" style="width:190px;" v-show='childrenList.length'>
                      <ul>
                          <li v-for="(val,i) in childrenList" :data-url='val.url' :key='i+"_children"' @click='childrenHandleNav(val)' :class="{'son-active':childrenActive == val.url}">
                              <span>{{ val.title }}</span>
                          </li>
                      </ul>
                  </div>
            </div>
        </el-aside>
        <el-main>
              <div>
                  <router-view />
              </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie';
export default {
   components: {},
   data () {
    return {
      navMenuList: [
          {
              title: '首页',
              class: 'index',
              indexofurl: '',
              children: []
          },
          {
              title: '商城',
              class: 'shop',
              indexofurl: 'shopping',
              children: [
                  {
                      title: '订单列表',
                      url: '/shopping'
                  }
              ]
          },
          {
              title: '服务',
              class: 'serve',
              indexofurl: 'server',
              children: [
                {
                    title: '合作医生',
                    url: '/server'
                },
                {
                    title: '电子处方',
                    url: '/server/repice'
                },
                {
                    title: '处方用药审核',
                    url: '/server/repiceAudit'
                }
            ]
          },
          {
              title: '数据',
              class: 'data',
              indexofurl: 'data',
              children: [
                {
                    title: '科室列表',
                    url: '/datas',
                },
                {
                    title: '测试',
                    url: '/datas/departmentList'
                }
              ]
          },
          {
              title: '财务',
              class: 'finance',
              indexofurl: 'finance',
              children: [
                {
                    title: '鲁医通账户',
                    url: '/finance',
                },
              ]
          },
          {
              title: '会员',
              class: 'vip',
              indexofurl: 'vip',
              children: [
                  {
                    title: '会员',
                    url: '/vip',
                }  
              ]
          },
          {
              title: '采购',
              class: 'supply',
              indexofurl: 'supply',
              children: [
                  {
                    title: '采购',
                    url: '/supply',
                  }
              ]
          },
          {
              title: '通知',
              class: 'msg',
              indexofurl: 'message',
              children: [
                  {
                    title: '通知',
                    url: '/message',
                  }
              ]
          },
          {
              title: '设置',
              class: 'setting',
              indexofurl: 'setting',
              children: [
                  {
                    title: '机构信息',
                    url: '/setting',
                  },
                  {
                    title: '机构信息',
                    url: '/setting/settingMsg',
                  },
              ]
          }
      ],
      isLoginOut: false,
      childrenList: [],
      classIndex: '',
      childrenActive: '',
    }
  },
  watch : {
      '$route': ['isLogon', 'reload']
  },
  mounted () {
    this.reload()
  },
  methods: {
        reload() {
            var urls = this.$route.path; // 页面刷新保持样式
            console.log('q=>', this.$route.path)
            this.navMenuList.forEach(val => {
                if (urls.includes(val.indexofurl)) {
                    this.classIndex = val.indexofurl;
                    this.childrenList = val.children;
                    this.childrenList.forEach(ele => {
                        if (urls.includes(ele.url)) {
                            console.log('c=>', ele.url)
                            this.childrenActive = ele.url;
                        }
                    })
                }
            })
        },
        handleNav (v) {  // nav
            // console.log(v)
            this.classIndex = v.indexofurl;
            this.childrenList = v.children;
            if (v.children.length > 0) {
                this.$router.push(v.children[0].url);
                this.childrenActive = v.children[0].url;
            } else {
                this.$router.push('/')
            }
        },
        childrenHandleNav(val) { // 子nav跳转
            this.childrenActive = val.url;
            this.$router.push(val.url);
        },
        loginout () {   // 退出

        },
        isLogon () {    // 检测是否登录
            var logindata = Cookie.get('_userlogin'); //无登录缓存 跳转登录页面
            if (logindata == "" || logindata == null || logindata == undefined) {
                if (!this.$route.path.includes("login")) {
                    console.log('未登录')
                    this.$router.replace('/login')
                }
            }
           
        },
    },
    created () {
        this.isLogon();
    }
}
</script>

<style lang='scss'>
@import '../assets/css/reset.css';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
html {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
.bg_f {
    background-color: #fff;
}
.ac {
    text-align: center;
} 
.pointer {
    cursor: pointer;
}
.container {
  width: 100%;
  height: 100%;
 
.home {
  height: 100vh;
  background-color: #f9f9f9;
  .home-aside {
      display: -webkit-flex;
      display: flex;
      height: 100%;
      background-color: #fff;
     > div {
          height: 100%;
          display: inline-block;
          vertical-align: middle;
      }
      &-navs {
          background-color: #21242C;
          color: #BFBFC1;
          position: relative;
          .home-footer {
              position: absolute;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              dl {
                  width: 100px;
                  height: 30px;
                border-radius: 5px;
                line-height: 30px;
                font-size: 14px;
                color: #333;
                margin-bottom: 10px;
                cursor: pointer;
                &:after {
                    content: "";
                    border: 8px dashed transparent;
                    border-top: 8px solid #fff;
                    width: 0;
                    height: 0;
                    font-size: 0;
                    display: inline-block;
                    *display: inline;
                    *zoom: 1;
                    vertical-align: 4px;
                }
              }
          }
          > div {
              text-align: center;
              padding: 20px 0;
              img {
                  width: 100px;
              }
          }
          ul {
              li {
                  height: 50px;
                  line-height: 50px;
                  text-align: center;
                  font-size: 18px;
                  cursor: pointer;
                  i {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 16px;
                  }
                    .index {
                        background: url('../assets/image/icon/icon_shouy_x@2x.png') no-repeat;
                        background-size: cover;
                    }
                    .shop {
                        background: url('../assets/image/icon/icon_fuwu_x@2x.png') no-repeat;
                        background-size: cover;
                    }
                    .data {
                        background: url("../assets/image/icon/icon_shuju_x@2x.png") no-repeat;
                        background-size: cover;
                    }
                    .finance {
                        background: url("../assets/image/icon/icon_caiwu_x@2x.png") no-repeat;
                        background-size: cover;
                    }
                    .msg {
                        background: url("../assets/image/icon/icon_tzh.png") no-repeat;
                        background-size: cover;
                    }
                    .vip {
                        background: url("../assets/image/icon/icon_hyh.png") no-repeat;
                        background-size: cover;
                    }
                    .supply {
                        background: url("../assets/image/icon/icon_xgh.png") no-repeat;
                        background-size: cover;
                    }
                    .serve {
                        background: url("../assets/image/icon/icon_fwh.png") no-repeat;
                        background-size: cover;
                    }
                    .setting {
                        background: url("../assets/image/icon/icon_szh.png") no-repeat;
                        background-size: cover;
                    }
                    span {
                        display: inline-block;
                        line-height: 48px;
                        vertical-align: top;
                    }
              }
              li:hover, .li-active {
                  background-color: #4281D7;
                  color: #fff;
                  .index {
                        background-image: url("../assets/image/icon/icon_shouy@2x.png");
                    }
                    .shop {
                        background: url('../assets/image/icon/icon_fuwu@2x.png') no-repeat;
                        background-size: cover;
                    }
                    .data {
                        background-image: url("../assets/image/icon/icon_shuju@2x.png");
                    }
                    .finance {
                        background-image: url("../assets/image/icon/icon_caiwu@2x.png");
                    }
                    .msg {
                        background-image: url("../assets/image/icon/icon_tzb.png");
                    }
                    .setting {
                        background-image: url("../assets/image/icon/icon_szb.png");
                    }
                    .vip {
                        background-image: url("../assets/image/icon/icon_hyb.png");
                    }
                    .supply {
                        background-image: url("../assets/image/icon/icon_xgb.png");
                    }
                    .serve {
                        background-image: url("../assets/image/icon/icon_fwb.png");
                    }
              }
          }
      }
      &-navs2 {
          margin: 0;
          background-color: #fff;
          color: #666;
          ul {
              margin-top: 70px;
              li {
                  padding-left: 30px;
                  height: 40px;
                  line-height: 40px;
                  margin-bottom: 10px;
                  cursor: pointer;
              }
              .son-active {
                  background-color:#EAF4FF;
                  color: #3196FF;
                  background: rgba(49, 150, 255, 0.1) url('../assets/image/icon/icon_enter.png') no-repeat;
                  background-size: 13%;
                  background-position: 150px;
              }
          }
      }
  }
}
}

</style>
