//与新闻相关的所有api
const express = require('express');
const pool = require('../pool');
let router = express.Router();
module.exports=router;
/**
 *按发布时间逆序返回新闻列表
 *请求参数：
 pageNum-需显示的页号；默认为1
 *输出结果：
 {
    totalRecord: 58,  //总条数
    pageSize: 10,     //每页显示的条数
    pageCount: 6,     //总页数
    pageNum: 1,       //请求的页码
    data: [{},{} ... {}]  //数据
  }
 */
router.get('/select',(req,res)=>{
     //  res.send('get/news/select')
     let pageNum=req.query.pageNum;
     if(!pageNum){
         pageNum=1;
     }else{
         pageNum=parseInt(pageNum)
     }
     //要输出给客户端分液器对象
     let pager={
         totalRecord:0,
         pageSize:5,
         pageCount:0,
         pageNum,
         data:[]
     };
     let statLoaded = false;//统计信息是否加载完成
     let dataLoaded = false;//页面输几局是否加载完成
     //总页数
     let sql="select count(*) as c from mf_news";
     pool.query(sql,(err,result)=>{
         if(err) throw err;
         //console.log(result)
         pager.totalRecord = result[0].c;
         pager.pageCount =
             Math.ceil(pager.totalRecord/pager.pageSize);
         statLoaded=true;//判断连个链接是否都完成
         if(dataLoaded){//声明两个变量来判断
               res.send(pager)
           }
     })
     //获取指定页中的数据
    let sql2="select nid,title,pubTime from mf_news order by" +
        " pubTime desc limit ?,?";
     let start = (pager.pageNum-1)*pager.pageSize;
     let count=pager.pageSize;
    pool.query(sql2,[start,count],(err,result)=>{
        if(err) throw err;
        console.log(result)
        pager.data = result;
        dataLoaded=true;
        if(statLoaded){
            res.json(pager)
        }
    })
}
);
/**
 *根据新闻ID返回新闻详情
 *请求参数：
 newsId-新闻ID，必需
 *输出结果：
 {
    "newsId": 1,
    ...
  }
 */
router.get('/detail',(req,res)=>{
    //res.send('get/news/detail')
  // news/detail?nid=5  req.query.nid
    // new/detail/5  req.params.uid
    //console.log(req.params.nid);
    let nid = req.query.nid;//读取路由参数
    let sql="select * from mf_news where nid=?";
    pool.query(sql,[nid],(err,result)=>{
        if(err) throw err;
       // console.log(result);
        if(result.length>0){
            res.json(result[0])
        }
    })
 });