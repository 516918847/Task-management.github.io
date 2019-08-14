import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Qs from 'qs'
import ElementUI from 'element-ui';   //饿了么插件
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$ajax=axios
Vue.prototype.qs = Qs;


import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  
Vue.use(VueQuillEditor)





new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
