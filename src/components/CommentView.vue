<template>
    <el-container>
        <div
            v-if="deletable"
            style="padding: 0 1rem 0 0; display: flex; align-items: center; justify-content: center;">
            <a @click="onDelete" class="delete-button">
                <i class="icon ion-trash-a inactive"></i>
                <i class="icon ion-trash-a active"></i>
            </a>
        </div>
        <el-card class="box-card long"p>
            <p>{{comment.content || '(no content)'}}</p>
            <el-row class="inline">
                <el-rate
                    v-model="comment.rating"
                    show-score
                    disabled
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
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
    name: 'CommentView',

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
        },
        deletable: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ago: function () { return convertDate(this.comment.updatedAt); }
    },

    methods: {
        onDelete () {
            this.$api.comment.delete(this.comment).then(res => {
                this.$message.success('Delete successfully');
                this.$emit('delete');
            }).catch(e => {
                this.$error(e.body);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.delete-button {
    font-size: 1.3rem;

    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;

    border-radius: 100%;
    border: solid 2px #FA5555;

    transition: all .1s ease;

    font-weight: 400;

    color: #FA5555;

    cursor: pointer;
    & > .active {
        display: none;
    }
    &:hover {
        background: #FA5555;
        color: #fff;
        & > .inactive {
            display: none;
        }
        & > .active {
            display: block;
        }
    }
}
</style>
