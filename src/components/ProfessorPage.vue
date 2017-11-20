<template>
    <el-container class="main-page">
        <el-container>
            <el-header ref="courseHeader" height="auto" class="border bottom">
                <div>
                    <el-autocomplete
                        class="comp long inline-input"
                        v-model="professorName"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="Search for professor"
                        @select="handleSelect"
                        :select-when-unmatched="false">
                        <i slot="prefix"
                            class="el-input__icon el-icon-search"></i>
                        <template slot-scope="props">
                            <b><span class="name">{{ props.item.lastName }}</span></b>,
                            <span class="key">{{ props.item.firstName }}</span>
                        </template>
                    </el-autocomplete>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-container class="border left" v-if="$route.params.courseId">
            <el-header class="border bottom">
                <router-link :to="{ name: 'ProfessorOverviewPage', params: { professorId: $route.params.professorId } }">
                    <el-button type="text" icon="el-icon-arrow-left">Collapse</el-button>
                </router-link>
            </el-header>
            <el-main>
                <router-view name="course"></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import {
    Button, Form, FormItem, Input, Select, Option, Loading, OptionGroup, Autocomplete, Tag,
    Container, Aside, Main, Header, Switch
} from 'element-ui';
// eslint-disable-next-line
import _ from 'lodash';

export default {
    name: 'ProfessorPage',

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
        'el-switch': Switch
    },

    computed: {
    },

    data () {
        return {
            loading: false,
            professors: [],
            loadingInstance: null,
            professorName: ''
        };
    },

    methods: {
        createLoadingInstance () {
            this.loadingInstance = Loading.service({
                target: this.$refs.courseHeader.$el,
                background: 'rgba(255, 255, 255, 0.8)'
            });
        },
        closeLoadingInstance () {
            this.loadingInstance && this.loadingInstance.close();
        },
        querySearchAsync (queryString, cb) {
            this.$api.professor.ac({ query: queryString }).then(res => {
                cb(res.body);
            });
        },
        handleSelect ({ id, firstName, lastName }) {
            this.$router.push({
                name: 'ProfessorOverviewPage',
                params: { professorId: id }
            });
            this.professorName = `${lastName}, ${firstName}`;
        }
    },

    watch: {
        '$route': function () {
        }
    },

    mounted () {
    }
};
</script>

<style lang="less" scoped>
header {
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
