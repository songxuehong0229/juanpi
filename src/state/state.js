import Vue from "vue"
import Vuex from "vuex"
import VueResource from 'vue-resource'

Vue.use(Vuex)


let state = {
    shopList : [],
    shop : {},
    classList : [],
    cart : []
}

let actions = {
    shopList(context){
        Vue.http.jsonp("https://shop.juanpi.com/gsort?key=310&type=6&zhouyi_ids=p8_c4_l1_51_1064_18_5_128&machining=showshopgoods&page=1&rows=10&callback=gsort_callback").then(res => {
            res.data.list.forEach(function(value , index){
                if(value.shop_goods.length < 7 || !value.shop_cover) res.data.list.splice(index , 1);
            })
            context.commit("SHOPLIST" , res.data.list);
        } , err => {
            console.log(err);
        })
    },
    class(context){
        Vue.http.jsonp("https://m.juanpi.com/cate/catelist?pf=8&area=4&bi=222&dtype=jsonp&_=1506684464920&callback=jsonp2").then(res => {
            context.commit("CLASSLIST" , res.data);
        } , err => {
            console.log(err);
        })
    },
    jia(context, id){
        context.commit("JIA", id)
    },
    jian(context, id){
        context.commit("JIAN", id)
    },
    dels(context, index){
        context.commit("DEL", index)
    }
}

let mutations = {
    SHOPLIST(state , list){
        state.shopList = list;
    },
    SHOP(state , item){
        state.shop = item;
    },
    CLASSLIST(state , list){
        state.classList = list;
    },
    CART(state){
        // 这里存在浅拷贝的问题,要用一个新的对象来创建购物车数据,不然会改变原始数据
        let flag = false;
        state.cart.forEach(function(value, index){
            if(value.goods_id == state.shop.goods_id) flag = true;
        })
        if (!flag) state.cart.push({
            title : state.shop.title,
            oprice : state.shop.oprice,
            cprice : state.shop.cprice,
            num : 1,
            pic_url : state.shop.pic_url,
            goods_id : state.shop.goods_id,
            flag : true
        });   
    },
    JIA(state, id){
        for(let item of state.cart){
            if(item.goods_id == id){
                item.num++;
                break;
            }
        }
    },
    JIAN(state, id){
        for(let item of state.cart){
            if(item.goods_id == id){
                item.num == 1 ? "" : item.num--;
                break;
            }
        }
    },
    DEL(state, item){
        for(let index in state.cart){
            if(state.cart[index].title == item.title) state.cart.splice(index, 1)
        }
    }
}

const store = new Vuex.Store({
    state,
    actions,
    mutations
}) 

export default store