import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
const Hello = resolve => require(['@/components/Hello'], resolve);
const LoginPage = resolve => require(['@/components/LoginPage'], resolve);
const SignupPage = resolve => require(['@/components/SignupPage'], resolve);
const CoursePage = resolve => require(['@/components/CoursePage'], resolve);
const CourseOverviewPage = resolve => require(['@/components/CourseOverviewPage'], resolve);
const MyCommentPage = resolve => require(['@/components/MyCommentPage'], resolve);
const SettingsPage = resolve => require(['@/components/SettingsPage'], resolve);

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'MainPage',
        component: Hello
    }, {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: { title: 'Login' }
    }, {
        path: '/signup',
        name: 'SignupPage',
        component: SignupPage,
        meta: { title: 'Sign up' }
    }, {
        path: '/course',
        name: 'CoursePage',
        component: CoursePage,
        meta: { title: 'Course' }
    }, {
        path: '/course/:id',
        component: CoursePage,
        children: [{
            path: 'overview',
            name: 'CourseOverviewPage',
            component: CourseOverviewPage,
            meta: { title: 'Course' }
        }]
    }, {
        path: '/settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
        children: [{
            path: 'comment',
            name: 'MyCommentPage',
            component: MyCommentPage,
            meta: { header: 'My Comment', title: 'My Comment' }
        }]
    }],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `A+ - ${to.meta.title}`;
    }
    next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let isLogin = store.getters['user/isLogin'];
        if (!isLogin) {
            next({
                name: 'LoginPage',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
