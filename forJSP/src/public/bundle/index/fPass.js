import '../../css/common.less';
import '../../css/index.less';


//vue相关
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Resource from 'vue-resource';


Vue.use(Resource);
Vue.use(ElementUI);

//公共头部
import CTop from '../../../views/top.vue';

//资源引入
import '../../images/img.jpg';


var app = new Vue({
	el: '#app',
	data: {
		topNow: 'business',

	},
	components: {
		CTop: CTop
	},
});