<template>
    <el-container class="wrap">
        <el-container>
            <el-header ref="courseHeader" height="auto">
                <div>
                    <el-autocomplete
                        class="comp long inline-input"
                        v-model="searchInputValue"
                        :fetch-suggestions="querySearch"
                        placeholder="Search for course"
                        @select="handleSelect"
                        :select-when-unmatched="true">
                        <i slot="prefix"
                            class="el-input__icon el-icon-search"></i>
                        <template slot-scope="props">
                            <b># <span class="key">{{ props.item.displayKey }}</span></b> =
                            <span class="name">{{ props.item.displayValue }}</span>
                        </template>
                    </el-autocomplete>
                </div>
                <div class="inline padding">
                    <el-select v-model="sortSelectValue" size="mini" placeholder="Default sort" class="comp"
                        :disabled="scatterSwitch">
                        <el-option-group
                            v-for="group in sortOption"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <i class="icon" :class="[ item.icon ]"
                                    style="float: right; color: #8492a6; font-size: 13px"></i>
                                <span style="float: left;">{{ item.insetLabel }}</span>
                            </el-option>
                        </el-option-group>
                    </el-select>
                    <div>
                        <el-tag
                            v-for="filter in filters"
                            :key="filter.value"
                            size="small"
                            :type="filter.type"
                            @close="handleFilterClose(filter)"
                            closable>
                            <b>#{{filter.displayKey}}</b> = {{filter.displayValue}}
                        </el-tag>
                    </div>
                    <div style="float: right;">
                        <el-switch
                            v-model="scatterSwitch"
                            active-text="Plot"
                            inactive-text="List">
                        </el-switch>
                        <!-- <el-button @click="onSearch" size="small">Search</el-button> -->
                    </div>
                </div>
            </el-header>
            <el-main>
                <div ref="scatter" v-if="scatterSwitch" :style="{ width: '100%', height: '100%' }">
                </div>
                <ul class="full-list" v-else>
                    <li v-for="course in courses" :key="course.id" class="clickable" @click="handleClickCourse(course.id)">
                        <CourseSummary :course="course"></CourseSummary>
                    </li>
                </ul>
            </el-main>
        </el-container>
        <el-container class="border left" v-if="$route.params.id">
            <el-header>
                <router-link :to="{ name: 'Course' }">
                    <el-button type="text" icon="el-icon-arrow-left">Collapse</el-button>
                </router-link>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {
    Button, Form, FormItem, Input, Select, Option, Loading, OptionGroup, Autocomplete, Tag,
    Container, Aside, Main, Header, Switch
} from 'element-ui';
import CourseSummary from './CourseSummary';
import _ from 'lodash';
// eslint-disable-next-line
import { SubjectMapBlurSearch, SubjectMapForward } from './subject';
import Plotly from 'plotly.js';
// import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CoursePage',

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
        'el-switch': Switch,
        CourseSummary
    },

    computed: {
    },

    data () {
        return {
            searchInputValue: null,
            loading: false,
            courses: [],
            loadingInstance: null,
            sortOption: [{
                label: 'Average GPA',
                options: [{
                    value: 'averageGpa,DESC',
                    icon: 'ion-android-arrow-down',
                    label: 'GPA: High to low',
                    insetLabel: 'High to low'
                }, {
                    value: 'averageGpa,ASC',
                    icon: 'ion-android-arrow-up',
                    label: 'GPA: Low to high',
                    insetLabel: 'Low to high'
                }]
            }],
            filterMap: {
                course: {
                    key: 'course',
                    displayKey: 'Course Number',
                    type: 'default',
                    query: (v) => _.toNumber(v) && [_.assign(_.cloneDeep(this.filterMap.course), {
                        displayValue: v,
                        value: '#course=' + v
                    })],
                    remapDisplayValue: (dv) => dv
                },
                subject: {
                    key: 'subject',
                    displayKey: 'Subject',
                    type: 'success',
                    query: (v) => _.map(SubjectMapBlurSearch(v), ({ value, key }) => {
                        return _.assign(_.cloneDeep(this.filterMap.subject), {
                            displayValue: value,
                            value: '#subject=' + key
                        });
                    }),
                    remapDisplayValue: (dv) => dv // _.get(SubjectMapForward(dv), 'value')
                }
            },
            filters: [],
            sortSelectValue: null,
            scatterSwitch: false
        };
    },

    methods: {
        createLoadingInstance () {
            console.log(this.$refs);
            this.loadingInstance = Loading.service({
                target: this.$refs.courseHeader.$el,
                background: 'rgba(255, 255, 255, 0.8)'
            });
        },
        closeLoadingInstance () {
            this.loadingInstance && this.loadingInstance.close();
        },
        querySearch (v, cb) {
            if (_.isEmpty(v)) {
                // eslint-disable-next-line
                cb([]);
                return;
            }
            // eslint-disable-next-line
            cb(_.compact(_.reduce(this.filterMap, (collection, { query }) => _.concat(collection, query(v)), [])));
        },
        handleFilterClose (filter) {
            this.filters.splice(this.filters.indexOf(filter), 1);
        },
        handleSelect ({ value }) {
            if (_.startsWith(value, '#')) {
                let [ key, v ] = _.split(value.replace('#', ''), '=');
                if (_.has(this.filterMap, key)) {
                    this.filters.push(_.assign(_.cloneDeep(this.filterMap[key]), {
                        value: v,
                        displayValue: this.filterMap[key].remapDisplayValue(v)
                    }));
                    value = null;
                    this.searchInputValue = '';
                    return;
                }
            }
            this.searchInputValue = value;
            this.onSearch();
        },
        onSearch () {
            if (!this.searchInputValue && !this.filters.length) {
                this.courses = [];
                return;
            }
            this.createLoadingInstance();
            this.$api.course.search(_.assign(
                // {
                //     group: 'subject,course,title'
                // },
                this.searchInputValue && { title: this.searchInputValue },
                this.sortSelectValue && { order: this.sortSelectValue },
                _.reduce(this.filters, (result, { key, value }) => {
                    if (!_.has(result, key)) result[key] = value;
                    else result[key] += ',' + value;
                    return result;
                }, {})
            )).then(res => {
                this.closeLoadingInstance();
                this.courses = res.body;
                this.renderScatter();
            });
        },
        renderScatter () {
            if (!this.scatterSwitch) return;
            let data = _.map(_.values(_.groupBy(this.courses, 'subject')), courses => ({
                mode: 'markers',
                type: 'scatter',
                name: courses[0].subject,
                x: _.map(courses, 'averageGpa'),
                y: _.map(courses, 'totalStudentCount'),
                ids: _.map(courses, 'id'),
                text: _.map(courses, course => `${course.subject} ${course.course}: ${course.title}`),
                marker: {
                    sizemode: 'area',
                    size: _.map(courses, 'totalStudentCount')
                }
            }));
            let layout = {
                xaxis: {
                    showgrid: true,
                    zeroline: true,
                    showline: true,
                    mirror: 'ticks',
                    gridcolor: '#eee',
                    gridwidth: 0.5,
                    zerolinecolor: '#eee',
                    zerolinewidth: 0.5,
                    linecolor: '#eee',
                    linewidth: 0.5,
                    title: 'Average GPA',
                    rangemode: 'nonnegative'
                    // range: [0, 4]
                },
                yaxis: {
                    showgrid: true,
                    zeroline: true,
                    showline: true,
                    mirror: 'ticks',
                    gridcolor: '#eee',
                    gridwidth: 0.5,
                    zerolinecolor: '#eee',
                    zerolinewidth: 0.5,
                    linecolor: '#eee',
                    linewidth: 0.5,
                    title: 'Total Student Count',
                    // scaleanchor: 'x',
                    // scaleratio: 0.002,
                    // range: [0, 1000],
                    rangemode: 'nonnegative'
                },
                autosize: true,
                hovermode: 'closest'
            };
            this.$nextTick(() => {
                Plotly.newPlot(this.$refs.scatter, data, layout, { showLink: false, displayModeBar: false });
                this.$refs.scatter.on('plotly_click', (data) => {
                    this.handleClickCourse(data.points[0].id);
                });
            });
        },
        handleClickCourse (courseId) {
            this.$router.push({ path: `/course/${courseId}/overview` });
            // this.$router.push({ name: 'CourseOverviewPage', params: { courseId } });
        }
    },

    watch: {
        sortSelectValue: function () { this.onSearch(); },
        filters: function () { this.onSearch(); },
        scatterSwitch: function () { this.renderScatter(); },
        '$route': function () {
            if (this.$refs.scatter) this.$refs.scatter.innerHTML = '';
            this.$nextTick(() => { this.renderScatter(); });
        }
    },

    mounted () {
        this.renderScatter();
    }
};
</script>

<style lang="less" scoped>
.wrap {
    background: #fefefe;
    height: 100%;
}

header {
    padding: 10px;
    box-shadow: inset 0 -0.5px 0 rgba(0,0,0,.15);
    & > div {
        padding: 5px;
        margin: 5px;
        .comp.el-input {
            padding: 2px;
        }
        .comp > .el-input {
            padding: 2px;
        }
    }
}
</style>
