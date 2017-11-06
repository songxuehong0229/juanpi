// 全局导入
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import View from "../static/view"
import router from "./router/index"

Vue.use(VueResource)
// 引入第三axios插件
import axios from 'vue-axios';
Vue.prototype.axios = axios;
// 引入vueAwesomeSwiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

// 引入vue-lazyload插件
import VueLazyload from 'vue-lazyload';
// 配置对应的懒加载插件的选项
Vue.use(VueLazyload, {
	error: 'dis/error.png',
	loading: 'https://jp.juancdn.com/jpwebapp_v1/images_v1/youxuan/logo.png',
	listenEvents: ['scroll']
});

// 引入相对应的组件
import Good_product from './components/Good_product.vue';
import Life_zhi from './components/Life_zhi.vue';

// 引入vuex
import store from "./state/state"

//导入mint-ui
import MintUi from "mint-ui"
// 引入向下滚动加载数据
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll)

//导入swiper
import Swiper from "vue-awesome-swiper"
Vue.use(Swiper)
import "../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.min.css"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
	router,
	store
})
