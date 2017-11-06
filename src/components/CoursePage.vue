<template>
    <section class="wrap">
        <header>
            <el-input
                v-model="searchText"
                placeholder="Search for course"
                style="padding: 2px;"
                :disabled="loading"
                @keyup.enter.native="onSearch">
                <i slot="prefix"
                    class="el-input__icon"
                    :class="[ loading ? 'el-icon-loading' : 'el-icon-search']"></i>
            </el-input>
        </header>
        <div class="container">
            <ul class="full-list">
                <li v-for="course in courses" :key="course.id" class="clickable">
                    <CourseSummary :course="course" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { Button, Form, FormItem, Input } from 'element-ui';
import CourseSummary from './CourseSummary';
// import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CoursePage',

    components: {
        'el-button': Button,
        'el-input': Input,
        'el-form': Form,
        'el-form-item': FormItem,
        CourseSummary
    },

    computed: {
    },

    data () {
        return {
            searchText: null,
            loading: false,
            courses: []
        };
    },

    methods: {
        onSearch () {
            this.loading = true;
            this.$api.course.search({ title: this.searchText, group: 'subject,course' }).then(res => {
                this.loading = false;
                this.courses = res.body;
            });
        }
    },

    watch: {
    },

    mounted () {
    }
};
</script>

<style lang="less" scoped>
.wrap {
    background: #fefefe;
    display: flex;
    flex-direction: column;
    will-change: left,right;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.container {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    overflow-y: overlay;
    position: relative;
    z-index: 1;
    min-height: 40%;
}

header {
    padding: 20px;
    margin: 1px;
    box-shadow: inset 0 -0.5px 0 rgba(0,0,0,.15);
}
</style>
