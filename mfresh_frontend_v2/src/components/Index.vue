<template>
  <div>
    <!--banner-->
    <div class="banner">
      <!-- 练习：编写banner的html和css-->
      <!-- 图片列表-->
      <ul>
        <li :style="note1"><a href="#" class="link"></a></li>
        <li :style="note2"><a href="#" class="link"></a></li>
        <li :style="note3"><a href="#" class="link"></a></li>
        <li :style="note4"><a href="#" class="link"></a></li>
      </ul>
      <!-- 左右箭头-->
      <span class="cut prev"></span>
      <span class="cut next"></span>
      <!-- 小圆点指示器-->
      <div class="indicator">
        <a href="" class="cur"></a><a href=""></a><a href=""></a><a href=""></a>
      </div>
    </div>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title"><a href="#" class="more">more</a>净美仕产品</h2>
        <ul class="clearfloat">
          <li><router-link to="/product" class="link"><img src="../assets/images/01.jpg" alt=""/></router-link></li>
          <li><router-link to="/product" class="link"><img src="../assets/images/02.jpg" alt=""/></router-link></li>
          <li><router-link to="/product" class="link"><img src="../assets/images/03.jpg" alt=""/></router-link></li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title"><a href="#" class="more">more</a>关于净美仕</h2>
          <p>上海净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，
            并专注于室内空气质量的研究与改善。
            2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。
            净美仕肩负着为人类创造健康安全生活环境的使命应运而生。
            2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。
            <router-link to="/about">查看更多</router-link></p>
        </div>
        <div class="ind_news">
          <h2 class="title"><a href="#" class="more">more</a>公司动态</h2>
          <ul>
            <li><span>2018-10-1</span><router-link to="/news">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</router-link></li>
            <li><span>2018-10-1</span><router-link to="/news">净美仕新风净化系统　助力校园新风行动</router-link></li>
            <li><span>2018-10-1</span><router-link to="/news">全国新风行动全面启动 助推净美仕战略升级</router-link></li>
            <li><span>2018-10-1</span><router-link to="/news">智能空气净化器翻盘：净美仕能否领衔?</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
export default {
   data(){
     return {
       note2:{
         // background: url(../assets/images/banner_04.jpg) center 0 no-repeat;
         backgroundImage:"url("+require("../assets/images/banner_02.jpg")+")",
         backgroundPosition:'center 0',
         backgroundRepeat:'no-repeat'
       },
       note3:{
         // background: url(../assets/images/banner_04.jpg) center 0 no-repeat;
         backgroundImage:"url("+require("../assets/images/banner_03.jpg")+")",
         backgroundPosition:'center 0',
         backgroundRepeat:'no-repeat'
       },
       note4:{
         // background: url(../assets/images/banner_04.jpg) center 0 no-repeat;
         backgroundImage:"url("+require("../assets/images/banner_04.jpg")+")",
         backgroundPosition:'center 0',
         backgroundRepeat:'no-repeat'
       },
       note1:{
         // background: url(../assets/images/banner_04.jpg) center 0 no-repeat;
         backgroundImage:"url("+require("../assets/images/banner_01.jpg")+")",
         backgroundPosition:'center 0',
         backgroundRepeat:'no-repeat',
         display:'block',
         zIndex:'20'
       }
     }
   }
}

  function carousel(){
    // var number=$(".banner ul li").size()-1;//图片的数量
    var number = 3;
    var cur=0;//当前显示的图片
    var timer=0;//定时器

    //下一个
    function slideNext(){
      if(cur<number){
        $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
        $(".banner ul li").eq(cur+1).css({'z-index':20}).stop().fadeIn();
        $(".indicator a").removeClass().eq(cur+1).addClass("cur");
        cur+=1;
      }else{
        $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
        $(".banner ul li").eq(0).css({'z-index':20}).stop().fadeIn();
        $(".indicator a").removeClass().eq(0).addClass("cur");
        cur=0;
      }
    }
    //上一个
    function slidePrev(){
      if(cur>0){
        $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
        $(".banner ul li").eq(cur-1).css({'z-index':20}).stop().fadeIn();
        $(".indicator a").removeClass().eq(cur-1).addClass("cur");
        cur-=1;
      }else{
        $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
        $(".banner ul li").eq(number).css({'z-index':20}).stop().fadeIn();
        $(".indicator a").removeClass().eq(number).addClass("cur");
        cur=number;
      }
    }

    timer=setInterval(slideNext,3000);

    //当鼠标移入banner时，清除定时器
    $(".banner").mouseover(function(){
      clearInterval(timer);
    });
    $(".banner").mouseout(function(){
      timer=setInterval(slideNext,3000)
    });

    //上一个、下一个
    $(".banner .prev").click(function(){
      slidePrev();
    });
    $(".banner .next").click(function(){
      slideNext();
    });

    //小圆点指示器
    $(".indicator>a").mouseover(function(){
      var now=$(this).index();//获取鼠标移入的是第几个a标记
      $(".indicator>a").removeClass();//删除a标记中的class=cur
      $(this).addClass("cur");//为此a标记添加cur样式
      $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();//隐藏当前的图片
      $(".banner ul li").eq(now).css({'z-index':20}).stop().fadeIn();//显示和a序列号一样的图片
      cur=now;//为变量cur重新赋值，以便于再次启用定时器的时候，从当前显示的图片开始播放
    });
  }
  // window.onload = carousel;
  window.onload = function(){
    carousel()
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
