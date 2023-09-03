import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'materialize-css/dist/js/materialize.min'

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import messagePlugin from './utils/message.plugin'
import Loader from "@/components/app/Loader";
import Paginate from "vuejs-paginate/src/components/Paginate";

import currencyFilter from "@/filters/currency.filter";
import dateFilter from "@/filters/date.filter";
import localizeFilter from "@/filters/localize.filter";

const firebaseConfig = {
    apiKey: "AIzaSyDKoisGUQ4pQSFARTrBVm7DewgUx5kDIQM",
    authDomain: "crm-system-vue3-20361.firebaseapp.com",
    projectId: "crm-system-vue3-20361",
    storageBucket: "crm-system-vue3-20361.appspot.com",
    messagingSenderId: "209477176182",
    appId: "1:209477176182:web:781f3af105ab005ff68857",
    measurementId: "G-D9HPWQPX7K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

let appCheck;

auth.onAuthStateChanged(() => {
    if (!appCheck) {
        appCheck = createApp(App)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .component('Loader', Loader)
            .component('Paginate', Paginate)

        appCheck.config.globalProperties.$filters = {
            currencyFilter,
            dateFilter,
            localizeFilter
        }
        appCheck.mount('#app')
    }
});

