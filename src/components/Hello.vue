<template>
    <div>
        <h1>iWantA+</h1>
        <p>{{ response }}</p>
        <router-link :to="{ name: 'Login' }"><el-button type="primary">Login</el-button></router-link>
    </div>
</template>

<script>
import { Button, Select } from 'element-ui';

export default {
    name: 'Hello',

    components: { 'el-button': Button, Select },

    data () {
        return {
            response: null
        };
    },

    mounted () {
        console.log(this.$api.version);
        this.$api.version.get().then(r => {
            this.response = r.body;
        });
    }
};
</script>

<style lang="less" scoped>
</style>
