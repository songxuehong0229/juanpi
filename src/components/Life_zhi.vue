<template>
    <div id="life_zhi">
        <div class="life_box">
            <div class="all_click">全部</div>
            <div>优化life</div>
            <div>有妙招</div>
        </div>
        <!-- 懒加载组件 -->
        <ul id="container">
            <life-loazyimg v-for="item in list" :key = 'item.id' :my_img = 'item'></life-loazyimg>
        </ul>
    </div>
</template>
    
<script>

export default {
  name: "component_name",
  data () {
    return {
       list : [
        'https://goods7.juancdn.com/jas/170925/c/8/59c867d9a9fcf872ef78d37f_1080x804.png',
        'https://goods7.juancdn.com/jas/170918/c/9/59bf8543a9fcf899eb7f57ad_1080x804.png'
       ]
    }
  },
  components : {
      'lifeLoazyimg' : {
          template : 
            `
            <li>
                <img v-lazy="my_img" class = 'loading_img' style = 'width:100%;height:11.904rem;'>
            </li>
            `,
        props : ['my_img']
      }
      
  }
}

</script>
    
<style lang="css" scoped>
     .all_click {
        border:1px solid #e66b00;
        color: #e66b00;
        background-color: #fff2e7 !important;
    }
    .life_box {
        position: fixed;
        top: 1.7333rem; 
        left: 0;
        width: 100%;
        height: 1.536rem;
        background-color: #f4f4f8;
        box-shadow: 0 0.128rem 0.128rem rgba(51,51,51, 0.1);
        text-align: center;
    }
   
    .life_box div {
        display: inline-block;
        float: left;
        margin-top: 0.34133rem;
        width: auto;
        line-height: 0.85333rem;
        height: 0.85333rem;
        text-align: center;
        background-color: #fff;
        border-radius: 1.36533rem;
        font-size: 0.512rem;
        padding: 0 0.34133rem;
        margin-left: 0.85333rem;
        font-family: PingFangSC-Regular;
    }
    #container {
        margin-top: 3.15733rem;
        overflow: hidden;
        width: 100%;
    }
    #container li {
        display: block;
        width: 100%;
        height: 11.904rem;
        box-sizing: border-box;
        margin-bottom: 0.42667rem;
        background-color: #fff;
    }
    .loading_img[lazy=loaded]{
        display: inline-block;
        width: 100%;
        height: 11.904rem !important;
     }
    
</style>