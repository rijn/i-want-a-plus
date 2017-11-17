<template>
    <div :class="{ inline }" :style="{ fontSize: size + 'px' }">
        <img
            :src="desaturated ? iconDesaturated : icon"
            :height="size" :width="size" />
        <h2>iWantA+</h2>
    </div>
</template>

<script>
export default {
    name: 'Logo',

    props: {
        size: {
            type: Number,
            default: 50
        },
        desaturated: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            icon: require('../assets/icon-256x256.gif'),
            iconDesaturated: require('../assets/icon-desaturated-256x256.gif')
        };
    }
};
</script>

<style lang="less" scoped>
div {
    text-align: center;
    h2 {
        padding-top: 1em;
        font-weight: 600 !important;
        color: #777;
    }
    &.inline {
        h2 {
            font-size: 1em !important;
            padding-top: 0;
            padding-left: .5em;
        }
    }
}
</style>
