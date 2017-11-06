<template>
    <div id="all">
       <header id="t-index">
           <p>全球购</p>
           <div></div>
       </header>
       <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="1500"
        >
           <li v-for="item in list" :key="item.id">
                <figure>
                    <img :src="item.shop_cover">
                    <div class="top-jiaobiao">低至<br/>5.3折起</div>
                </figure>
                <div class="list">
                    <a @click = "luyou(items)" class="content" v-for = "items in item.shop_goods" :key="items.id">
                        <img :src="items.pic_url">
                        <div><span>{{ items.cprice }}</span><label>{{ items.oprice }}</label></div> 
                        <p>{{ items.title }}</p>   
                    </a>
                    <a class="content"><img :src="other"></a>            
                </div>
           </li>
       </ul>
    </div>
</template>
    
<script>

export default {
    name: "component_name",
    data () {
        return {
            // 查看全部的图片
            other : "http://jp.juancdn.com/jpwebapp_v1/images_v1/icon/this_global_more.png?20160825",
            loading : "",
            num : 1                          
        };
    },
    created(){
        // 通过VueX请求全球购商品数据
        this.$store.dispatch("shopList");
    },
    methods : {
        // 跳转到商品详情页的方法 items代表用户点击商品的数据
        luyou(items){
            this.$router.push("/shop/"+ items.goods_id);
            // 将用户点击的商品数据通过存入VueX
            this.$store.commit("SHOP" , items);
        },
        // 向下滚动加载数据的方法
        loadMore(){
            this.num++;
            // this.loading的布尔值 若true 则无法滚动 
            this.loading = true
            setTimeout(() => {
                // 通过改变请求url 中上送数据page的值来请求不同的数据
                this.$http.jsonp("https://shop.juanpi.com/gsort?key=310&type=6&zhouyi_ids=p8_c4_l1_51_1064_18_5_128&machining=showshopgoods&page="+ this.num +"&rows=10&callback=gsort_callback").then(res => {
                    for(let item of res.data.list){
                        // 将请求回来的数据追加到全球购商品列表中
                        this.list.push(item)
                    }
                    let self = this;
                    this.list.forEach(function(item, index){
                        if(!item.shop_cover || item.shop_goods.length < 7) self.list.splice(index , 1);
                    })
                } , err => {
                    console.log(err);
                });
                this.loading = false;
            }, 1000)
        }
    },
    computed : {
        // 实时监听全球购商品数据的变化
        list(){
            return this.$store.state.shopList;
        }
    }
}
</script>
    
<style lang="css" scoped>
    #all{
        overflow: hidden;
    }
    header{
        width: 100%;
        height: auto;
        border-bottom: 1px solid #dedede;
    }
    header p{
        height: 2.2rem;
        width: 100%;
        position: relative;
        z-index: 199;
        text-indent: 5%;
        box-sizing: border-box;
        padding:0 1.8rem;
        font-size: 0.9rem;
        text-align: center;
        line-height: 2.2rem;
        color:#333;
    }
    header div{
        margin:0.5rem 0.6rem 0 0;
        position: absolute;
        right:0;
        top:0;
        width:1.1rem;
        height: 1.1rem;
        background: url("../assets/fenlei.png") no-repeat;
        background-size : 1.1rem 1.1rem;
    }
    figure img{
        width: 16.25rem;
        height: auto;
        display: block;
    }
    figure{
        position: relative;
    }
    figure:before{
        content: "";
        z-index: 2;
        bottom: -.42667rem;
        width: 0;
        height: 0;
        left: 47%;
        position: absolute;
        border-width: 0.64rem .768rem;
        border-style: none dashed dashed solid;
        border-color: transparent transparent #fff;
    }
    li{
        width: 100%;
    }
    .list{
        margin:0.5rem 0 1rem 0;
        width: 100%;
        height: 7.5rem;
        white-space: nowrap;
        font-size: 0;
        overflow: hidden;
        overflow-x: auto;
    }
    .top-jiaobiao{
        z-index: 2;
        top: 0;
        left: .42667rem;
        width: 2.25rem;
        height: 1.6rem;
        line-height: 1.1;
        padding-top: 1.2%;
        background: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/icon/top-jiaobiao.png) 50% no-repeat;
        font-size: 0.5rem;
        background-size: contain;
        text-align: center;
        box-sizing: border-box;
        position: absolute;
        color:white;
    }
    .content{
        display: inline-block;
        width: 4.5rem;
        height: 7.5rem;
        margin-left: 0.5rem;
        vertical-align: top;
        display: inline-block;
    }
    .content img{
        width: 4.5rem;
        height: 4.5rem;
        display: inline;
    }
    .content div{
        height: 0.7rem;
        margin-bottom: 0.15rem;
        color: #bbb;
        text-align: center;
        padding: .21333rem 0 0 0;
    }
    .content span{
        font-size: 0.6rem;
        color: #60e;
        margin-right: 0.1rem;
    }
    .content label{
        margin-top: .064rem;
        font-size: 0.5rem;
        text-decoration: line-through;
        vertical-align: top;
        display: inline-block;
    }
    .content p{
        height: 1.4rem;
        font-size: 0.6rem;
        line-height: 1.2;
        color: #666;
        white-space: normal;
        word-break: break-all;
        text-align: center;
    }
</style>