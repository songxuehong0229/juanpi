<template>
    <div id="page">
       <div id="header">
         <div class="fixtop">
           <div class="search-block">
              <div class="search-input">
                <span class="icon"></span>
                <p class="lable">搜索商品</p>
              </div>
           </div>
           <span class="user">
            <router-link to="classify"><img src="../assets/search.jpg"></router-link>
           </span>
         </div>
       </div>
       <div id="menu">
         <div class="menubox">
           <nav class="nav">
             <a href="javascript:;" class="red">上新</a>
             <a href="/pagemould/312">女装</a>
             <a href="/pagemould/313">鞋包</a>
             <a href="/pagemould/314">母婴</a>
             <a href="/pagemould/1296">数码</a>
             <a href="/pagemould/1295">居家</a>
             <a href="/pagemould/316">男士</a>
             <a href="/pagemould/317">美妆</a>
             <a href="/pagemould/318">美食</a>
             <a href="/pagemould/2048">精品配饰</a>
           </nav>
         </div>
       </div>
       <div id="banner">
        <template>
         <swiper :options="swiperOption">
              <swiper-slide v-for="item in banner" :key="item.id">
                  <img :src="item.pic">
              </swiper-slide>
         </swiper>
       </template>
       </div>
       <div id="module">
         <div class="type1">
           <div class="col" style="width:25%" v-for="item in msg.data[0].child" :key="item.id">
             <a href="javascript:;">
               <img :src="item.pic">
             </a>
           </div>
         </div>
         <div class="type2">
           <div class="col1" style="width:50%" v-for="item in msg1.data[0].child" :key="item.id">
             <a href="javascript:;">
               <img :src="item.pic">
             </a>
           </div>
         </div>
         <div class="type4" v-if="msg2.block_type != 1">
           <div class="cols">
              <a href="javascript:;" v-for="item in msg2.data[0].child" :key="item.id">
               <img :src="item.pic">
             </a>
           </div>
         </div>
         <div class="type3">
           <div class="col2">
             <a href="javascript:;">
               <img src="https://goods1.juancdn.com/bao/170310/0/f/58c20db7a43d1f63427015d8_750x96.jpg?iopcmd=convert&Q=85&dst=webp" alt="">
             </a>
           </div>
         </div>
       </div>
       <div id="goods" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="1500">
         <ul>
             <li v-for="(item,index) in list" :key="item.id">
             <a href="javascript:;">
               <img :src="item.pic_url" alt="">
               <div class="loaded">
                 <img :src="item.shop_logo" alt="">
               </div>
             </a>
             <a href="javascript:;">
               <div class="list-price">
                 <span class="coupon-info">{{item.coupon ? item.coupon.rules[0].aeBankInfo : "¥"+item.cprice}}</span>
                 <span class="only-time">上新</span>
               </div>
               <h3 class="short">{{item.title}}</h3>
             </a>
            </li>
         </ul>
       </div>
   <div class="bottom"></div>
   </div>
</template>
    
<script>
  import Vue from 'vue'
  import Swiper from "vue-awesome-swiper"
  Vue.use(Swiper)
  import "../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.min.css"
  import "../../node_modules/vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css"
  import $ from "../../static/jquery-1.11.2"

export default {
      name: "component_name",
      data () {
        return {
          list : [],
          banner : [],
          msg : [],
          msg1 : [],
          msg2 : [],
          num : 1,
          loading : "",
          swiperOption: {
            loop: true,
            autoplay:1000
          }
        } 
      },
      created(){
        this.$http.jsonp("https://shop.juanpi.com/zxg?key=zuixinzhekou&type=1&zhouyi_ids=p8_c4_l1_128_18_51_5_1064&machining=gsortzxg&page=1&rows=10&dtype=JSONP&price_range=&cat_threeids=&cm=1&cm_channel=1&callback=gsort_callback").then(res => {
          for(let item of res.data.list){
            this.list.push(item)
          }
        } , err => {
          console.log(err);
        });
        this.$http.jsonp("https://jas.juanpi.com/pagetag/page?unique=module_ads%2Cbanner_ads%2Ctopbanner%2Cpopup_ads&cat_name=newest_zhe&zy_id=c4_l1_51_1064_18_5_128&platform=m&_=1506598755612&callback=jsonp1").then(res => {
          this.banner = res.data.banner_ads;
          console.log(this.banner)
          this.msg = res.data.module_ads.multi_block[0];  
          this.msg1 = res.data.module_ads.multi_block[1];          
          this.msg2 = res.data.module_ads.multi_block[2];                          
        } , err => {
          console.log(err);
        })
        
      },
      methods : {
        loadMore(){
          this.num ++;
          this.loading = true
          setTimeout(() => {
              this.$http.jsonp("https://shop.juanpi.com/zxg?key=zuixinzhekou&type=1&zhouyi_ids=p8_c4_l1_128_18_51_5_1064&machining=gsortzxg&page="+ this.num +"&rows=10&dtype=JSONP&price_range=&cat_threeids=&cm=1&cm_channel=1&callback=gsort_callback").then(res => {
                for(let item of res.data.list){
                  this.list.push(item)
                }
              } , err => {
                console.log(err);
              });
              this.loading = false;
          }, 1000)
        }
      }
};  
  //顶部导航栏移动居顶
  window .onscroll = function(){
    var top = document.documentElement.scrollTop ||document.body.scrollTop;
    if(top>166){
      $("#menu").css({"position":"fixed","top":"0px","margin":"auto"});
    }else{
      $("#menu").css({"position":"static"});
    }
  }
</script>
    
<style lang="css" scoped>
    *{
      padding: 0;
      margin: 0;
    }
    html{
      margin: 0 auto;
    }
    #header{
      width: 100%;
      height: 2.225rem;
     z-index: 199;
      overflow: inherit;
      border-bottom: 1px solid #ebebeb;
      padding-top: 0.1px;
      position: relative;
    }
    .search-block{
      height: 1.9rem;
      padding-right: 1.87733rem;
      padding-left: .59733rem;
      box-sizing: border-box;
      color: #bbb;
    }
    .search-input{
      height: 1.4rem;
      line-height: 1.4rem;
      background-color: #f2f2f2;
      border-radius: .17067rem;
      font-size: 12px;
      list-style: none;
      margin-top: 0.5rem;
      padding-left: 1.55rem;
    }
    .icon{
      content: "\e62b";
     
    }
    .lable{
      line-height: 1.4rem;
      float: left;
      font-size: 0.6rem;
    }
    .user{
      background-size:contain;
      position: absolute;
      right: 0.1rem;
      top:0;
      width: 1.875rem;
      height: 1.7rem;
      display: flex;
    }
    .user a{
      margin:auto;
    }
    .user img{
      width: 1rem;
      height: 1rem;
    }
    #menu{
      width: 100%;
      max-width: 16rem;
      min-width: 6.82667rem;
      background: #fff;
      line-height: 1;
      z-index: 10;
    }
    #menubox{
      width: 100%;
      overflow: auto;
      overflow-x: auto;
      overflow-y: hidden;
      background: #fff;
      position: static;
      top: 0;
      z-index: 400;
      max-width: 16rem;
      min-width: 6.82667rem;
    }
  .nav{
    background: #fff;
    white-space: nowrap;
    overflow: auto;
    overflow-y: hidden;
  }
  .nav>a{
    line-height: 1.9rem;
    height: 1.9rem;
    display: inline-block;
    font-size: 0.7rem;
    text-align: center;
    color: #333;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 .21333rem;
    margin: 0 .29867rem;
    background: #fff;
     -webkit-tap-highlight-color: transparent;
    text-decoration: none;
  }
  #banner{
    width: 100%;
    height: 6.175rem;
  }
  .area{
    width: 100%;
    margin: 0 auto;
    max-width: 16rem;
    overflow: hidden;
     white-space: nowrap;
    overflow: hidden;
    overflow-x: auto;
    height: 100%;
  }
  .area div{
    display: inline-block;
    position: absolute;
    z-index: 80;
    width: 100%;
    float: left;
  }
  .area ul{
    height: 100%;
    width: 100%;
    list-style: none;
    display: block;
   
  }
  #banner li{
    list-style: outside none none;
    height: 100%;
    width: 100%;
  }
  #banner img{
    width: 100%;
    display: block;
  }
  #module{
    width: 100%;
    max-width: 16rem;
    min-width: 6.82667rem;
  }
  .type1{
    width: 100%;
    background: #fff;
    overflow: hidden;
    border-top: .42667rem #f4f4f8 solid;
  }
  .col{
    width: 25%;
    float: left;
  }
  .col img{
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
  }
  .type2{
    width: 100%;
    background: #fff;
    overflow: hidden;
    border-top: .42667rem #f4f4f8 solid;
  }
  .col1{
    float: left;
    position: relative;
  }
  .col1 img{
    position: relative;
    z-index: 1;
    height: 100%;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
  }
  .row{
    float: left;
    position: relative;
  }
  .row a{
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    text-decoration: none;
  }
  .row img{
    border-top: none;
    border-left: 1px solid #ebebeb;
    position: relative;
    z-index: 1;
    height: 100%;
    display: block;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
  }
  .type3{
    width: 100%;
    border-top: .42667rem #f4f4f8 solid;
  }
  .type4{
    width: 100%;
    font-size: 0;
    border-top: .42667rem #f4f4f8 solid;    
  }
  .type3 a{
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    text-decoration: none;
  }
  .type3 img{
    position: relative;
    z-index: 1;
    height: 100%;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
  }
  #goods{
    width: 100%;
    height: 100%;
    min-height: inherit;
    display: block;
    overflow: hidden;
    background: #f4f4f8;
  }
  #goods ul{
    width: 16.21333rem;
    list-style: none;
    display: block;
  }
  #goods li{
    float: left;
    background: #fff;
    width: 8rem;
    margin-right: .08533rem;
    margin-top: .08533rem;
    list-style: none;
    height: 10.85rem;
  }
  #goods a:first-of-type{
    display: block;
    position: relative;
  }
  #goods a:first-of-type>img{
    width: 8rem;
    height: 8rem;
  }
  .loaded{
    position: absolute;
    top: 7.46667rem;
    right: .34133rem;
    width: 2.13333rem;
    height: 1.06667rem;
    border: 1px solid #ebebeb;
    border-width: 1px;
    background: white;
  }
  .loaded>img{
    position: absolute;
    top: 0;
    left: 0;
    width: 2.13333rem;
    height: 1.06667rem;
  }
  #goods a:last-of-type{
    text-decoration: none;
  }
  .list-price{
    width: 92%;
    position: relative;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    margin-top: 0;
    line-height: 1.2rem;
    height: 1.2rem;
  }
  .coupon-info{
    font-size: 0.65rem;
    color: #ff464e;
    width: 63%;
    display: inline-block;
    line-height: 0.7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
    margin-top: 10px;
    text-align: left;
  }
  .only-time{
     position: absolute;
    color: #bbb;
    font-size: 0.55rem;
    right: 0;
    bottom:-1.1rem;
  }
  .short{
    width: 100%;
    margin-top: 2px;
    font-size: 0.6rem;
    color: #333;
    text-indent: 0.4rem;
    float: left;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight:normal;
    padding-right: 3.1rem;
    box-sizing: border-box;
  }
  .cols{
    height: 5.325rem;
    display: inline-block;
  }
  .cols>a{
        text-decoration: none;
  }
  .cols img{
    width: 100%;
    height: 100%;
  }
  .bottom{
    width: 100%;
    height: 2.5rem;
  }
  .fixtop{
    position: relative;
  }
  .nav .red{
    color: #FF464E;
    border-bottom: 4px solid #ff464e;
  }
  .swiper-container{
    width : 100%;
    height: 100%;
  }
</style>