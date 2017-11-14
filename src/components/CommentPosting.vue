<template>
    <el-card class="long no-padding" v-if="isLogin" direction="vertical">
        <template v-if="success">
            <el-alert
                title="Post successfully"
                type="success"
                center
                :closable="false"
                show-icon>
            </el-alert>
        </template>
        <template v-else>
            <el-row>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    :maxlength="300"
                    placeholder="Add comments... (optional)"
                    class="long no-style"
                    resize="none"
                    v-model="content">
                </el-input>
            </el-row>
            <el-row class="inline" style="padding: 0.5rem 0 0 0;">
                <div style="float: left;">
                    <el-rate
                        v-model="rating"
                        allow-half
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                </div>
                <div style="float: right;">
                    <el-button type="default" size="mini" @click="postComment">Post</el-button>
                </div>
            </el-row>
        </template>
    </el-card>
    <el-container class="long" v-else>
        <router-link :to="{ name: 'LoginPage' }"><el-button>Login to post comment</el-button></router-link>
    </el-container>
</template>

<script>
import {
    Button, Form, FormItem, Input, Select, Option, OptionGroup, Autocomplete, Tag,
    Container, Aside, Main, Header, Row, Alert, Switch, Rate, Card
} from 'element-ui';
import _ from 'lodash';
import { mapGetters } from 'vuex';

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

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    props: {
        endpoint: {
            type: Function
        },
        comment: {
            type: Object
        }
    },

    data () {
        return {
            content: '',
            rating: 0,
            success: false
        };
    },

    methods: {
        postComment () {
            this.endpoint(_.pick(this, 'content', 'rating')).then(res => {
                this.success = true;
                this.$emit('post');
            }).catch(e => {
                this.$error(e.body);
            });
        }
    },

    mounted () {
        if (this.comment) {
            _.each(this.comment, (v, k) => {
                this[k] = v;
            });
        }
    }
};
</script>

<style lang="less">
.no-style > textarea {
    border: 0;
    padding: 0;
}
</style>
