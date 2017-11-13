<template>
    <el-container>
        <el-container v-if="course" direction="vertical">
            <el-row class="inline infobox">
                <CourseSummary :course="course"></CourseSummary>
            </el-row>
            <el-row class="inline infobox">
                <el-tag v-for="(groupPreset, displayText) in groupPresets" size="small"
                    :key="displayText"
                    :type="groupPreset.enabled ? '' : 'info'"
                    class="clickable"
                    @click.native="toggle(groupPreset)">
                    {{ displayText }}
                </el-tag>
                <div style="float: right;">
                    <el-switch
                        disabled
                        active-text="Score"
                        inactive-text="Grade">
                    </el-switch>
                </div>
            </el-row>
            <el-row :style="{ paddingRight: '20px' }">
                <div ref="lineGraph" :style="{ width: '98%', margin: '1%', height: '300px' }">
                </div>
            </el-row>
            <el-tabs value="all" type="card">
                <el-tab-pane label="All Sections" name="all">
<!--                     <div class="seperation-before-list">
                        <div class="title">
                            Sections
                        </div>
                    </div> -->
                    <ul class="full-list">
                        <li v-for="section in course.Sections" :key="section.id" class="clickable">
                            <SectionSummary :section="section"></SectionSummary>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="Reduced" name="reduced" disabled>
<!--                     <div class="seperation-before-list">
                        <div class="title">
                            Reduced
                        </div>
                    </div> -->
                    <ul class="full-list">
                        <li v-for="section in reduced" class="clickable">
                            <SectionSummary :section="section"></SectionSummary>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="Comments" name="comments">
                    <el-row class="inline infobox">
                        <CommentPosting :endpoint="$api.course.addComment({ id: courseId })" @post="onCommentPost"></CommentPosting>
                    </el-row>
                    <el-row>
                        <CommentList :endpoint="$api.course.getComment({ id: courseId })" ref="commentList"></CommentList>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
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
import SectionSummary from './SectionSummary';
import CommentPosting from './CommentPosting';
import CommentList from './CommentList';
import _ from 'lodash';
import { pastSectionReducer, mapObjectOrArray, gradeText } from '../../models/utils';
import Plotly from 'plotly.js';

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
        'el-switch': Switch,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane,
        CourseSummary,
        SectionSummary,
        CommentPosting,
        CommentList
    },

    props: {
    },

    data () {
        return {
            courseId: null,
            course: null,
            error: null,
            groupPresets: {
                Year: {
                    key: 'year',
                    enabled: false
                },
                Term: {
                    key: 'term',
                    enabled: false
                },
                Professor: {
                    key: 'Professors.0.lastName',
                    enabled: true
                }
            },
            reduced: []
        };
    },

    computed: {
        group: function () {
            return _.map(_.filter(this.groupPresets, 'enabled'), 'key');
        }
    },

    methods: {
        getCourseId () {
            this.courseId = this.$route.params.id;
        },
        reducer () {
            let dataSets = _.map(
                _.groupBy(this.course.Sections, v => JSON.stringify(_.pick(v, this.group))),
                (sections, extended) => ({
                    ...pastSectionReducer(_.map(sections, 'PastSection')),
                    ...JSON.parse(extended)
                })
            );
            _.each(dataSets, dataSet => _.set(dataSet, 'name', _.join(_.map(this.group, g => _.get(dataSet, g)), ',')));
            this.reduced = dataSets;
            this.plot(dataSets);
        },
        toggle (groupPreset) {
            groupPreset.enabled = !groupPreset.enabled;
        },
        plot (dataSets) {
            dataSets = dataSets.map(dataSet => _.has(dataSet, 'crn') ? dataSet.PastSection : dataSet);
            let data = _.map(dataSets, dataSet => {
                let yData = _.map(mapObjectOrArray(dataSet), v => v / dataSet.totalStudentCount);
                let xData = [...Array(yData.length).keys()];
                return _.assign({
                    x: xData,
                    y: yData,
                    type: 'bar'
                }, dataSet.name ? { name: dataSet.name } : {});
            });

            let layout = {
                xaxis: {
                    showgrid: true,
                    zeroline: false,
                    showline: true,
                    linecolor: '#eee',
                    linewidth: 0.5,
                    title: 'Grade',
                    showticklabels: true,
                    tickmode: 'array',
                    ticktext: gradeText,
                    tickvals: [...Array(gradeText.length).keys()]
                },
                yaxis: {
                    showgrid: false,
                    tickformat: ',.0%'
                },
                autosize: true,
                margin: {
                    l: 70,
                    r: 40,
                    b: 50,
                    t: 10,
                    pad: 4
                },
                hovermode: 'closest'
            };

            this.$nextTick(() => {
                Plotly.newPlot(this.$refs.lineGraph, data, layout, { showLink: false, displayModeBar: false });
            });
        },
        onLoad () {
            this.error = this.course = null;
            this.$api.course.get({ id: this.courseId }).then(({ body }) => {
                this.course = body;
                this.reducer();
            }).catch(e => {
                this.error = e.body.errors[0];
            });
        },
        onCommentPost () {
            this.$refs.commentList.loadComments();
        }
    },

    watch: {
        '$route': function () {
            this.getCourseId();
            this.onLoad();
        },
        group: function () {
            this.reducer();
        }
    },

    mounted () {
        this.getCourseId();
        this.onLoad();
    }
};
</script>

<style lang="less" scoped>
</style>
