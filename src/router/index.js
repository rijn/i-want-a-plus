import Vue from 'vue';
import Router from 'vue-router';
const Hello = resolve => require(['@/components/Hello'], resolve);
const LoginPage = resolve => require(['@/components/LoginPage'], resolve);
const CoursePage = resolve => require(['@/components/CoursePage'], resolve);

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Main',
        component: Hello
    }, {
        path: '/login',
        name: 'Login',
        component: LoginPage
    }, {
        path: '/course',
        name: 'Course',
        component: CoursePage
    }],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
