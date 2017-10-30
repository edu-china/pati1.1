import Vue from 'vue'
import Router from 'vue-router'
import err from '@/components/pages/err'
import Ranks from '@/components/pages/rank/rankHome'
import Pkrec from '@/components/pages/mine/pkrec'
import Invcode from '@/components/pages/mine/invcode'
import Goodsdetail from '@/components/pages/mall/detail'

Vue.use(Router)
let routedatas = [
	{
		path: '/rank/:type',
		title:"帕布斯排行榜",
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
		path: '/*',
		title:"404 not found",
		name: 'err',
		component: err
	}
];

for (let i in routedatas) {
	routedatas[i].path = "/m"+routedatas[i].path
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
