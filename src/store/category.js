import {getDatabase, ref, update, get, push} from "firebase/database";

export default {
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUid');
                const dbCategoriesRef = ref(getDatabase(),`/users/${uid}/categories`);
                const category = await push(dbCategoriesRef, {title, limit});

                return {title, limit, id: category.key};
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid');
                const dbCategoriesRef = ref(getDatabase(),`/users/${uid}/categories`);

                const snapshot = await get(dbCategoriesRef);
                const categories = snapshot.val() || {};

                return Object.keys(categories).map(key => ({...categories[key], id: key}));

            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchCategoryByID({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid');
                const dbCategoriesRef = ref(getDatabase(),`/users/${uid}/categories`);

                const snapshot = await get(dbCategoriesRef);
                const category = snapshot.child(id).val() || {};
                return {
                    ...category,
                    id: id
                };
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateCategory({commit, dispatch}, {title, limit, id}) {
            try {
                const uid = await dispatch('getUid');
                const dbCategoriesRef = ref(getDatabase(),`/users/${uid}/categories/${id}`);

                await update(dbCategoriesRef, {title, limit});
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
    }

}