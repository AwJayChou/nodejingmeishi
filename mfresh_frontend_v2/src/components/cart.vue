<template>
   <div>
     <!--面包屑导航-->
     <div class="breadcrumb">
       <div class="container">
         <h2>
           <a href="">首页</a>&gt;<a href="">产品中心</a>
         </h2>
       </div>
     </div>
     <!--页面主体-->
     <div class="main container">
       <div class="cart">
         <div class="cart_header">
           <span>已选商品<em>1</em>件</span>
           <span>总金额：<strong>{{1599*value}}</strong></span>
           <button type="button">结算</button>
         </div>
         <div class="cart_con">
           <div class="cartcon_title">
             <span><input type="checkbox"/> 全选</span>
             <span>商品信息</span>
             <span>单价</span>
             <span>数量</span>
             <span>金额</span>
             <span>操作</span>
           </div>
           <ul>
             <h2 v-if="!uid">购物车中没有任何商品！</h2>
             <li v-if="uid">
             <input type="checkbox" class="cart_checkbox"/>
             <a href="" class="cart_img"><img src="../assets/product-imgs/jhq-m8088a.jpg" alt=""/></a>
             <a href="" class="cart_title">家用除甲醛静音M-8088A</a>
             <i>¥1599</i>
             <div>
             <span @click="jianshao">-</span><input type="text" value="1" v-model="value"/><span @click="tianjia">+</span>
             </div>
             <strong>¥{{1599*value}}</strong>
             <!--删除当前记录 不完整-->
               <em></em>
             </li>

           </ul>
         </div>
         <div class="cart_header">
           <span>已选商品<em>1</em>件</span>
           <span>总金额：<strong>{{1599*value}}</strong></span>
           <button type="button">结算</button>
         </div>
       </div>
     </div>

   </div>
</template>

<script>
export default {
   data(){
     return {
       value:0,
       uid:''
     }
   },
  methods:{
    jianshao(){
      if(this.value>1){
        this.value-=1;
      }

      this.uid=sessionStorage.getItem('uid')
      //console.log(uid)
      let url = 'http://127.0.0.1:1997/cart/update?count='+this.value+'&uid='+this.uid
       this.$http.get(url)
         .then(res=>{

         })
    },
     tianjia(){
       this.value+=1;
       this.uid=sessionStorage.getItem('uid')
       //console.log(uid)
       let url = 'http://127.0.0.1:1997/cart/update?count='+this.value+'&uid='+this.uid;
       this.$http.get(url)
         .then(res=>{

         })
     }
  },
  mounted(){
     //let url='http://127.0.0.1:1997/cart/add?pid=1'

    this.uid=sessionStorage.getItem('uid')
    console.log(uid)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
