<template>
  <div id="good_product">
     <!-- 搜索框 -->
     <div class="search">
       <img src="../assets/Good_product_images/seach.png" alt="搜索框">
     </div>
     <!-- 诚信承诺 -->
     <div class="chengxin">
       <img src="../assets/Good_product_images/ziying.png" alt="诚信图片">
     </div>
     <!-- menu菜单 -->
     <div class="menu_box">
        <img src="https://goods7.juancdn.com/jas/170830/d/d/59a6575da9fcf841480ab490_360x323.jpg?iopcmd=convert&Q=85&dst=jpg">
        <img src="https://goods5.juancdn.com/jas/170905/8/f/59ae2072a9fcf87ca46e7436_360x323.jpg?iopcmd=convert&Q=85&dst=jpg">
        <img src="https://goods8.juancdn.com/jas/170905/f/f/59ae208ca9fcf87cdb4a6f8a_360x323.jpg?imageMogr2/quality/85!/format/jpg">
     </div>
     <!-- 第二个菜单 -->
     <div class="menu_box">
        <img src="https://goods7.juancdn.com/jas/170830/c/3/59a6576ca9fcf841624c9283_360x323.jpg?iopcmd=convert&Q=85&dst=jpg"> 
        <img src="https://goods3.juancdn.com/jas/170905/4/d/59ae20cfa9fcf87d6416b017_360x323.jpg?iopcmd=convert&Q=85&dst=jpg">
        <img src="https://goods5.juancdn.com/jas/170830/9/4/59a65d678150a11d52259e75_360x323.jpg?iopcmd=convert&Q=85&dst=jpg">
     </div>
     <!-- titleLimet的容器 -->
      <div class="timeLimit">
        <p class="timeLimit-p">
          <span class="timeLimit-p-span">今日特价</span>
          <img src="../assets/Good_product_images/sela.png" alt="图片">
        </p>
      </div>
      <!-- 今日特价的滑动效果 -->
      <!-- slides -->
      <div class="sale">
        <template v-for="item in sale" >
          <div class="my_swiper" v-for="items in item.goodslist" :key="items.id" @click="router(items)">
            <a href="Javascript:;">
              <img :src="items.pic_url">
                <p class="my_swiper-p">
                  <span class="Saling">
                    <img src="../assets//Good_product_images/saling.png">
                    <span class="quick_span">正在抢购</span>
                  </span>
                  <span class="RMB">￥</span><span class="newPrice">{{ items.cprice }}</span><span class="oldPrice">￥{{ items.oprice }}</span>
                </p>
                <p class="text">{{ items.title }}</p>
            </a>
          </div>
        </template>
      </div>
    <!-- 人气推荐导航条-->
    <a href="Javascript:;" class="popularity">
      <p class="title_left">人气推荐</p>
      <p class="title_right">
        <span>查看全部</span>
        <i class="title_right_i"></i>
      </p>
    </a>
    <!-- 商品滑动 -->
        <!-- slides -->
        <div class="people">
          <div class="my_swiper" v-for="item in people" :key="item.id" @click="router(item)">
            <a href="Javascript:;" class="my_swiper_a">
              <img :src="item.pic_url">
              <p class="price">
                <span class="RMB">￥</span>
                <span>{{ item.cprice }}</span>
              </p>
              <p class="text">{{ item.title }}</p>
            </a>          
          </div>
          <div class="my_swiper">
            <a href="Javascript:;" class="my_swiper_a">
              <img src="https://jp.juancdn.com/jpwebapp_v1/images_v1/youxuan/see_more.png">
              <p class="price">
                <span class="RMB"></span>
                <span></span>
              </p>
              <p class="text"></p>
            </a>          
          </div>
        </div>
        <!-- 精选好货 -->
        <div class="preferred_goods">
          <span class="preferred_goods">
            <span class="center_span">一 精选好货 一</span>
          </span>
        </div>
        <!-- 商品流 -->
        <div class="all_main_products">
          <div class="all_main_box" v-for="item in goods" :key="item.id" @click="router(item)">
            <div class="all_main_center"> 
              <img :src="item.pic_url" class="all_main_center_img">
              <div class="introduce_tips">
                <p v-for="item2 in item.label_yxlist" :key="item2.id">{{ item2.text }}</p>
                <p style='color:#61798f;background-color:#eff3f9;border-color:""' v-for="items in item.label_list" :key="items.id">{{ items.text }}</p>
              </div>
              <div class="introduce_text">加厚平口垃圾袋(6卷)</div>
              <div class="product_price">
                <span class="price_character">￥</span>
                <span class="product_price_number">{{ item.cprice }}</span>
              </div>
             </div>
          </div>
        </div>
        <div class="white"></div>
  </div>
</template>

<script>
// 引入vue的sweiper插件
export default {
  name: 'good_product',
  data () {
    return {
        sale : [],
        people : [],
        goods : []
    }
  },
  methods : {
    router(item){
      this.$router.push("/shop/" + item.goods_id)
      this.$store.commit("SHOP", item)
    }
  },
  created () {
    this.$http.get("./../../static/sale.json").then(res => {
        this.sale = res.data.data.time_tabs;
    },error => {
        console.log("error");
    });
    this.$http.get("./../../static/people.json").then(res => {
        this.people = res.data.data.goods[0].lists[0].goodslist;
    },error => {
        console.log("error");
    });
    this.$http.get("./../../static/goods.json").then(res => {
        this.goods = res.data.data.goods;
    },error => {
        console.log("error");
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
/* 搜索框的样式 */
.search {
  width: 100%;
  height: 2.132rem;
  margin-top: 1.70067rem;
}
.search img {
  width: 100%;
  height: 100%;
}
.chengxin {
  width: 100%;
  height: 5.9264rem;
}
.chengxin img {
  width: 100%;
  height: 100%;
}
.menu_box {
  height:4.78rem;
  width: 100%;

}
.menu_box img {
  float: left;
  height: 100%;
  width: 33.333%;
}
.timeLimit {
  width: 100%;
  height: 2.048rem;
  line-height: 2.048rem;
  background-color: #fff;
  margin-top: .42667rem;
  padding-left:.59733rem;
  font-size: 0;
  box-sizing:border-box;
}
.timeLimit .timeLimit-p {
  font-size: .68267rem;
  color:#4a4a4a;
}
.timeLimit .timeLimit-p .timeLimit-p-span {
  vertical-align: middle;
}
.timeLimit .timeLimit-p img {
  vertical-align: middle;
}
.swiper-container {
  background-color: #fff;
} 

.my_swiper {
  vertical-align: top;
  display: inline-block;
  width: 5.54667rem !important;
  height: 100%;
  margin-right: .42667rem;
  text-align: center;
  background-color: #fff;
  margin-top: 0;
  box-sizing: border-box;
  padding: 0 .42667rem;
}
 .my_swiper a {
  display: inline-block;
  width: 5.54667rem;
  height: 8.23467rem;
  overflow: hidden;
  margin: 0;
  text-decoration: none;
  background: white;
}
 .my_swiper img {
  display: block;
  width: 5.54667rem;
  height: 5.504rem;
  margin: 0;
}
 .my_swiper .my_swiper-p {
  width: 100%;
  position: relative;
  line-height: .768rem;
  height: .768rem;
  font-size: .59733rem;
  color: #e66b01;
  margin-top: .55467rem;
}
 .my_swiper .my_swiper-p .Saling {
  box-sizing: border-box;
  display:inline-block;
  position: absolute;
  left: 50%;
  top: -.93867rem;
  transform: translate(-50%);
  background-color: #fdeee0;
  color: #ff861d;
  height: .68267rem;
  width: auto;
  line-height: .68267rem;
  font-size: .42667rem;
  border-radius: .42667rem;
  padding: 0 .256rem;
}
 .my_swiper .my_swiper-p .Saling  img {
  display: inline-block;
  width: 0.512rem;
  height: 0.512rem;
  /* margin-right: 0.08533rem; */
  vertical-align: middle;
}
 .my_swiper .my_swiper-p .Saling .quick_span{
    vertical-align: middle;
    font-size: .4rem;
    display: inline-block;
}
 .my_swiper .my_swiper-p  .RMB {
  display: inline-block;
  vertical-align: top;

}
 .my_swiper .my_swiper-p  .newPrice {
  display: inline-block;
  vertical-align: top;
  font-size: .59733rem;
  color: #e66b01;
}
 .my_swiper .my_swiper-p  .oldPrice {
  display: inline-block;
  color: #bbb;
  font-size: .42667rem;
  letter-spacing: 0;
  text-decoration: line-through;
  vertical-align: 8%;
  margin-left: 0.1706rem;  
}
 .my_swiper a .text {
  width: 100%;
  font-size: 0.512rem;
  color: #4a4a4a;
  line-height: 0.72533rem;
  height: 0.72533rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.popularity {
  display: block;
  width: 100%;
  height: 2.048rem;
  line-height: 2.048rem;
  margin-top:0.42667rem;
  overflow: hidden; 
  background-color: #fff;
}
.popularity::after {
  display: block;
  width: 0;
  height: 0;
  content: '';
  clear: both;
}
.popularity .title_left {
  float: left;
  font-size: 0.68267rem;
  color:#333;
  padding-left: 0.59733rem;
}
.popularity .title_right {
  float: right;
  font-size: .59733rem;
  color: #999;
  position: relative;
  padding-right: 1.06667rem;

}
 .popularity .title_right .title_right_i{
    position: absolute;
    top: .66133rem;
    right: .512rem;
    width: .29867rem;
    height: .68267rem;
    display: inline-block;
    box-sizing: border-box;
    background: url('../assets/Good_product_images/right.png') no-repeat 50%;
    background-size: 90% auto;
 }
 .my_swiper_a .price {
    width: 100%;
    line-height: .768rem;
    height: .768rem;
    font-size: .59733rem;
    color: #e66b01;
    margin-top: .256rem;
 }
 .preferred_goods {
    width: 100%;
    display: block;
    overflow: hidden;
    height: 2.048rem;
    line-height: 2.048rem;
    background-color: #fff;
    margin-top: .42667rem;
    text-align: center;
    font-size: .68267rem;
    color: #333;
 }
 .preferred_goods .center_span{
    width: auto;
    padding: 0 .34133rem;
 }
 .all_main_box {
    float: left;
    width: 7.97867rem;
    height: 11.34933rem;
    background-color: #fff;
    border-bottom: 1px solid #ebebeb;
    box-sizing: border-box;
    overflow: hidden;
    border-right: 1px solid #ebebeb;
 }

 .all_main_products{
    width: 100%;
    background-color: #ebebeb;
    overflow: hidden;
 }
 .all_main_products .all_main_center {
    display: block;
    width: 100%;
    overflow: hidden;
 }
 .all_main_products .all_main_center .all_main_center_img {
    width: 7.97867rem;
    height: 7.97867rem;
    border: none;
    vertical-align: top;
 }
 .all_main_products .all_main_center  .introduce_tips {
    width: 100%;
    height: .59733rem;
    padding-left: .512rem;
    box-sizing: border-box;
    overflow: hidden;
 }
 .all_main_products .all_main_center  .introduce_tips p {
    float: left;
    width: auto;
    line-height: .42667rem;
    background: #eff3f9;
    border-radius: .02133rem;
    font-size: .42667rem;
    box-sizing: border-box;
    padding: .08533rem 0;
    margin-right: .256rem;
    color: #ffffff;
    background-color: #ff7700;
 }
 .introduce_text{
    width: 100%;
    height: .85333rem;
    line-height: .85333rem;
    margin-top: .21333rem;
    padding-left: .512rem;
    box-sizing: border-box;
    font-family: PingFangSC-Light;
    font-size: .59733rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
 .product_price {
    width: 100%;
    height: .93867rem;
    line-height: .93867rem;
    padding-left: .512rem;
    box-sizing: border-box;
    color: #e66b01;
    letter-spacing: 0;
    margin-top: .17067rem;
 }
 .product_price .price_character {
    display: inline-block;
    vertical-align: top;
    font-size: .59733rem;
    width: .34133rem;
    height: 100%;
    text-align: center;
 }
 .product_price_number {
    display: inline-block;
    vertical-align: top;
    font-size: .68267rem;
 }
.sale,.people{
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
    overflow-x: auto;
}
.white{
  width : 100%;
  height: 2.45rem;
}
</style>
