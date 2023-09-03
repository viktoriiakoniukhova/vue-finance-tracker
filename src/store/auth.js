// Логіка, яка відноситься до авторизації, реєстрації та лог-ауту
/* eslint-disable */

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import {auth} from "@/main";

export default {
    actions: {
        async register({dispatch, commit}, {email, password, name}) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                const uid = await dispatch('getUid');
                await set(ref(getDatabase(), `/users/${uid}/info`), {
                    bill: 0,
                    name: name,
                    locale: 'uk-UA'
                });
            } catch (e) {
                // console.log('Exception:', e);
                commit('setError', e);
                throw e;
            }
        },
        async login({dispatch, commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
                // console.log('Exception:', e);
                commit('setError', e);
                throw e;
            }
        },
        async logout({commit}) {
            await signOut(auth);
            commit('clearInfo');
        },
        //При реєстрації потрібно ім'я та баланс записати в БД, тому створимо функцію, яка буде отримувати ID користувача з Firebase
        getUid(){
            const user = auth.currentUser;
            return user ? user.uid : null;
        }
    }
}