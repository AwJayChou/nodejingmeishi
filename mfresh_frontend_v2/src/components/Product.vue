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
      <div class="pl_header">
        <a class="cur">净美仕净化器</a>
        <router-link to="/product/product1">净美仕滤网</router-link>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="p in productSelect.data">
        <a href=""><img src="../assets/product-imgs/jhq-m8088a.jpg" alt=""/></a>
        <div class="pdlist_text clearfloat">
        <h3>
        <p>M-8088A</p>
        <span>{{p.title2}}</span>
        </h3>
        <router-link
          :to="{path:'/productDetail',query:{id:p.pid}}">查看详情</router-link>
        </div>
        </li>

      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <!--<a href="">上一页</a>-->
        <!--<a href="">1</a>-->
        <!--<a href="" class="cur">2</a>-->
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
        <!--<a href="">下一页</a>-->
        <a href="#" @click.prevent="move(productSelect.pageNum-1)">上一页</a>
        <a href="#" @click.prevent="pn(productSelect.pageNum-2)" v-if="productSelect.pageNum-2>0">{{productSelect.pageNum-2}}</a>
        <a href="#" @click.prevent="pn(productSelect.pageNum-1)" v-if="productSelect.pageNum-1>0">{{productSelect.pageNum-1}}</a>
        <a href="#" @click.prevent="pn(productSelect.pageNum)" class="cur">{{productSelect.pageNum}}</a>
        <a href="#" @click.prevent="pn(productSelect.pageNum+1)" v-if="productSelect.pageNum+1<productSelect.pageCount">{{productSelect.pageNum+1}}</a>
        <a href="#" @click.prevent="pn(productSelect.pageNum+2)" v-if="productSelect.pageNum+2<productSelect.pageCount">{{productSelect.pageNum+2}}</a>

        <a href="" @click.prevent="move(productSelect.pageNum+1)">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   data(){
     return {
         productSelect:{},
       id:''
     }
   },
  methods:{

     move(dir){
       if(dir>0 && dir<this.productSelect.pageCount){
         this.pn(dir)
       }
     },
     pn(pno){
       let url = 'http://127.0.0.1:1997/product/select?pageNum='+pno;
       this.$http.get(url)
         .then(res=>{
           //console.log(res)
           this.productSelect = res.body;
          // res.body.data

         })
     }
  },
  created(){
     this.pn(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
