<template>
    <div class="register">
        <v-bg />
        <div class="login-content">
            <v-register />
        </div>
    </div>
</template>
<script>
export default {
    components: {
        'v-bg': ()=>import('../components/bgPic'),
        'v-register': () => import('../components/registers/register'),
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.register {
    width: 100%;
    font-size: 16px;
    height: 100vh;
    position: relative;
    .login-content {
        width: 640px;
        height: 480px;
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

