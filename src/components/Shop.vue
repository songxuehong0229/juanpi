<template>
    <div>
        <div id="img">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" @touchstart="start($event)" @touchend="end(0 , $event)"><img :src="obj.pic_url"></div>
                    <div class="swiper-slide" v-for = "(item,index) in picList" :key="item.id" @touchstart="start($event)" @touchend="end(index , $event)"><img :src="item"></div>
                </div>
            </div>
            <i class="iconfont"></i>
            <div class="num">{{ num.index }}/4</div>
        </div>
        <div id="content">
            <p class="price">
                <span>¥{{ obj.cprice }}</span>
                <label>¥{{ obj.oprice }}</label>
                <b>包税</b>
                <i></i>
            </p>
            <p class="time">距结束 : 5天23时23分23秒</p>
            <p class="name">{{ obj.title }}</p>
            <p class="else">
                <span>包邮</span>
                <span>526人已购</span>
                <span>美国</span>
            </p>
        </div>
        <div id="miao">
            <div><img src="http://s.juancdn.com/seller/images/icons/146.gif">美国品牌 · 中国香港直发 </div>
            <p>肌肤也可以“吃”竹子变靓！轻盈薄透的丝滑质地，深透至肌肤根源，顷刻间仿佛每个细胞都喝饱精粹！当指尖轻拍，竹粹能量即刻唤醒肌底沉睡生命力，肌肤重启生机，立现饱满莹透、嘭嘭弹润的幼嫩肤质！ </p>
        </div>
        <div id="bottom">
            <div><router-link to="/shouye"><img src="http://web.juanpi.com//static/media/home_dark.41f2a808.png">首页</router-link></div>
            <div class="cart"><router-link to="/cart"><img src="http://web.juanpi.com/static/media/cart_icon.5d19f0b4.png">购物车</router-link><span v-show="cart2!=0">{{ cart2 }}</span></div>
            <div>立即购买</div>
            <div @click="cart">加入购物车</div>
        </div>
    </div>
</template>
    
<script>
import SwiperCSS from "../../static/swiper-3.4.2.min.css"
import SwiperJS from "../../static/swiper-3.4.2.min.js"
import Vue from 'vue'



export default {
    name: "component_name",
    data () {
        return {
            list : [],
            num : {start : "" , end : "" , index : 1},
            picList : [
                "https://goods1.juancdn.com/bao/170427/1/4/59019f38a43d1f36c335e015_800x800.jpg?iopcmd=convert&Q=88&dst=jpg",
                "https://goods3.juancdn.com/bao/170612/5/a/593e26cba43d1f1722509642_800x800.jpg?iopcmd=convert&Q=88&dst=jpg",
                "https://goods8.juancdn.com/bao/170612/f/b/593e26d7ad0a49b3558b45ad_800x800.jpg?imageMogr2/quality/88!/format/jpg"
            ]
        }
    },
    methods : {
        Swiper(){
            Vue.nextTick(function(){
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: false,
                    direction:"horizontal"
                })
            })
        },
        start(e){
            this.num.start = e.targetTouches[0].clientX;
        },
        end(index , e){
            this.num.end = e.changedTouches[0].clientX;
            this.num.end - this.num.start > 50 ? this.num.index-- : this.num.index++;
            if(this.num.index > 4) this.num.index = 4;
            if(this.num.index < 1) this.num.index = 1;
        },
        cart(){
            this.$store.commit("CART");
        }
    },
    mounted(){
        //获取数据
        this.Swiper();
    },
    created(){
        this.$store.dispatch("shopList");
    },
    computed : {
        obj(){
            return this.$store.state.shop;
        },
        cart2(){
            return this.$store.state.cart.length;
        }
    }
}
</script>
    
<style lang="css" scoped>
    .swiper-container {
        width: 16rem;
        height: 16rem;
    }
    .swiper-container img{
        width: 16rem;
        height: 16rem;
    }
    #img{
        position: relative;
        background: #f4f4f8;
    }
    .iconfont{
        position: absolute;
        right: 0.512rem;
        top: 0.512rem;
        z-index: 100;
        width: 1.28rem;
        height:1.28rem;
        display: inline-block;
        font-size:1.28rem;
        background:rgba(0,0,0,0.3)  url(../assets/更多.png) no-repeat;
        background-size:100% 100%;
        border-radius:50%;
    }
    .num{
        position: absolute;
        width: 1.536rem;
        height: 0.8533333333333334rem;
        right: 0.768rem;
        bottom: 0.768rem;
        border-radius: 0.08533333333333333rem;
        background-color: rgba(0,0,0,.45);
        color: #fff;
        font-size: 0.4266666666666667rem;
        line-height: 0.8533333333333334rem;
        text-align: center;
        z-index: 10;
        color:white;
    }
    #content{
        width: 100%;
        box-sizing: border-box;
        padding: 0.512rem 0.5973333333333334rem 0.4266666666666667rem;
    }
    .price span{
        font-size: 1.024rem;
        line-height: 1.408rem;
        color: #ff464e;
        margin-right: 0.17066666666666666rem;
    }
    .price label{
        font-size: 0.512rem;
        color: #bbbbbb;
        margin-right: 0.4266666666666667rem;
        text-decoration: line-through;
    }
    .price{
        font-size:0;
        position: relative;
    }
    .price b{
        font-size: 0.4266666666666667rem;
        color: #ffffff;
        line-height: 1;
        padding: 0.042666666666666665rem 0.08533333333333333rem;
        background: rgb(102, 0, 238);
        font-weight: normal;
        vertical-align: text-bottom;
    }
    .price i{
        width: 1.024rem;
        height: 1.024rem;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background-size: 100% 100%;
        background: url(http://web.juanpi.com/static/media/collect.f8400f03.png) no-repeat;
        background-size: 100% 100%;
    }
    .time{
        font-size: 0.512rem;
        color: #999;
        margin-bottom: 0.3413333333333333rem;
    }
    .name{
        font-size: 0.6826666666666666rem;
        color: #333333;
        line-height: 0.9386666666666666rem;
        margin-bottom: 0.4266666666666667rem;
        margin-top: 0.17066666666666666rem;
    }
    .else{
        display: flex;
        width: 100%;
        font-size: 0.512rem;
        color: #999999;
    }
    .else span{
        flex:1;
        padding-left: 0.6826666666666666rem;
    }
    .else span:nth-of-type(1){
        text-align: left;
        background: url(http://web.juanpi.com/static/media/baoyou.780d8dab.png) left center no-repeat;
        background-size:0.6rem 0.6rem;
    }
    .else span:nth-of-type(2){
        text-align: center;
        background: url(http://web.juanpi.com/static/media/person.50c02f25.png) 22% center no-repeat;
        background-size:0.6rem 0.6rem;
    }
    .else span:nth-of-type(3){
        text-align: right;
        background: url(http://web.juanpi.com/static/media/address.7a3cdc69.png) 75% center no-repeat;
        background-size:0.6rem 0.6rem;
    }
    #miao{
        box-sizing: border-box;
        width: 100%;
        padding: 0 0.768rem;
        border-top: 1px solid #ebebeb;
    }
    #miao div{
        padding-top: 0.5333333333333333rem;
        padding-bottom: 0.49066666666666664rem;
        font-size: 0.512rem;
        color: #333;
    }
    #miao img{
        width: 0.9386666666666666rem;
        height: 0.5973333333333334rem;
        margin-right: 0.17066666666666666rem;
        vertical-align: bottom;
    }
    #miao p{
        padding-bottom: 0.4266666666666667rem;
        font-size: 0.512rem;
        color: #999;
        text-align: left;
        display: inline-block;
    }
    #bottom{
        width: 100%;
        position: fixed;
        bottom:0;
        left:0;
        z-index: 20;
        background: white;
    }
    #bottom div{
        float: left;
        height: 2.05rem;
        line-height: 1.1;
        text-align: center;
    }
    #bottom div:nth-of-type(1){
        width: 3.072rem;
        color: #6b6b6b;
        font-size: 0.4266666666666667rem;
        border-right:1px solid #e7e7e7;
        box-sizing: border-box;
    }
    #bottom div:nth-of-type(2){
        width: 3.072rem;
        color: #6b6b6b;
        font-size: 0.4266666666666667rem;
        border-right:1px solid #e7e7e7;       
    }
    #bottom div:nth-of-type(3){
        width: 3.96175rem;
        line-height: 2.15rem;
        font-size: 0.512rem;
        color:#333333;
    }
    #bottom div:nth-of-type(4){
        font-size: 0.512rem;
        line-height: 2.15rem;
        width: 5.84rem;
        background: #ff464e;
        color:white;
    }
    #bottom img{
        width: 1.024rem;
        height: 1.024rem;
        display: block;
        margin:0.2rem auto 0.1rem auto;
    }
    #bottom a{
        color:#666;
    }
    .cart{
        position: relative;
    }
    .cart span{
        position: absolute;
        width: 0.64rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: #ff464e;
        border-radius: 0.3413333333333333rem;
        color: #fff;
        top: 0.128rem;
        right: 0.7253333333333334rem;
        text-align: center;
    }
</style>