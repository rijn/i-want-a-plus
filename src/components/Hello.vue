<template>
    <el-container id="hello">
        <Logo desaturated :style="{ opacity: 0.3 }"></Logo>
    </el-container>
</template>

<script>
import { Container } from 'element-ui';
import Logo from './Logo';

export default {
    name: 'Hello',

    components: { 'el-container': Container, Logo },

    data () {
        return {
            response: null
        };
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
