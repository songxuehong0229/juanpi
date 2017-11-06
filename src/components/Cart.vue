<template>
    <div id="cart">
       <header class="header">
         <span class="text_cart">购物车</span>
         <span class="text-user" @click="cart.length != 0 ? flag2 = !flag2 : '' " v-if="flag2">编辑</span>
         <span class="text-user" @click="flag2 = !flag2 " v-else>完成</span>         
       </header>
       <div class="white"></div>
       <!-- 没有物品的时候 -->
       <div class="not" v-if="cart.length == 0 && flag2">
         <img src="//jp.juancdn.com/jpwebapp_v1/images_v1/shopping/empty-cart.png">
         <div>看到喜欢的就带回家吧</div>
         <router-link to="/shouye">今日推荐</router-link>
       </div>
       <!-- 添加购物车的数据 -->
       <ul v-else>
         <li v-for="item in cart" :key="item.id">
           <input type="checkbox" v-model="item.flag">
           <div>
             <img :src="item.pic_url">
             <div>
              <p>{{ item.title }}</p>
              <p></p>
              <p class="price">
                <span class="news">￥{{ item.cprice }}</span>
                <span class="olds">￥{{ item.oprice }}</span>
                <label class="jia" @click="jia(item.goods_id)">+</label>
                <input type="number" v-model="item.num">
                <label class="jian" @click="jian(item.goods_id)" :class="{'red':item.num!=1}">-</label>
              </p>
             </div>
           </div>
         </li>
       </ul>
       <div class="AllPrice" v-if="cart.length != 0 || !flag2">
         <div>
           <input type="checkbox" :checked="flag" @click="flags"> <span>全选</span> 
         </div>
         <div>
           <p>合计 <span>¥ {{ Callprice.toFixed(2) }}</span></p>
           <p>总额 : ¥ {{ Oallprice.toFixed(2) }} 立减 : {{ Oallprice - Callprice }}</p>
         </div>
         <div v-if="flag2">
           去结算({{ length }})
         </div>
         <div v-else @click="dels">
           删除
         </div>
       </div>
       <div class="white2"></div>
    </div>
</template>
    
<script>

export default {
  name: "component_name",
  data(){
    return {
      Callprice : 0,
      Oallprice : 0,
      length : 0,
      flag2 : true,
      del : []
    }
  },
  computed : {
    cart(){
      let c = 0, o = 0, l = 0;
      for(let item of this.$store.state.cart){
        c += item.cprice * item.num * item.flag;
        o += item.oprice * item.num * item.flag; 
        l += item.flag * item.num;      
      }
      this.Callprice = c;
      this.Oallprice = o;
      this.length = l;
      return this.$store.state.cart;
    },
    flag(){
      return this.$store.state.cart.every(function(value, index){
        return value.flag
      })
    }
  },
  methods : {
    jia(id){
      this.$store.dispatch("jia", id)
    },
    jian(id){
      this.$store.dispatch("jian", id)
    },
    flags(){
      if(this.flag){
        for(let item of this.$store.state.cart){
          item.flag = false;
        }
      }else{
        for(let item of this.$store.state.cart){
          item.flag = true;
        }
      }
    },
    dels(){
      for(let item of this.cart){
        if(item.flag){
          this.$store.dispatch("dels", item)
        }
      }
    }
  }
}
</script>
    
<style lang="css" scoped>
@import "../../static/font.css";
    #cart {
      padding-bottom: 7.424rem;
      position: absolute;
      margin: 0 auto;
      width: 100%;
      height: 20rem;
       background: #f4f4f8;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 88px;
      background-color: #fff;
      border-bottom: 1px solid #ebebeb;
      z-index: 10;
    }
    .text_cart {
      box-sizing: border-box;
      padding: 0 1.536rem;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: space normal;
      width: 100%;
      display: inline-block;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;

    }
    .text-user {
      padding-right: 28px;
      position: relative;
      z-index: 2;
    }
    .ajax_cart {
      margin-top: 88px;
    }
    [data-dpr = '2'] .header .text_cart {
        font-size: 36px;
    }
    [data-dpr = '2'] .text_cart {
      line-height: 88px;
    }
    [data-dpr = '2'] .text_cart {
      height: 88px;
    }
    [data-dpr = '2'] .text-user {
      font-size: 30px;
    }
    [data-dpr = '2'] .text-user {
      padding-top:20px;
      color: #4a4a4a;
      float: right;  
    }
    [data-dpr = '2'] .item_cart {
      margin-bottom: 20px;
    }
    .item_cart {
      margin-bottom: 10px;
    }
    [data-dpr = '2'] .item_cart .item_header_cart {
      height: 2.2rem;
    }
    [data-dpr = '1'] .item_cart .item_header_cart {
      height: 1.1rem;
    }
    .item_cart .item_header_cart .cart_header {
      padding: 0 28px;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      border-bottom: 1px solid #ebebeb;
    }
    [data-dpr = '2'] .item_header_cart .cart_header .head_radio {
       width: 62px; 
    }
    [data-dpr = '2'] .cart_header .head_radio  {
      font-size: 40px;
      color: #9b9b9b;
      
    }
   
    .iconfont{
      font-family:"iconfont" !important;
      font-size:40px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
    .weixuanzhong:before {
      content: "\e622";
    }
    .not{
      width: 100%;
      text-align: center;
      margin: 1.06667rem 0;
      clear: both;
    }
    .not img{
      width: 7rem;
      display: block;
      margin: 0 auto 0.6rem auto;
      height: auto;
    }
    .white{
      width:100%;
      height: 88px;
    }
    .not div{
      width: 100%;
      font-size: 0.8rem;
      color: #333;
      margin-bottom: .59733rem;
      text-align: center;
    }
    .not a{
      display: block;
      width: 6.9rem;
      height: 2rem;
      color: #ff464e;
    border: 1px solid currentColor;
        text-align: center;
        line-height: 2rem;
        font-size: 0.75rem;
        margin:0 auto;
    }
    li{
      width: 100%;
      height: 6.125rem;
      box-sizing: border-box;
      padding-left:0.7rem;
      background: white;
      border-bottom: 0.5rem solid #f4f4f8;
    }
    li>input{
      display: inline-block;
      width: 1rem;
      height: 1rem;
      margin: 2.5625rem 0.55rem 0 0;
      float: left;
    }
    li>div {
      width: 13.05rem;
      height: 4.5rem;
      margin:0.8rem 0.7rem 0.8rem 0;
      float: left;
    }
    li>div img{
      width: 4.5rem;
      height: 4.5rem;
      float: left;
      margin-right: 0.6rem;
    }
    li>div div{
      width:7.95rem;
      height:4.5rem;
      font-size: 0.7rem;
      float: left;
      position: relative;
    }
    li>div div .price{
      position: absolute;
      bottom:0;
      width: 100%;
    }
    .news{
        color: #ff464e;
        float: left;
    }
    .olds{
      font-size: 0.5rem;
      color: #bbb;
      float: left;
      margin-left: 0.2rem;
      margin-top:0.25rem;
    }
    li>div div input{
      color: #333;
      float: left;
      text-align: center;
      width: 1.875rem;
      height: 1.15rem;
      border:none;
      font-size: 0.7rem;
      float: right;
    }
    .jia,.jian{
      width: 1.15rem;
      height: 1.15rem;
      background-color: #f4f4f8;
      cursor: pointer;
      float: right;
      text-align: center;
      line-height: 1.15rem;
    }
    li>div div .jian{
      margin-left: 0.178rem;
    }
    li>div div .jia{
      color: #ff464e;
    }
    .red{
      color: #ff464e;
    }
    .white2{
      width: 100%;
      height: 2.5rem;
    }
    .AllPrice{
      width: 100%;
      position: fixed;
      bottom: 2.45rem;
      background: white;
      height: 2.425rem;
    }
    .AllPrice div{
      float: left;
    }
    .AllPrice div:nth-of-type(1){
      width: 25%;
      color: #333;
      text-align: center;
      line-height: 2.425rem;
      font-size: 0
    }
    .AllPrice div:nth-of-type(1) input{
      width: 1rem;
      height: 1rem;
      vertical-align: center;
      margin-right: 0.35rem;
    }
    .AllPrice div:nth-of-type(1) span{
      font-size: 0.8rem;
    }
    .AllPrice div:nth-of-type(3),.AllPrice div:nth-of-type(4){
      float: right;
      background-color: #ff464e;
      color: #fff;
      text-align: center;
      width: 30%;
      line-height: 2.425rem;
      font-size: 0.9rem;
    }
    .AllPrice div:nth-of-type(2){
      width: 45%;
      padding-right: .21333rem;
      box-sizing: border-box;
      float: left;
      font-size: 0.7rem;
      text-align: right;
    }
    .AllPrice div:nth-of-type(2) p:first-of-type{
      margin-top:0.3rem;
      color:#666;

    }
    .AllPrice div:nth-of-type(2) p:first-of-type span{
      color: #ff464e;
    }
    .AllPrice div:nth-of-type(2) p:last-of-type{
      color: #999;
      font-size: 0.5rem;
    }
    
   
</style>