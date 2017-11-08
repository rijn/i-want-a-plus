import Vue from 'vue';
import VueResource from 'vue-resource';

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
                search: { method: 'GET', url: 'course' }
            })
        };

        Vue.prototype.$api = this.models;
    };
};
