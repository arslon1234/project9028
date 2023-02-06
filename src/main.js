import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "./plugins/vee-validate";
import VueTheMask from 'vue-the-mask'
import store from './store'
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
createApp(App).use(store).use(VueTheMask).use(router).mount('#app')
