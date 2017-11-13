<template>
    <el-container id="hello">
        <h1>iWantA+</h1>
    </el-container>
</template>

<script>
import { Container } from 'element-ui';

export default {
    name: 'Hello',

    components: { 'el-container': Container },

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
#hello {
    flex: 1;

    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ddd;

    position: absolute;
    left: 230px;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>
