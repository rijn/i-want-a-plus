<template>
    <el-container class="wrap">
        <el-header class="border bottom" height="auto" v-if="$route.meta.header">
            <h2>{{ $route.meta.header }}</h2>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>


<script>
import {
    Container, Main, Header
} from 'element-ui';

export default {
    name: 'CoursePage',

    components: {
        'el-container': Container,
        'el-main': Main,
        'el-header': Header
    },

    watch: {
        '$route': function () {
        }
    },

    mounted () {
    }
};
</script>

<style lang="less" scoped>
.wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 230px;
    right: 0;
}
</style>
