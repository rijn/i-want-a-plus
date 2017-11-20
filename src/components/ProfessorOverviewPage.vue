<template>
    <el-container>
        <el-container v-if="professor" direction="vertical">
            <el-row class="infobox inline border bottom">
                <h1><b>{{ professor.lastName }}</b></h1>, <h1>{{ professor.firstName }}</h1>
            </el-row>
            <el-main>
                <div ref="scatter" v-if="scatterSwitch" :style="{ width: '100%', height: '100%' }">
                </div>
                <ul class="full-list" v-else>
                    <li v-for="course in professor.Courses" :key="course.id" class="clickable" @click="handleClickCourse(course.id)">
                        <CourseSummary :course="course"></CourseSummary>
                    </li>
                </ul>
            </el-main>
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
    Container, Aside, Main, Header, Row, Alert, Switch, Tabs, TabPane
} from 'element-ui';
import CourseSummary from './CourseSummary';

export default {
    name: 'ProfessorOverviewPage',

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
        'el-switch': Switch,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane,
        CourseSummary
    },

    data () {
        return {
            professorId: null,
            professor: null,
            error: null,
            scatterSwitch: false
        };
    },

    methods: {
        getProfessorId () {
            this.professorId = this.$route.params.professorId;
        },
        onLoad () {
            this.error = this.professor = null;
            this.$api.professor.get({ id: this.professorId }).then(({ body }) => {
                this.professor = body;
                this.reducer();
            }).catch(e => {
                this.error = e.body.errors[0];
            });
        },
        onCommentPost () {
            this.$refs.commentList.loadComments();
        },
        handleClickCourse (courseId) {
            this.$router.push({
                name: 'ProfessorCoursePage',
                params: {
                    professorId: this.professorId,
                    courseId
                }
            });
        }
    },

    watch: {
        '$route': function () {
            this.getProfessorId();
            this.onLoad();
        }
    },

    mounted () {
        this.getProfessorId();
        this.onLoad();
    }
};
</script>

<style lang="less" scoped>
</style>
