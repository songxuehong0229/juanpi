<template>
  <div id="app">
    <router-view></router-view>
    <bottom v-show="Bshow()"></bottom>
  </div>
</template>

<script>
import Bottom from "./components/Bottom"

export default {
  name: 'app',
  components : {
    Bottom
  },
  methods : {
    // 对路由进行正则过滤,以判断是否显示
    Bshow(){
      return this.$route.path.search(/^(\/world|\/shouye|\/you|\/cart|\/mine)|\/$/) == -1?  false : true;
    }
  }
}
</script>
 
<style>
*{
  margin:0;
  padding:0;
}
#app {
  width: 100%;
}
ul,ol{
  list-style: none;
}
a{
  text-decoration: none;
}
html{
  font-family: PingFang-SC-Regular,Helvetica Neue,Helvetica,Droid Sans Fallback,microsoft yahei,sans-serif;
  color:#666;
}
</style>
