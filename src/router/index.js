//全局
import VueRouter from "vue-router"
import Vue from 'vue'
//wxf
import World from "../components/World.vue"
import Shop from "../components/Shop.vue"
//wss
import Mine from "../components/Mine.vue";
import PageMould from '../components/PageMould.vue'
//wx
import Classify from '../components/Classify'
import Shouye from '../components/Shouye'
import Listright from '../components/Listright'
//xyh
import Good_product_router from '../components/Good_product_router.vue';
import Cart from '../components/Cart.vue';
import Good_product from '../components/Good_product.vue';
import Life_zhi from '../components/Life_zhi.vue';

Vue.use(VueRouter)

//路由表
const routes = [
  //默认打开app显示的页面,重定向到/shouye
  {path : "/" , redirect : "/shouye"},
  // 首页
  {path : "/shouye" , component : Shouye},
  // 分类
  {path : "/classify" , component : Classify , children : [
    // 切换分类选项
    {path : "" , component : Listright},
    {path : "/classify/:fen" , component : Listright}
  ]},
  // 卷皮优选
  {path : "/you" , component : Good_product_router , children : [
    // 切换 商城 与 生活志
    {path : "" , component : Good_product},
    {path : "good" , component : Good_product},
    {path : "life" , component : Life_zhi},    
  ]},
  // 全球购
  {path : "/world" , component : World},
  // 购物车
  {path : "/cart" , component : Cart},
  // 我的
  {path : "/mine" , component : Mine},
  // 商品详情页
  {path : "/shop/:id" , component : Shop},
  // 首页的导航条 跳转路由
  {path: '/pagemould/:id', component: PageMould}
]

const router = new VueRouter({
    // 取消url中的 #
    mode : "history",
    routes,
    // 不管跳转那个路由 滚动条都回到顶部
    scrollBehavior (to, from, savedPosition) {
      return {x : 0, y : 0}
    }
})

export default router;
