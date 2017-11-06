import Vue from 'vue';

import * as types from '../mutation-types';

import { Message } from 'element-ui';

import store from 'store';
import expirePlugin from 'store/plugins/expire';

store.addPlugin(expirePlugin);

const state = {
    email: null,
    token: null
};

const getters = {
    token: ({ token }) => token,
    isLogin: ({ token }) => !!token
};

const actions = {
    login ({ commit, state }, { email = null, token = null } = {}) {
        commit(types.USER_LOGIN, { email, token });
    },
    logout ({ commit, state }) {
        Message.success('You\'ve logged out.');
        commit(types.USER_LOGIN, { email: null, token: null });
    }
};

const mutations = {
    [types.USER_LOGIN] (state, { email = null, token = null } = {}) {
        state.email = email;
        state.token = token;

        let expiration = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
        store.set('user', { email, token }, expiration);
    }
};

if (store.get('user')) {
    Vue.set(state, 'email', store.get('user').email);
    Vue.set(state, 'token', store.get('user').token);
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
