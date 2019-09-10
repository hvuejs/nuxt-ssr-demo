<template>
    <div class="error">
        <div>
            <h1>未找到该资源</h1>
            <p><el-button type="primary"><router-link to='/home'>返回首页</router-link></el-button></p>
        </div>
    </div>
</template>

<style lang='scss'>
a {
    text-decoration: none;
    color: #fff;
}
.error {
    width: 100%;
    text-align: center;
    > div {
       margin-top: 200px;
       p {
           margin-top: 20px;
       }
    }
}
</style>