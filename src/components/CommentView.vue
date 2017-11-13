<template>
    <el-container>
        <el-card class="box-card long">
            <p>{{comment.content || '(no content)'}}</p>
            <el-row class="inline">
                <el-rate
                    v-model="comment.rating"
                    show-score
                    disabled>
                </el-rate>
                <span style="float: right; line-height: 1.3rem;" class="tip">{{ago}} ago</span>
            </el-row>
        </el-card>
    </el-container>
</template>

<script>
import {
    Button, Form, FormItem, Input, Select, Option, OptionGroup, Autocomplete, Tag,
    Container, Aside, Main, Header, Row, Alert, Switch, Rate, Card
} from 'element-ui';
import { convertDate } from './convert-date';

export default {
    name: 'CommentPosting',

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
        'el-rate': Rate,
        'el-card': Card
    },

    props: {
        comment: {
            type: Object
        }
    },

    computed: {
        ago: function () { return convertDate(this.comment.updatedAt); }
    }
};
</script>

<style lang="less" scoped>
</style>
