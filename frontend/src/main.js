import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
// import router from './router'
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';


import Axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { faUser, faCircle, faQuestionCircle, faCaretUp, faCaretDown, faSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faCircle, faQuestionCircle, faCaretUp, faCaretDown, faSquare)
const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('./views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('./views/About.vue')
    },
    {
        path: '/sitrep',
        name: 'SitRepList',
        component: () =>
            import ('./views/SitRepList.vue')
    },
    {
        path: '/sitrep/:id',
        name: 'SitRep',
        component: () =>
            import ('./views/SitRep.vue')
    },

]

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.component('font-awesome-layers', FontAwesomeLayers)

// Vue.prototype.$http = Axios;
// Vue.config.productionTip = false


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});
// Vue.createApp(App).component('font-awesome-icon', FontAwesomeIcon)

const app = Vue.createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('font-awesome-layers', FontAwesomeLayers)
app.config.globalProperties.$http = Axios
app.config.productionTip = false
app.use(store)

app.use(router).mou