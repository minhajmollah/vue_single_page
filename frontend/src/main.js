import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import Axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { faUser, faCircle, faQuestionCircle, faCaretUp, faCaretDown, faSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faCircle, faQuestionCircle, faCaretUp, faCaretDown, faSquare)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
