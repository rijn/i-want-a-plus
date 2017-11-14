<template>
    <el-container v-if="comments">
        <ul class="full-list no-divider long" style="padding: 0 5px;" v-if="comments.length">
            <li v-for="(comment, idx) in comments">
                <CommentView :comment="comment"
                    :deletable="deletable" @delete="loadComments"
                    @dblclick.native="onDblclick(idx)" v-if="!comment.editing"></CommentView>
                <CommentPosting :comment="comment" :endpoint="$api.comment.update({ id: comment.id })" v-else></CommentPosting>
            </li>
        </ul>
        <div class="infobox" v-else>
            <span class="tip">No content</span>
        </div>
    </el-container>
    <el-container v-else>
    </el-container>
</template>

<script>
import {
    Button, Container
} from 'element-ui';
import CommentView from './CommentView';
import CommentPosting from './CommentPosting';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: 'CommentList',

    components: {
        'el-container': Container,
        'el-button': Button,
        CommentView,
        CommentPosting
    },

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    props: {
        endpoint: {
            type: [Function, Object]
        },
        deletable: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            comments: null
        };
    },

    methods: {
        loadComments () {
            (_.isFunction(this.endpoint) ? this.endpoint.apply(this) : this.endpoint).then(res => {
                res.body = _.map(res.body, comment => _.assign(comment, { editing: false }));
                console.log(res.body);
                this.comments = res.body;
            }).catch(e => {
                this.$error(e.body);
            });
        },
        onDblclick (idx) {
            this.comments[idx].editing = true;
            // this.$set(this, `comments[${idx}].editing`, true);
        }
    },

    mounted () {
        this.loadComments();
    }
};
</script>

<style lang="less" scoped>
</style>
