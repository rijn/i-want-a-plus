import Vue from 'vue';
import VueResource from 'vue-resource';
import _ from 'lodash';

Vue.use(VueResource);
Vue.http.options.root = '/api';

export default class Resource {
    static models;

    constructor (props) {
        this.models = {};
    }

    static install (Vue, options) {
        this.models = {
            user: Vue.resource('user{/id}', {}, {
                login: { method: 'POST', url: 'user/login' }
            }),
            course: Vue.resource('course{/id}', {}, {
                search: { method: 'GET', url: 'course' },
                addComment: { method: 'POST', url: 'course{/id}/comment' },
                getComment: { method: 'GET', url: 'course{/id}/comment' }
            })
        };

        this.models.course.addComment = _.curry(this.models.course.addComment, 2);

        Vue.prototype.$api = this.models;
    };
};
