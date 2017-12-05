<template>
    <div>
        <el-button type="text" class="button" @click="handleClick">
            <i class="icon ion-ios-star" v-if="findFavorite(params)"></i>
            <i class="icon ion-ios-star-outline" v-else></i>
        </el-button>
    </div>
</template>

<script>
import { Button } from 'element-ui';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'FavoriteButton',

    components: {
        'el-button': Button
    },

    props: {
        params: {
            type: Object
        }
    },

    computed: {
        ...mapGetters('favorite', [ 'findFavorite' ])
    },

    methods: {
        ...mapActions('favorite', [ 'addFavorite', 'removeFavorite' ]),
        handleClick () {
            let f = this.findFavorite(this.params);
            if (f) {
                this.removeFavorite(f);
            } else {
                this.addFavorite(this.params);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.button {
    font-size: 1.5rem;
}
</style>
