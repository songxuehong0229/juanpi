<template>
    <div class="bottom">
       <div v-for = "(item,index) in list" :key="item.id"><router-link :to="item.href"><img :src="type == item.href ? item.click : item.url">{{ item.name }}</router-link></div>
    </div>
</template>
    
<script>
export default {
    name: "component_name",
    data () {
        return {
            list : [
                {url : "https://goods6.juancdn.com/bao/170411/b/3/58ecae94a43d1f5df95a8904_72x72.png" , click : "https://goods4.juancdn.com/bao/170411/6/8/58ecae97ad0a49a6408b45df_72x72.png" , name : "今日上新"  , flag : true , href : "/shouye"},
                {url : "https://goods3.juancdn.com/bao/170817/4/8/59950b0fa9fcf85453614c7f_72x72.png" , click : "https://goods2.juancdn.com/bao/170816/2/b/599434368150a1125442d562_72x72.png" , name : "卷皮优选"  , flag : false , href : "/you"},
                {url : "https://goods8.juancdn.com/bao/170411/e/0/58ecaeb1a43d1f5e550ebeb4_72x72.png" , click : "https://goods6.juancdn.com/bao/170411/b/5/58ecaeb3a43d1f5caf7c0d16_72x72.png" , name : "全球购" , flag : false , href : "/world"},
                {url : "https://goods2.juancdn.com/bao/170411/3/a/58ecaebaa43d1f6f166e6882_72x72.png" , click : "https://goods4.juancdn.com/bao/170411/7/3/58ecaebba43d1f5e6b2f0d02_72x72.png" , name : "购物车"  , flag : false , href : "/cart"},
                {url : "https://goods5.juancdn.com/bao/170411/9/7/58ecaec4a43d1f5e7c6dc860_72x72.png" , click : "https://goods1.juancdn.com/bao/170411/0/d/58ecaec6a43d1f5e7a188a96_72x72.png" , name : "我的卷皮"  , flag : false , href : "/mine"},                
            ]
        };
    },
    computed : {
        type(){
            if(this.$route.path == "/"){
                return "/shouye"
            }
            return this.$route.path
        }
    }
}
</script>
    
<style lang="css" scoped>
    .bottom{
        position: fixed;
        width: 100%;
        max-width: 16rem;
        min-width: 8rem;
        line-height: 1;
        background-color: #fff;
        bottom: 0;
        z-index: 400;
        background-size: 100% 100%;
        border-top: 1px solid #ebebeb;
    }
    a{
        height: 2.45rem;
        float: left;
        font-size: 0.5rem;
        text-align: center;
        display: block;
        width: 20%;
        color:#333;
    }
    a img{
        width: 1.2rem;
        height: 1.2rem;
        margin: 0.25rem auto;
        display: block;
    }
    .router-link-active{
        color:#FF464E;
    }
</style>