<template>
    <div class='index-home'>
        机构首页
    </div>
</template>
<script>
import http from '~/plugins/axios.js';
export default {
    created () {
        http.post('/shv2/index/shop_index', null).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>
<style lang="scss" scoped>
.index-home {
    width: 100%;
}
</style>