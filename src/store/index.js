import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import favorite from './modules/favorite';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'prod';

const store = new Vuex.Store({
    modules: {
        user,
        favorite
    },
    strict: debug,
    plugins: debug ? [ createLogger() ] : []
});

export default store;
