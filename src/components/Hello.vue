<template>
    <div>
        <h1>iWantA+</h1>
        <p>{{ response }}</p>
        <router-link :to="{ name: 'Login' }"><el-button type="primary">Login</el-button></router-link>
    </div>
</template>

<script>
import { Button } from 'element-ui';

export default {
    name: 'Hello',

    components: { 'el-button': Button },

    data () {
        return {
            response: null
        };
    },

    mounted () {
    }
};
</script>

<style lang="less" scoped>
</style>
