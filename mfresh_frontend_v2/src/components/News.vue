<template>
   <div>
     <!--面包屑导航-->
     <div class="breadcrumb">
       <div class="container">
         <h2>
           <a href="">首页</a>&gt;<a href="">公司动态</a>
         </h2>
       </div>
     </div>
     <!--页面主体-->
     <div class="main container">
       <div class="news">
         <ul>
           <!--<li><span>2016-02-21</span><a href="">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a></li>-->
           <!--<li><span>2016-02-21</span><a href="">净美仕新风净化系统　助力校园新风行动</a></li>-->
           <!--<li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>-->
           <!--<li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>-->
           <li v-for="n in pager.data">
              <span>{{ new Date('2018-10-1 15:31:09').getTime()|date}}</span>
             <router-link :to="{path:'/newsDetail',query:{nid:n.nid}}">{{n.title}}</router-link></li>
         </ul>
       </div>
       <!-- 分页导航-->
       <div class="pages">
         <!--<a href="" class="">上一页</a>-->
         <!--<a href="" class="cur">1</a>-->
         <!--<a href="">2</a>-->
         <!--<a href="">3</a>-->
         <!--<a href="">4</a>-->
         <!--<a href="">5</a>-->
         <!--<a href="">下一页</a>-->
         <a href="#" class="" @click.prevent="move(pager.pageNum-1)">上一页</a>
         <a href="#" @click.prevent="pno(pager.pageNum-2)" v-if="pager.pageNum-2>0">{{pager.pageNum-2}}</a>
         <a href="#" @click.prevent="pno(pager.pageNum-1)" v-if="pager.pageNum-1>0">{{pager.pageNum-1}}</a>
         <a href="#" @click.prevent="pno(pager.pageNum)" v-if="pager.pageNum" class="cur">{{pager.pageNum}}</a>
         <a href="#" @click.prevent="pno(pager.pageNum+1)" v-if="pager.pageNum+1<pager.pageCount">{{pager.pageNum+1}}</a>
         <a href="#" @click.prevent="pno(pager.pageNum+2)" v-if="pager.pageNum+2<pager.pageCount">{{pager.pageNum+2}}</a>

         <a href="#" @click.prevent="move(pager.pageNum+1)">下一页</a>
       </div>
     </div>
   </div>
</template>

<script>

export default {
     data(){
       return {
         pager:{},
         id:''
       }
     },
     methods:{
       move(dir){
         if(dir>0 && dir<this.pager.pageCount)
         this.pno(dir)
       },
       pno(val){

         let url='http://127.0.0.1:1997/news/select?pageNum='+val;
         this.$http.get(url)
           .then((res)=>{
             // _this.data().pager=res.body;
             this.pager=res.body;
             //console.log(this.pager)
             this.id=res.body.data.nid
           })
       }
     },

    mounted(){
        this.pno(1);
    }
     // filters:{
     //   date(input){
     //     let d=new Date(input);
     //     let year=d.getFullYear();
     //     let month=d.getMonth()+1;
     //       month=month<10?'0'+month:month;
     //       let date=d.getDate();
     //         date=date<10?'0'+date:date;
     //         return year+'-'+month+'-'+date
     //   }
     // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
