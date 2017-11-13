<template>
    <el-container class="long">
        <ul class="full-list no-divider long" style="padding: 0 5px;">
            <li v-for="comment in comments">
                <CommentView :comment="comment"></CommentView>
            </li>
        </ul>
    </el-container>
</template>

<script>
import {
    Container
} from 'element-ui';
import CommentView from './CommentView';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: 'CommentPosting',

    components: {
        'el-container': Container,
        CommentView
    },

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    props: {
        endpoint: {
            type: [Function, Object]
        }
    },

    data () {
        return {
            comments: null
        };
    },

    mounted () {
        (_.isFunction(this.endpoint) ? this.endpoint() : this.endpoint).then(res => {
            console.log(res);
            this.comments = res.body;
        }).catch(e => {
            this.$error(e.body);
        });
    }
};
</script>

<style lang="less" scoped>
</style>
