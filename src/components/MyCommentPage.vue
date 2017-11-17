<template>
    <el-container class="long" direction="vertical">
        <div class="seperation-before-list">
            <div class="title">
                Display setting
            </div>
        </div>
        <el-row class="infobox inline">
            <el-switch
                v-model="displayEmail"
                disabled
                active-text="ON"
                inactive-text="OFF">
            </el-switch>
            <span style="margin-left: 2rem;">Display my email on my comments</span>
        </el-row>
        <div class="seperation-before-list">
            <div class="title">
                List
            </div>
        </div>
        <el-row class="long restrict-width">
            <CommentList :endpoint="$api.user.getComment" deletable editable></CommentList>
        </el-row>
    </el-container>
</template>

<script>
import {
    Switch, Container, Row
} from 'element-ui';
import CommentList from './CommentList';
import { mapGetters } from 'vuex';
// import _ from 'lodash';

export default {
    name: 'MyCommentPage',

    components: {
        'el-container': Container,
        'el-switch': Switch,
        'el-row': Row,
        CommentList
    },

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    props: {
    },

    data () {
        return {
            displayEmail: false
        };
    },

    mounted () {
    }
};
</script>

<style lang="less" scoped>
* {
    font-size: 0.875rem;
}
</style>
