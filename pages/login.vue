<template>
    <div class="login-wrap">
        <v-bg />
        <div class="login-content">
            <v-logins />
        </div>
        <div class="footer">
            软件版本号：1.2.0 登录即代表您已阅读并同意 《云医康用户注册协议》《法律声明及隐私权政策》
        </div>
    </div>
</template>
<script>
export default {
    components: {
        'v-bg': ()=>import('../components/bgPic'),
        'v-logins': () => import('../components/login/logins'),
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.login-wrap {
    width: 100%;
    height: 100vh;
    position: relative;
    .login-content {
        width: 460px;
        height: 440px;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #fff;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    .footer {
        position: absolute;
        bottom: 40px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 14px;
    }
}
</style>