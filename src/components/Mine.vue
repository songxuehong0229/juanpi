<template>
    <div id="mine">
        <div class="user-top">
            <p>个人中心</p>
            <ul>
                <li><a href="javascript:void(0)">注册</a></li>
                <li></li>
                <li><a href="javascript:void(0)">登录</a></li>
            </ul>
        </div>
        <ul class="user-box">
            <li class="user-box-order">
                <span class="my-order">我的订单</span>
                <span class="all-order">全部订单</span>
            </li>
            <li>
                <div>
                    <i class="iconfont icon-daifukuan"></i>
                    <span>待付款</span>
                </div>
                <div>
                    <i class="iconfont icon-daichengtuan"></i>
                    <span>待成团</span>
                </div>
                <div>
                    <i class="iconfont icon-daishouhuo"></i>
                    <span>待收货</span>
                </div>
                <div>
                    <i class="iconfont icon-tuikuan"></i>
                    <span>退款/售后</span>
                </div>
            </li>
        </ul>
        <div class="user-foot">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'mine',
        data () {
            return {

            }
        },
        components: {

        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }
    a {
        text-decoration: none;
    }
    /* 顶部登录和注册 */
   .user-top {
        width: 100%;
        /*最大宽度*/
        max-width: 1080px;
        margin: 0 auto;
        height: 7.2rem;
        /*background: pink;*/
        background: url(../assets/user_center_bg.png) no-repeat;
        background-size: cover;
   }
   .user-top > p {
        color: white;
        font-size: 0.9rem;
        text-align: center;
        height: 2.2rem;
        line-height: 2.2rem;
   }
   .user-top ul {
        display: flex;
        justify-content: center;
   }
   .user-top ul li {
        width: 6.8rem;
        height: 5.0rem;
        text-align: center;
        line-height: 5.0rem;
   }
   .user-top ul li a {
        color: white;
   }
   .user-top ul li:nth-child(2) {
        margin-top: 82px;
        width: 2px;
        height: 40px;
        background: white;
   }

   /* 中间部分 */
   .user-box {
       width: 100%;
       max-width: 1080px;
       margin: 0 auto;
   }
   /* 订单 */
   .user-box-order {
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 0 0.75rem;
       margin: 0 0.5rem;
       height: 2.4rem;
       border-bottom: 1px solid #f7f0f0;
   }
   /* 我的订单 */
   .user-box-order .my-order {
       color: #333;
       font-size: 0.75rem;     
   }
   /* 全部订单 */
   .user-box-order .all-order {
       color: #999;
       font-size: 0.7rem;
   }
</style>
