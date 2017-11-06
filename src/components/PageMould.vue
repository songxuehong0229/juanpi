<template>
    <div class="page-mould">
        <!-- 一、顶部导航 -->
        <div class="top-navs">
            <div class="logo-bar">
                <img src="../assets/top-logo.png" height="48" width="96">
                <router-link to="/classify" style="display:inline-block;color:gray;"><i class="iconfont icon-fenlei"></i></router-link>
            </div>
            <!-- 横条导航 -->
            <nav>
                <span
                    v-for="(item, index) in subtab"
                    :key="item.id"
                    @click="showPage(item.nav_cid, item.nav_num, item.goods_url, index)"
                    :class="{activeNav: type == item.nav_cid}">{{item.title}}
                </span>
            </nav>
        </div>
        <!-- 二、模块导航 -->
        <div class="module-nav">
             <!-- 8个圆形导航 -->
            <ul class="module-nav-row" v-for="item in nav" :key="item.id">
                <li v-for="(nav1_item, nav1_index) in item" :key="nav1_item.id">
                    <a href="javascript:void(0)">
                        <img v-bind:src="nav1_item.pic">
                    </a>
                </li>
            </ul>
            <!-- 小bannner商品图 -->
            <ul class="module-nav-row" v-for="item in smallBanner" :key="item.id">
                <li v-for="itemInner in item" :key="itemInner.id">
                    <a href="javascript:void(0)">
                        <img v-bind:src="itemInner.pic">
                    </a>
                </li>
            </ul>
            <!-- 每天早10点/晚8点上新 -->
            <div class="module-nav-update line">
                <img :src="nav3">
            </div>
        </div>
        <!-- 三、商品列表 -->
        <ul class="goods-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="goods-item" v-for="(item, index) in products" :key="item.id">
                <!-- 图片 -->
                <a href="javascript:void(0)" class="pic">
                    <div class="pic-placeholder"></div>
                    <img class="pic-detail" :src="item.pic_url">
                    <img class="pic-shoplogo" :src="item.shop_logo">
                </a>
                <!-- 描述 -->
                <a href="javascript:void(0)" class="info">
                    <!-- 促销信息 -->
                    <!-- 如果item.coupon存在 -->
                    <p class="sale" v-if="item.coupon">
                        {{ item.coupon.rules[0].aeBankInfo }}
                    </p>
                    <!-- 如果item.coupon不存在 -->
                    <p class="sale" v-else>
                        <label class="new-price">{{ '￥'+item.cprice }}</label>
                        <label class="old-price">{{ '￥'+item.oprice }}</label>
                    </p>
                    <!-- title信息 -->
                    <h3 class="title">{{ item.coupon && item.coupon.abName || item.title}}</h3>
                    <!-- 剩余时间 -->
                    <p class="only-time">{{ item.residue }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'page-mould',
        data () {
            return {
                subtab: [],
                // 圆形导航
                nav: [],
                // 小bannner商品图
                smallBanner: [],
                // 早10点，晚8点上新
                nav3: '',
                products: [],
                goods_url: '',
                num: 1,
                type: 'shangxin'
            }
        },
        created() {
            //请求：顶部导航
            this.$http.get('../../static/TopNavs.json')
            .then(res => {
                this.subtab = res.body.menu_list[0].subtab;
                for(var item of this.subtab){
                    if(item.nav_cid == this.$route.params.id){
                        this.showPage(item.nav_cid, item.nav_num, item.goods_url)
                    }
                }
            }, err => {
                console.log(err);
            });
        },
        methods: {
            showPage(nav_cid, nav_num, goods_url, index) {
                this.type = nav_cid;

                this.products = [];
                if(index == 0){
                    this.$router.push("/shouye")
                    return
                }
                //请求：模块导航
                this.$http.jsonp('https://jas.juanpi.com/pagetag/page?unique=module_ads%2Cbanner_ads&cid=' + nav_cid + '&zy_id=c4_l1_51_1064_18_5_128&platform=m&_=' + nav_num + '&callback=jsonp1')
                .then(res => {
                    this.nav = [];
                    this.smallBanner = [];
                    for (var item of res.body.module_ads.multi_block) {
                        if (item.block_type == 6) {
                            this.nav.push(item.data[0].child);
                        }
                        if (item.block_type == 1) {
                            this.nav3 = item.data[0].child[0].pic;
                        }
                        if (item.block_type == 3) {
                            this.smallBanner.push(item.data[0].child);
                        }
                    }
                }, err => {
                    console.log(err);
                });

                //请求：商品列表
                this.goods_url = goods_url;

                this.$http.jsonp(goods_url)
                .then( res => {
                    // console.log(res.body.list)
                    for (var item of res.body.list) {
                       this.products.push(item)
                    }
                }, err => {
                    console.log(err);
                });
            },
            loadMore() {
                this.num ++;
                this.loading = true;

                // let index = this.goods_url.indexOf('page=')
                // let str1 = this.goods_url.substr(0, index + 5);
                // let str2 = this.goods_url.substr( index + 6 );

                setTimeout(() => {
                    // console.log(str1 + this.num + str2)
                    // console.log(str1 + this.num + str2)

                    let index = this.goods_url.indexOf('page=')
                    let str1 = this.goods_url.substr(0, index + 5);
                    let str2 = this.goods_url.substr( index + 6 );

                    this.$http.jsonp(str1 + this.num + str2)
                    .then( res => {
                        for (let item of res.body.list) {
                            this.products.push(item)
                        }
                    }, err => {
                        console.log(err)
                    })
                    this.loading = false;
                }, 1);
            }
        }
    }
</script>

<style scoped>
   /*全局样式*/
    * {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
    a {
        text-decoration: none;
    }

    /*------------------一、顶部导航------------------*/
    .top-navs {
        width:100%;
        max-width: 1080px;
        margin: 0 auto;
    }
    /*顶部logo区*/
    .top-navs .logo-bar {
        width: 100%;
        /*最大宽度*/
        max-width: 1080px;
        margin: 0 auto;
        height: 2.2rem;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

    }
    /*图标字体*/
    .top-navs .logo-bar .icon-fenlei {
        font-size: 48px;
        position: absolute;
        right: 0.3rem;
    }
    .icon-fenlei{
        top:0.5rem;
    }
    .top-navs nav {
        /*出现滚动条，但是页面不晃动*/
        white-space: nowrap;
        /*overflow: auto;*/
        overflow: scroll;
        overflow-y: hidden;
    }
    .top-navs nav span {
        background: #fff;
        font-size: 28px;
        color: #333;
        height: 76px;
        line-height: 76px;
        display: inline-block;
        padding: 0 0.3rem;
        margin: 0 0.2rem;
    }
    /* 横条样式点击时，激活的状态 */
    .activeNav {
        color: #FF464E !important;
        border-bottom: 4px solid #ff464e;
    }

    /*------------------二、模块导航------------------*/
    .module-nav {
        width: 100%;
        /*最大宽度*/
        max-width: 1080px;
        margin: 0 auto;
        background: #f4f4f9 !important;
    }
    .module-nav-row {
        background: white !important;
        width: 100%;
        /*最大宽度*/
        max-width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
    }
    .module-nav-row li {
        /*width: 4.0rem;
        height: 4.25rem;*/
    }
    .module-nav-row li img {
        /*消除img作为行内块的垂直方向的间隙*/
        display: block;
        width: 100%;
        height: 100%;
    }
    /*每天早10点/晚8点上新*/
    .module-nav-update {
        width: 100%;
        /*最大宽度*/
        max-width: 1080px;
        margin: 0 auto;
        height: 2.05rem;
    }
    /* 灰色的横线 */
    .line {
         margin-top: .4rem;
    }
    .module-nav-update img {
        display: block;
        width: 100%;
        height: 2.05rem;
    }

    /*------------------三、商品列表------------------ */
   .goods-list {
       width: 100%;
       max-width: 1080px;
       margin: 0 auto;
       display: flex;
       flex-wrap: wrap;
       background: #f9f9f9;
   }
   /* 每一个商品 */
   .goods-item {
        width: 7.95rem;
        /*height: 434px;*/
        margin-top: .08533rem;
   }
   .goods-item:nth-child(odd) {
        margin-right: 0.1rem;
   }
   /* 商品图片 */
   .goods-item .pic {
        position: relative;
        display: block;
        width: 7.95rem;
        height: 8.0rem;
   }
    /* 商品大图 */
   .goods-item .pic .pic-detail {
        display: block;
        width: 7.95rem;
        height: 8.0rem;
   }
   /* 商品店铺logo */
   .goods-item .pic .pic-shoplogo {
        position: absolute;
        right: 0.5rem;
        bottom: -0.5rem;
        width: 2.13325rem;
        height: 1.0665rem;
        border: 1px solid #ebebeb;
        z-index: 9;
        opacity: 1;
        background: white;
   }
    /* 商品描述信息 */
   .goods-item .info {
        box-sizing: border-box;
        font-size: 16px;
        display: block;
        padding: 0.4rem;
        position: relative;
        background: white;
   }
   /* 促销描述 */
   .goods-item .info .sale {
        color: #ff464e;
        font-size: 0.65rem !important;
        /* 解决：无限加载出来的数据，字体变大的问题~ */
        display: inline-block;
   }
   /* 促销描述-老价格 */
   .goods-item .info .sale .old-price {
       color: #bbb;
       font-size: 0.5rem;
       text-decoration: line-through;
   }
   /* 促销描述-新价格 */
   .goods-item .info .sale .new-price {
       color: #60e;
   }
   /* 商品标题描述 */
   .goods-item .info .title {
        width: 5rem;
        font-size: 0.6rem;
        color: #333;
        font-weight: 300;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 0.25rem;
   }
   /* 促销剩余时间 */
   .goods-item .info .only-time {
        position: absolute;
        right: 0.5rem;
        top: 1.50rem;
        font-size: 0.55rem;
        color: #bbb;
   }
</style>
