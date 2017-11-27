import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import resource from './resource';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import 'normalize.css/normalize.css';

import { Message } from 'element-ui';

Vue.config.productionTip = false;

Vue.use(resource);

locale.use(lang);

Vue.prototype.$message = Message;

Vue.prototype.$error = (errors) => {
    if (errors.errors) errors = errors.errors;
    if (errors.length) errors = errors[0];
    if (errors.message) errors = errors.message;
    Message.error(errors);
};

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});

store.dispatch('user/initialize');
