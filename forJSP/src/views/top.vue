


<template>
<div class="top fix">
	<div class="top_box">
		<dl>
			<dt><img src="data:image/png;base64,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" alt=""></dt>
			<dd><a :class="{ active: now=='business' }" href="/9tong-hqp-pc/views/quotes/list.html"><i class="iconfont icon-nav1"></i>&nbsp;交易中心</a></dd>
			<dd><a :class="{ active: now=='info' }" href="/9tong-hqp-pc/views/info/bInfo.html"><i class="iconfont icon-nav"></i>&nbsp;商家中心</a></dd>
		</dl>
		<div class="info">
			<img :src="info.avatar?info.avatar:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAwZJREFUSA3FV0trE1EUPvcmaRNMpL4qGagPtHXRtAoFBVcquHMRsSD+CUFT97NQF2oQ/BMiVKy/QFdu1IJKQYpUpM0EH3UTlTyaXM934wwzmUdSO6UHkrlzznfPdx/nnntG0ACiTFNWa8/OErWLHaIZQcogRYbuKshSJCxJ9JYosZDPXX4lTJNh0SKizMo8l7Zq368TiZJSajQKa9uEEN+IVNnIHXgkzJd1W9/7DCW2bk1eUR3xkAnHejsN8s4DWBVS3TDuLz0NwvMKeYWJxFqpcKfTpvn/JYVH9IUP+IJPLwuvoVsBgDU39ZifV936rbZ59k+MBx+u8VPZvjwzrsxN3Y6bFETwCd82KZ7OjLGnWBq3Me62TNCsved6xoheBFLcRL3+dLAyF/RJ/OHIKEWh0ZscPUpDR04R8ZD7Ci9b88s72vi64oPyko91jyfdE0gOVm2+ysrAcyoyuykzfZE3xdkVn0OfgmdRX3pBnV8/fSaccyM3m9cZKYwUZMPHT2+OFFROP0/s6kGAC1mQLe2ib1j/FFhiuWskzBypF+kspfLjIZh2USL3hlgpZZwIMw2kTx48FogDp9QJP9Ach9LJFx5n4JTOLeMxdV8an16Tqv8m1axzpL7vBku7Ra3KR2qvr/EutfSzZS3rdqe2rnHAq8YfaqwsBnhlFd9sonJzssbjygYjtkfLsVeTnLusfu5FKk2pQ9Mks3sjoTK7j4YOnyTg+0hV4hLvA6LMzCUOtAlKFy7wXa9zTmCXdOE8JTmSgY8SXTjweeLKYXBJjOQDwYk9wfogMC/1Gx5+YoFooxQECNINj58hwm8LIlTiudQ1ki5Xwj0hSjcjUXikTHDKbmGmylGOm58XSbWaURDHBhzw4aLK4NSZv1vU/VjG7RHegS3Cn3t9eBVeYPJsV43c/gkUgdoTGijMfE56FXDa79fbx/UODrvydKagKwMh7rpw8TbZt119wLHnkuWl3pliD1UgqkG+T+ObOWbaU2H6Zuxe2+0u6D1L7SZGe0c+YdyD2I6Ptr/K5W1wdO3yhQAAAABJRU5ErkJggg=='" alt="">
			<p>你好，{{info.storeTitle}}</p>
			<p><a href="javascript:;" @click="logout">退出</a></p>
		</div>
	</div>
</div>
</template>

<script>

import '../public/js/sockjs.js';

export default {
	props: ['now'],
	data: function () {
		return {
			info:''
		}
	},
	created: function() {
		//获取用户信息
		this.$http.post('/9tong-hqp-pc/user/getUserInfo').then(function(res) {
			if (res.body.code != 0) {
				this.$message.error(res.body.message);
			} else {
				this.info = res.body.data;
			}
		});

	},
	methods: {
		logout:function() {
			location = '/9tong-hqp-pc/user/logout?t='+(new Date()).getTime()
		}
	}
}
</script>

<style lang="less" rel="stylesheet/less"> 
.top{
	height: 70px;
	&_box{ position: fixed; top: 0; z-index: 1; width: 100%; overflow: hidden; background: #F37C2C; box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);}
	dl{float: left; text-align: center;}
	dt,dd{ float: left;}
	dt{ width: 230px; line-height: 70px;}
	dd a{
		display: block; width: 160px; line-height: 70px; color: #facaaa;
		&:hover,&.active{ color: #fff; text-decoration:none; background: #E26C1D;}
		i{vertical-align: middle; font-size: 18px;}
	}
	.info{
		float: right; width: 220px; padding: 20px 20px 20px 0; color: #facaaa; font-size: 13px; line-height: 1.2;
		img{ width: 30px; height: 30px; float: left; margin-right: 15px; border-radius: 50%;}
		a{color: #fff;}
	}
}

.newMsg{
	margin-top: -10px; color: #333; cursor: pointer;
	h1,h2{ font-weight: normal; margin-bottom: 10px; font-size: 16px;}
	h1,span{ color: #aeacaa;}
	h2{ border-left: 2px solid #F37C2C; line-height: 1; margin-left: -20px; padding-left: 20px;}
	em{font-style: normal;color: #FF7817; margin-right: 5px;}
}
</style>