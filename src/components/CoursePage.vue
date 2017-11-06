<template>
    <section class="wrap">
        <header ref="courseHeader">
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
            <div>
                <el-select v-model="sortSelectValue" size="mini" placeholder="Default sort" class="comp">
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
            </div>
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
import { Button, Form, FormItem, Input, Select, Option, Loading, OptionGroup, Autocomplete } from 'element-ui';
import CourseSummary from './CourseSummary';
import _ from 'lodash';
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
                    displayKey: 'Course Number'
                }
            },
            sortSelectValue: null
        };
    },

    methods: {
        createLoadingInstance () {
            this.loadingInstance = Loading.service({
                target: this.$refs.courseHeader,
                background: 'rgba(255, 255, 255, 0.8)'
            });
        },
        closeLoadingInstance () {
            this.loadingInstance && this.loadingInstance.close();
        },
        querySearch (queryString, cb) {
            console.log(queryString, _.isNumber(queryString));
            let poss = [];
            if (_.toNumber(queryString)) {
                poss.push(_.assign(this.filterMap.course, {
                    displayValue: queryString,
                    value: '#course=' + queryString
                }));
            }
            // eslint-disable-next-line
            cb(poss);
        },
        handleSelect ({ value }) {
            console.log(value);
            if (_.startsWith(value, '#')) {
                value = _.drop(value, 1);
                [ key, value ] = _.split(value, '=');
                console.log(key, value);
                if (_.has(this.filterMap, key)) {
                    console.log(this.filterMap[key]);
                }
            }
            if (_.isString(value)) {
                this.searchInputValue = value;
                this.onSearch();
            }
        },
        onSearch () {
            if (!this.searchInputValue) {
                this.courses = [];
                return;
            }
            this.createLoadingInstance();
            this.$api.course.search(_.assign({
                title: this.searchInputValue,
                group: 'subject,course'
            }, this.sortSelectValue && { order: this.sortSelectValue })).then(res => {
                this.closeLoadingInstance();
                this.courses = res.body;
            });
        }
    },

    watch: {
        sortSelectValue: function () { this.onSearch(); }
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
