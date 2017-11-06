<template>
    <div id="mine_router">
        <div class="header-button">
        <div class="shop-city" ><router-link to="/you/good"><span>商城</span></router-link></div>
        <div class="lift-status shop-city"><router-link to="/you/life"><span>生活志</span></router-link></div>
     </div>
     <router-view></router-view>
   </div>
</template>
    
<script>
export default {
  name: "component_name",
  data () {
    return {
     
    };
  }
  
}
</script>
    
<style lang="css" scoped>
    html,body {
        margin: 0;
        padding:0;
    }
  *{
    box-sizing: border-box;
    margin: 0;
    padding:0;
    
  }
  a {
      text-decoration: none;
      color: #333;
  }
  #mine_router {
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
  #mine_router .header-button {
    width: 100%;
    height: 1.70067rem;
    line-height: 1.70067rem;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index:999;
    background-color: #fff;
    border-bottom: .04267rem solid #ebebeb;
    font-size: .68267rem;
  }
 .header-button .shop-city {
   width: 50%;
   height: 1.70067rem;
   text-align: center;
   float: left;
 }
.shop-city span {
  height: 1.71177rem;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  padding: 0 0.21333rem;

}
.router-link-active span {
  color: #e66b00;
  border-bottom: .08533rem solid #e66b00;
  border-bottom-width:4px;  
}

</style>