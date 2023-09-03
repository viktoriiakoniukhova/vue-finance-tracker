/* eslint-disable */
import {getDatabase, ref, get, update} from "firebase/database";

export default {
    state: {
        info: {}
    },
    getters: {
        info: s => s.info
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        //Очищаємо кеш стейту, коли ми будемо робити логаут, щоб сесії користувачів (якщо заходим в різні акаунти) не пересікались
        clearInfo(state) {
            state.info = {};
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid');
                const dbUserRef = ref(getDatabase(),`/users/${uid}/info`);

                const snapshot = await get(dbUserRef);
                const info = snapshot.val();
                commit('setInfo', info);

            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateInfo({commit, dispatch, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid');
                const updateData = {...getters.info, ...toUpdate}

                const dbCategoryRef = ref(getDatabase(),`/users/${uid}/info`);

                await update(dbCategoryRef, updateData);
                commit('setInfo', updateData);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
    },

}