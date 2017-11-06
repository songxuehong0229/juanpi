<template>
    <div id="classify">
       <header id="head">
         <div class="fixtop">
           <span class="tfind"></span>
           <span class="tindex">全部分类</span>
         </div>
       </header>
       <div class="cate-list">
         <div>
           <!-- 搜索栏 -->
           <div class="search-box">
             <a href="">
               <div class="box-search">
                 <input type="search" class="keyword" placeholder="搜索商品">
               </div>
               <button class="search-submit">
                 <img src="//jp.juancdn.com/jpwebapp_v1/images_v1/icon/search.png?ts=390cfa98cd666aa7_1506359253-1&sv=a8351a1e" alt="">
               </button>
             </a>
           </div>
           <!-- 左边栏 -->
           <div class="list-left">
             <ul class="list-title">
              <li :class="{red : type == item.id}" @click="pushFn(item.id)" v-for="item in infor" :key="item.id">{{item.name}}</li>
             </ul>
           </div>
           <!-- 右边栏 -->
           <router-view></router-view>
         </div>
       </div>
   </div>
</template>
    
<script>
import Listright from './Listright'
export default {
  name: "component_name",
   components: { 
      Listright
      },
      data () {
        return {
          type : ""
        };
      },
      methods:{
        pushFn(id){
          this.$router.push('/classify/'+id)

        }
      },
      created(){
        this.$store.dispatch("class");
      },
      computed : {
        infor(){
          for(let item of this.$store.state.classList){
            console.log(this.$route.params.fen)
            if(this.$route.params.fen == item.id){
              this.type = item.id
            }
          }
          return this.$store.state.classList;
        }
      }
    }
</script>
    
<style lang="css">
    
    .list-title li{
      height: 2.25rem;
      line-height: 2.25rem;
      border-bottom: 1px solid #ebebeb;
      border-left: 4px solid #f9f9f9;
      list-style: none;
      color: #333;
      cursor: pointer;
    }
    .list-left{
      width: 25%;
      /* height: 23.675rem; */
      float: left;
      background: #f9f9f9;
      color: #333;
      text-align: center;
      font-size: 0.7rem
    }
    .search-submit{
      position: absolute;
      left: 0.3rem;
      top: 0.125rem;
      border: 0 none;
      background: none;
      width: 1.2rem;
    }
    .search-submit img {
      width: 1.2rem;      
    }
    .keyword{
      font-size: 0.65rem;
      height: 1.2rem;
      line-height: 1.2rem;
      color: #999;
      width: 89%;
      margin-left: 1.5rem;
       border: none;
       vertical-align: top;
    }
    .box-search{
      width: 98%;
      height: 1.2rem;
      line-height: 1.2rem;
      margin-left: 0.3rem;
      vertical-align: middle;
      /* float: left; */
    }
    .search-box{
      width: 15rem;
      border: 1px solid #bbb;
      border-radius: 5px;
      background-color: #fff;
      padding: .125rem 0;
      margin: .5rem;
      position: relative;
    }
    .tindex{
      height: 2.2rem;
      line-height: 2.2rem;
      width: 100%;
      display: inline-block;
      font-size: 0.9rem;
      color: #333;
      text-align : center;
    }
    .tfind{
      left: 0.6rem;
      top: 0.5rem;
      display: inline-block;
      position: absolute;
    }
    .fixtop{
      width: 100%;
      /* height: 2.2rem; */
      position: relative;
    }
    #head{
      width: 100%;
      border-bottom: 1px solid #dedede;
    }
    *{
      padding: 0;
      margin: 0;
    }
    .list-title .red{
      color: #ff464e;
      border-left: 4px solid #ff464e;
      background-color: #fff;
    }
</style>