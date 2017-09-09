<template>
    <div id="app">
        <div id="core">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="less">
@import './styles/index.less';
</style>
