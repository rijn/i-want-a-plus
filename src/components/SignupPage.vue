<template>
    <section class="wrap main-page">
        <div class="container">
            <Logo inline :size="25" :style="{ padding: '2em 0' }"></Logo>
            <el-form :rules="rules" ref="form" :model="form" label-width="0px">
                <el-form-item prop="email">
                    <el-input v-model="form.email" placeholder="Email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="Password" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item prop="verifyPassword">
                    <el-input v-model="form.verifyPassword" placeholder="Verify Password" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" :loading="loading" class="long">Sign Up</el-button>
                    <router-link :to="{ name: 'LoginPage' }">Go back</router-link>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>

<script>
import { Button, Form, FormItem, Input } from 'element-ui';
import Logo from './Logo';

export default {
    name: 'SignupPage',

    components: {
        'el-button': Button,
        'el-input': Input,
        'el-form': Form,
        'el-form-item': FormItem,
        Logo
    },

    data () {
        return {
            form: {
                email: '',
                password: '',
                verifyPassword: ''
            },
            rules: {
                email: [
                    { type: 'email', required: true, message: 'Please input valie email address', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Required', trigger: 'change' },
                    { min: 6, message: 'Should have at least 6 chars', trigger: 'blur' }
                ],
                verifyPassword: [
                    { required: true, message: 'Required', trigger: 'change' },
                    (rule, value, callback, source, options) => {
                        if (value !== this.form.password) {
                            callback(new Error('Verify password should be same as the password'));
                        } else {
                            callback();
                        }
                    }
                ]
            },
            loading: false
        };
    },

    methods: {
        onSubmit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.onSignup();
                } else {
                    return false;
                }
            });
        },
        onSignup () {
            this.loading = true;
            this.$api.user.signup(this.form).then(res => {
                this.loading = false;
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push({ name: 'LoginPage' });
            }).catch(e => {
                this.loading = false;
                this.$error(e.body);
            });
        }
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
