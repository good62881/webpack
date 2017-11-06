import '../../css/common.less';
import '../../css/news.less';



//vue相关
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Resource from 'vue-resource';


Vue.use(Resource);
Vue.use(ElementUI);

//公共头部
import CTop from '../../../views/top.vue';



var app = new Vue({
	el: '#app',
	data: {
		topNow: 'business',

	},
	components: {
		CTop: CTop
	},
});