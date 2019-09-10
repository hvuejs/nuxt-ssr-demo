<template>
    <div class="register">
        <span class="icon-logos"><img src="../../assets/image/icon/icon_dblogo@3x.png" alt="" /></span>
        <div class="register-msg">机构注册</div>
        <div class="user-login">
            <el-form :model="ruleForm2" status-icon :rules="rules2" auto-complete="off" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="userPhone">
                    <el-input  type="text" v-model="ruleForm2.userPhone" auto-complete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input  type="text" style="width: 285px; vertical-align: middle;" :readonly="readonly" v-model="ruleForm2.code" auto-complete="off" placeholder=""></el-input>
                    <span class="codePic" @click='handleClickCode'>{{ btnTxt }}</span>
                </el-form-item>
                <el-form-item label="登录密码" prop="userPass">
                    <el-input type="password" v-model="ruleForm2.userPass" auto-complete="off" placeholder=""></el-input>
                </el-form-item>
                <div class="register-checked">
                    <el-checkbox style="color: #888;" v-model="checked">我已阅读并同意</el-checkbox>
                    <router-link to=''>《云医康用户注册协议》</router-link>
                    <router-link to=''>《法律声明及隐私权政策》</router-link>
                </div>
                <div class="footer-btn">
                    <el-button style="width: 336px;height: 44px;" :disabled="disabled" :loading="disabled" type="primary" @click="submitForm('ruleForm2')">立即注册</el-button>
                </div>
                <div class="ac">
                    <span style="color:#888;">已有账号</span>
                    <router-link to='/login'>立即登录</router-link>
                </div>
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
          var exgphone = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (value === '') {
          callback(new Error('请输入账号/手机号'));
        } else if (!exgphone.test(value)) {
            callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
          var ispass = /^[0-9a-zA-Z]+$/;
          console.log(value)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6 || value.length > 18) {
            callback(new Error('请设置正确的密码，密码长度为6~18位数'));
        } else if (!ispass.test(value)) {
            callback(new Error('请设置正确的密码，只能设置数子和字母，不能包含特殊字符'));
        } else {
          callback();
        }
      };
      return {
            checked: true,
            btnTxt: '获取验证码',
            url: http.baseURL,
            disabled: false,
            ruleForm2: {
                userPhone: '',
                userPass: '',
                code: ''
            },
            rules2: {
                
            userPhone: [
                { required: true,validator: validatePhone, trigger: 'blur' }
            ],
            userPass: [
                { required: true,validator: validatePass, trigger: 'blur' }
            ],
            code: [
                { required: true,validator: checkCode, trigger: 'blur' }
            ]
            },
            noneclick: false,
            readonly: true,
        }
    },
    mounted () {
        var t = setTimeout(() => {
            this.readonly = false;
            clearTimeout(t)
        }, 1000)
    },
    methods: {
        handleClickCode () {    // 获取验证码
            if (this.noneclick) {
                return;
            }
            var isphone = /^1[3456789]\d{9}$/;
            if (!this.ruleForm2.userPhone) {
                this.$message.error('请输入手机号')
                return;
            }
            if (!isphone.test(this.ruleForm2.userPhone)) {
                this.$message.error('请输入正确的手机号')
                return;
            }
            var time = 60;
            this.btnTxt = "(60s)重获"
            var _this = this;
            var settime = setInterval(function () {
                if (!time) {
                    _this.noneclick = false;
                    _this.btnTxt = "重新获取";
                    clearInterval(settime);
                    return;
                }
                _this.noneclick = true;
                time--;
                _this.btnTxt = "(" + time + "s)重获";
            }, 1000);
            http.post('/shv2/Alidayu/sendSMS', { telphone: _this.ruleForm2.userPhone }).then(res => {
                if (res.code == 1) {
                    console.log('已发送')
                } else {

                }
            }).catch(err => { console.log(err) });
        },
        submitForm(formName) {
            var self = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.disabled = true;
                var c = self.ruleForm2.code;
                var obj = { phone: self.ruleForm2.userPhone, code: c, pwd: self.ruleForm2.userPass }
                console.log(obj)
               http.post('/shv2/login/register', obj).then(res => {
                   console.log(res)
                   this.disabled = false;
                   if (res.code == 1) {
                       self.$router.replace('/');
                       Cookie.set('_userlogin', JSON.stringify(res.data));
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
.ac {
    text-align: center;
    margin-top: 20px;
    a {
        color:#4e8cd8;
    }
}
.register {
    width: 640px;
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
    .register-msg {
        text-align: center;
        font-size: 16px;
        color: #4E8CD8;
        margin-bottom: 27px;
    }
    .user-login {
        width: 100%;
        .codePic {
            display: inline-block;
            position: absolute;
            right: 2px;
            top: 1px;
            width: 130px;
            height: 40px;
            border: 1px solid #DCDFE6;
            text-align: center;
            cursor: pointer;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            color: #808080;
            &:hover {
                color: #4E8CD8;
            }
        }
        .register-checked {
            width: 100%;
            padding: 20px;
            padding-left: 40px;
            font-size: 14px;
            a{
                color: #4e8cd8;
            }
        }
        .footer-btn {
            width: 100%;
            text-align: center;
        }
    }
}
</style>