<template>
    <div class="logins">
        <span class="icon-logos"><img src="../../assets/image/icon/icon_dblogo@3x.png" alt="" /></span>
        <div class="logins-msg">机构登录</div>
        <div class="user-login">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">
                <el-form-item label="" prop="userPhone">
                    <el-input  type="text" v-model="ruleForm2.userPhone" auto-complete="off" placeholder="账号/手机号"></el-input>
                </el-form-item>
                <el-form-item label="" prop="userPass">
                    <el-input type="password" v-model="ruleForm2.userPass" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="code">
                    <el-input v-model="ruleForm2.code" placeholder="请输入验证码"></el-input>
                    <img class="codePic" ref='codePic' :src="url+'/captcha.html'" alt="" onclick='this.src=this.src+"?"' />
                </el-form-item>
                <el-form-item style="color: #888;">
                    <span class="pointer" @click='handleClickRegister'>注册账号</span>
                    <span class="pointer fr">忘记密码</span>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button style="width: 100%;height: 44px;" :disabled="disabled" :loading="disabled" type="primary" @click="submitForm('ruleForm2')">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import http from '~/plugins/axios.js';
import Cookie from 'js-cookie';
export default {
    data () {
    var checkCode = (rule, value, callback) => {
        var isNumber = /^\d{4}$/; //验证数字
        if (!value) {
          return callback(new Error('验证码不能为空'));
        } else if (!isNumber.test(value)) {
            callback(new Error('请输入四位数字值'));
        } else {
            callback()
        }
      };
      var validatePhone = (rule, value, callback) => {
          var exgphone = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号验证
        if (value === '') {
          callback(new Error('请输入账号/手机号'));
        } else if (!exgphone.test(value)) {
            callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
            url: http.baseURL,
            disabled: false,
            ruleForm2: {
                userPhone: '',
                userPass: '',
                code: ''
            },
            rules2: {
            userPhone: [
                { validator: validatePhone, trigger: 'blur' }
            ],
            userPass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            code: [
                { validator: checkCode, trigger: 'blur' }
            ]
            }
        }
    },
    mounted () {
        let that = this;
        document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which;
            if (keycode == 13) {
                that.submitForm('ruleForm2');// 登录方法名
                return false;
            }
        };
    },
    methods: {
        submitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.disabled = true;
                var c = self.ruleForm2.code;
                var obj = { phone: self.ruleForm2.userPhone, code: c, pwd: self.ruleForm2.userPass }
                console.log(obj)
               http.post('/shv2/login/login', obj).then(res => {
                   console.log(res)
                   this.disabled = false;
                   if (res.code == 1) {
                       this.$router.replace('/');
                       Cookie.set('_userlogin', JSON.stringify(res.data));
                   } else if (res.code == 3) {
                       self.$message.error(res.msg)
                       self.$refs.codePic.src = self.url+'/captcha.html';
                   } else if (res.code == 4)  {
                       self.$message.error(res.msg)
                       self.$refs.codePic.src = self.url+'/captcha.html';
                   } else {
                       self.$message.error(res.msg)
                   }
               }).catch(err => {
                   console.log(err)
               })
            } else {
                this.disabled = false;
                return false;
            }
            });
        },
        handleClickRegister () {
            this.$router.push('/register');
        },
    }
}
</script>
<style lang="scss" scoped>
.fr {
    float: right;
}
.pointer {
    cursor: pointer;
}
.logins {
    width: 460px;
    height: 100%;
    background-color: #fff;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    padding: 60px;
    position: relative;
    .icon-logos {
        display: block;
        width: 207px;
        height: 60px;
        position: absolute;
        top: -28px;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .logins-msg {
        text-align: center;
        font-size: 16px;
        color: #4E8CD8;
        margin-bottom: 27px;
    }
    .user-login {
        width: 100%;
        .codePic {
            position: absolute;
            right: 2px;
            top: 3px;
            height: 35px;
        }
    }
}
</style>