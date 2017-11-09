<template>
    <el-container>
        <el-container v-if="course" direction="vertical">
            <el-row class="inline infobox">
                <CourseSummary :course="course"></CourseSummary>
            </el-row>
            <div class="seperation-before-list">
                <div class="title">
                    Sections
                </div>
            </div>
            <ul class="full-list">
                <li v-for="section in course.Sections" :key="section.id" class="clickable">
                    <SectionSummary :section="section"></SectionSummary>
                </li>
            </ul>
        </el-container>
        <el-row class="long infobox" v-if="error">
            <el-alert
                :title="error.message"
                type="error"
                center
                :closable="false"
                show-icon>
            </el-alert>
        </el-row>
    </el-container>
</template>

<script>
import {
    Button, Form, FormItem, Input, Select, Option, OptionGroup, Autocomplete, Tag,
    Container, Aside, Main, Header, Row, Alert
} from 'element-ui';
import CourseSummary from './CourseSummary';
import SectionSummary from './SectionSummary';

export default {
    name: 'CourseOverviewPage',

    components: {
        'el-button': Button,
        'el-input': Input,
        'el-form': Form,
        'el-form-item': FormItem,
        'el-select': Select,
        'el-option': Option,
        'el-option-group': OptionGroup,
        'el-autocomplete': Autocomplete,
        'el-tag': Tag,
        'el-container': Container,
        'el-aside': Aside,
        'el-main': Main,
        'el-header': Header,
        'el-row': Row,
        'el-alert': Alert,
        CourseSummary,
        SectionSummary
    },

    props: {
    },

    computed: {
    },

    data () {
        return {
            courseId: null,
            course: null,
            error: null
        };
    },

    methods: {
        getCourseId () {
            this.courseId = this.$route.params.id;
        },
        onLoad () {
            this.error = this.course = null;
            this.$api.course.get({ id: this.courseId }).then(({ body }) => {
                this.course = body;
            }).catch(e => {
                this.error = e.body.errors[0];
            });
        }
    },

    watch: {
        '$route': function () {
            this.getCourseId();
            this.onLoad();
        }
    },

    mounted () {
        this.getCourseId();
        this.onLoad();
    }
};
</script>

<style lang="less" scoped>
.infobox {
    padding: 1rem;
}
</style>
