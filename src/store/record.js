import {get, getDatabase, push, ref} from "firebase/database";

export default {
    actions: {
        async createRecord({commit, dispatch}, record) {
            try {
                const uid = await dispatch('getUid');
                const dbRecordsRef = ref(getDatabase(),`/users/${uid}/records`);
                return await push(dbRecordsRef, record);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchRecords({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid');
                const dbRecordsRef = ref(getDatabase(),`/users/${uid}/records`);

                const snapshot = await get(dbRecordsRef);
                const records = snapshot.val() || {};

                return Object.keys(records).map(key => ({...records[key], id: key}));

            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async fetchRecordByID({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid');
                const dbRecordsRef = ref(getDatabase(),`/users/${uid}/records`);

                const snapshot = await get(dbRecordsRef);
                const record = snapshot.child(id).val() || {};
                return {
                    ...record,
                    id: id
                };
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    }
}