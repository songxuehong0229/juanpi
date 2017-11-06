<template>
    <div id="Listright">
       <div class="wrap">
           <div class="third-cate">
               <div class="cate-second" v-for="item in product" :key="item.id">
                   <a href="">
                       <img :src="'https://s2.juancdn.com'+item.icon">
                       <span>{{item.name}}</span>
                   </a>
               </div>
           </div>
       </div>
   </div>
</template>
    
<script>
export default {
  name: "component_name",
  data () {
    return {

    };
  },
  computed:{
      product(){
        if(this.$route.params.fen === undefined)  this.$route.params.fen = 243;
          for(var item of this.listInfor){
              if(this.$route.params.fen == item.id){
                  return item.secondCateList;
              }
          }
      },
      listInfor(){
          return this.$store.state.classList;
      }
  }
}
</script>
    
<style lang="css" scoped>

    .cate-second span{
        height: 1rem;
        line-height: 1rem;
        color: #333;
    }
    .cate-second img{
        width: 2.49575rem;
    }
    .cate-second a{
        text-decoration: none;
    }
    .cate-second{
        width: 3.632rem;
        height: 4rem;
        padding: 0 5%;
        box-sizing: border-box;
        float: left;
    }
    .third-cate{
        margin-top: 0.5rem;
    }
    .wrap{
        height: 100%;
    width: 100%;
    text-align: left;
    }
    #Listright{
        width: 71%;
        height: 23.675rem;
        float: left;
        font-size: 0.6rem;
        padding-left: 4%;
        color: #333;
        text-align: center;
    }
</style>