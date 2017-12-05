import Vue from 'vue';
import _ from 'lodash';

import * as types from '../mutation-types';

const state = {
    favorites: []
};

let numberlizeParams = params => _.mapValues(params, v => _.toNumber(v));

const getters = {
    findFavorite: (state) => (params) => {
        params = numberlizeParams(params);
        return _.find(state.favorites, f => _.isMatch(f, params));
    }
};

const actions = {
    clearFavorite ({ commit, state }) {
    },
    getFavoriteFromRemote ({ commit, state }) {
        Vue.$api.user.getFavorite().then(({ body }) => {
            body = _.map(body, ({ id, Course, Professor, Section }) => {
                let r = { id };
                if (Course) r.courseId = Course.id;
                if (Professor) r.professorId = Professor.id;
                if (Section) r.sectionId = Section.id;
                return r;
            });
            commit(types.FAVORITE_RESET, body);
        });
    },
    addFavorite ({ commit, state }, params) {
        function capitalizeFirstLetter (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        let newParams = _.mapKeys(params, (v, k) => capitalizeFirstLetter(k));
        Vue.$api.favorite.save(newParams).then(({ body }) => {
            commit(types.FAVORITE_ADD, numberlizeParams(_.assign({}, body, params)));
        });
    },
    removeFavorite ({ commit, state }, { id } = {}) {
        Vue.$api.favorite.delete({ id }).then(() => {
            commit(types.FAVORITE_REMOVE, numberlizeParams({ id }));
        });
    }
};

const mutations = {
    [types.FAVORITE_ADD] (state, param) {
        state.favorites.push(param);
    },
    [types.FAVORITE_REMOVE] (state, param) {
        let i = _.findIndex(state.favorites, f => _.isMatch(f, param));
        state.favorites.splice(i, 1);
    },
    [types.FAVORITE_RESET] (state, favorites) {
        state.favorites = favorites;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
