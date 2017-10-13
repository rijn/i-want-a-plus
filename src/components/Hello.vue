<template>
    <div>
        <h1>iWantA+</h1>
        <p>{{ response }}</p>
    </div>
</template>

<script>
export default {
    name: 'Hello',

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
