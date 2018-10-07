<template>
    <div>
      <!--面包屑导航-->
      <div class="breadcrumb">
        <div class="container">
          <h2>
            <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href="">净美仕净化器</a>
          </h2>
        </div>
      </div>
      <!--页面主体-->
      <div class="main container">
        <div class="pd_info clearfloat">
          <div class="pdinfo_img">
            <img src="../assets/product-imgs/jhq-m8088a.jpg" alt=""/>
          </div>
          <div class="pdinfo_text">
            <h2>{{pro.title1}}</h2>
            <ul>
              <li>型号：M8088A</li>
              <li>功能：{{pro.func}}</li>
              <li>噪音：{{pro.noise}}</li>
              <li>风量：{{pro.wind}}</li>
              <li>适用对象:{{pro.applyTo}}</li>
              <li>适用面积：{{pro.size}}</li>
              <li>空气净化能效等级：{{pro.level}}</li>
            </ul>
            <p>价格：<span>¥</span><strong id="price">1599.00</strong></p>
            <a href="" id="addCart" @click.prevent="jump"><span class="icon_cart"></span>加入购物车</a>
          </div>
        </div>
        <div class="details_box">
          <h2 class="title">产品详情</h2>
          <div class="pd_details">
            <p>家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。</p>
            <img src="../assets/product-imgs/m8088a/01.jpg" alt=""/>
            <img src="../assets/product-imgs/m8088a/02.jpg" alt=""/>
            <img src="../assets/product-imgs/m8088a/03.jpg" alt=""/>
            <img src="../assets/product-imgs/m8088a/04.jpg" alt=""/>
            <img src="../assets/product-imgs/m8088a/05.jpg" alt=""/>
            <img src="../assets/product-imgs/m8088a/06.jpg" alt=""/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
   data(){
     return {
          pro:{},
         pid:''
     }
   },
  methods:{
     jump(){
       //判断是否登录
       if(sessionStorage.getItem('uname')){
         let url='http://127.0.0.1:1997/cart/add?'+'&pid='+this.pid;
         this.$http.get(url).then(res=>{
           console.log(res)
           if(res.body.code==1){
             window.alert('添加成功')
             this.$router.push('/cart')
           }
         });
       }else{
         window.alert('您还未登录，请先登录')
         this.$router.push('/login')
       }


     }
  },
  mounted(){

     let id=this.$route.query.id;
    this.pid=id
     //console.log(id)
    let url = 'http://127.0.0.1:1997/product/detail?pid='+id;
    this.$http.get(url)
      .then(res=>{
        //console.log(res)
         this.pro = res.body
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
