import Vue from 'vue'
import Router from 'vue-router'
import err from '@/components/pages/err'
import Ranks from '@/components/pages/rank/rankHome'
import Pkrec from '@/components/pages/mine/pkrec'
import Invcode from '@/components/pages/mine/invcode'
import Goodsdetail from '@/components/pages/mall/detail'
import Ysq from '@/components/pages/ysq/index'
import Invclass from '@/components/pages/inv/invclass'
import Invpk from '@/components/pages/inv/invpk'
import Wxpay from '@/components/pages/wxpay/wxpay'

import distribution from '@/components/pages/distribution/index'
import payRes from '@/components/pages/distribution/res'
import Classuser from '@/components/pages/distribution/classuser'
const {routeprefix} = require('../../config/myconfig.js')

Vue.use(Router)
let routedatas = [
	{
		path: '/distribution/classuser',
		title:"班级用户年度会员专享通道",
		name: 'Classuser',
		component: Classuser
	},
	{
		path: '/distribution/res/:state?',
		title:"提交成功",
		name: 'payRes',
		component: payRes
	},
	{
		path: '/distribution/:id?/:wxuser?',
		title:"爬梯朗读会员",
		name: 'distribution',
		component: distribution
	},
	{
		path: '/wxpay/:chanel',
		title:"微信支付",
		name: 'Wxpay',
		component: Wxpay
	},
	{
		path: '/rank/:type',
		title:"爬布斯排行榜",
		name: 'Ranks',
		component: Ranks
	},
	{
		path: '/mine/invcode/:uid',
		title:"我的邀请码",
		name: 'Invcode',
		component: Invcode
	},
	{
		path: '/mine/pkrec/:uid',
		title:"我的战绩",
		name: 'Pkrec',
		component: Pkrec
	},
	{
		path: '/mall/detail/:id',
		title:"商品详情",
		name: 'Goodsdetail',
		component: Goodsdetail
	},
	{
		path: '/activity/ysq',
		title:"压岁钱",
		name: 'Ysq',
		component: Ysq
	},
	{
		path: '/inv/invclass',
		title:"班级邀请",
		name: 'Invclass',
		component: Invclass
	},
	{
		path: '/inv/invpk',
		title:"PK邀请",
		name: 'Invpk',
		component: Invpk
	},
	{
		path: '/*',
		title:"404 not found",
		name: 'err',
		component: err
	}
];

for (let i in routedatas) {
	routedatas[i].path = routeprefix+routedatas[i].path
}
const router = new Router({
	mode: 'history',
	routes: routedatas,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}  else {
			return {
				x: 0,
				y: 0
			}
		}
	}
});
let setTitle = name=>{
	for (var i in routedatas) {
		if(routedatas[i].name==name){
			document.title = routedatas[i].title;
			break;
		}
	}
}
router.afterEach((to, from, next) => {
	setTitle(to.name);
	for (var i in to.params) {
		if (to.params.hasOwnProperty(i)) {
			if(to.params[i]==undefined) to.params[i] = "";
		}
	}
	//console.log("c:"+to.fullPath);
});
export default router
