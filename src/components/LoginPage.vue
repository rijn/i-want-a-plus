<template>
    <section class="wrap main-page">
        <div class="container">
            <Logo inline :size="25" :style="{ padding: '2em 0' }"></Logo>
            <el-form ref="form" :model="form" label-width="0px">
                <el-form-item>
                    <el-input v-model="form.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" placeholder="Password" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" :loading="loading" class="long">Login</el-button>
                    <router-link :to="{ name: 'SignupPage' }">Sign up</router-link>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import { Button, Form, FormItem, Input } from 'element-ui';
import { mapGetters, mapActions } from 'vuex';
import Logo from './Logo';

export default {
    name: 'LoginPage',

    components: {
        'el-button': Button,
        'el-input': Input,
        'el-form': Form,
        'el-form-item': FormItem,
        Logo
    },

    computed: {
        ...mapGetters('user', [ 'isLogin' ])
    },

    data () {
        return {
            form: {
                email: '',
                password: ''
            },
            loading: false,
            response: null
        };
    },

    methods: {
        ...mapActions('user', { login: 'login' }),
        onSubmit () {
            this.loading = true;
            this.$api.user.login(this.form).then(res => {
                this.loading = false;
                this.login({ token: res.body.token, email: this.form.email });
            }).catch(e => {
                this.loading = false;
                this.$error(e.body);
            });
        },
        checkLogin () {
            if (this.isLogin) {
                this.$message.success('You\'ve logged in.');
                let redirect = this.$route.query.redirect;
                this.$router.push(redirect ? { path: redirect } : { name: 'MainPage' });
            }
        }
    },

    watch: {
        isLogin: function () { this.checkLogin(); }
    },

    mounted () {
        this.checkLogin();
    }
};
</script>

<style lang="less" scoped>
section.wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .container {
        width: 300px;
        max-width: 100%;
        z-index: 2;

        padding: 20px;
    }
}
</style>
