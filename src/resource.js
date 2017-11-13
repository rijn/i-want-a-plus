import Vue from 'vue';
import VueResource from 'vue-resource';
import _ from 'lodash';
import store from './store';

Vue.use(VueResource);
Vue.http.options.root = '/api';

let token = store.getters['user/token'];
if (token) {
    Vue.http.headers.common['Authorization'] = `Bearer ${token}`;
}

export default class Resource {
    static models;

    constructor (props) {
        this.models = {};
    }

    static install (Vue, options) {
        let models = {
            user: Vue.resource('user{/id}', {}, {
                login: { method: 'POST', url: 'user/login' },
                getComment: { method: 'GET', url: 'user/comment' }
            }),
            course: Vue.resource('course{/id}', {}, {
                search: { method: 'GET', url: 'course' },
                addComment: { method: 'POST', url: 'course{/id}/comment' },
                getCommentDelegate: { method: 'GET', url: 'course{/id}/comment' }
            }),
            comment: Vue.resource('comment{/id}', {}, {})
        };

        this.models = models;

        this.models.course.addComment = _.curry(this.models.course.addComment, 2);
        this.models.course.getComment = function (arg) { return function () { return models.course.getCommentDelegate(arg); }; };

        Vue.prototype.$api = this.models;
    };
};
