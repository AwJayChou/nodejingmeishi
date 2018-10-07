const express = require('express');
const pool=require('../pool');
const router=express.Router();
module.exports = router;
/**
 *根据产品ID返回产品详情
 *请求参数：
 pid-产品ID，必需
 *输出结果：
 {
    "pid": 1,
    "title1":"xxx",
    ...
  }
 */
router.get('/detail',(req,res)=>{
    //res.send('product/detail')
    let pid=req.query.pid;
    if(pid){
        let sql='select * from mf_product where pid=?';
        pool.query(sql,[pid],(err,results)=>{
            if(err) throw err;
            //console.log(results)
            if(results.length>0){
              //res.end('chengong')

                res.json(results[0])
            }
        })
    }

});
/**
 *按发布时间逆序返回新闻列表
 *请求参数：
 pageNum-需显示的页号；默认为1
 *输出结果：
 {
    totalRecord: 58,
    pageSize: 10,
    pageCount: 6,
    pageNum: 1,
    data: [{},{} ... {}]
  }
 */
router.get('/select',(req,res)=>{
   // res.send('product/select')
    let pageNum = req.query.pageNum;
    if(!pageNum){
        pageNum = 1;
    }else{
        pageNum = parseInt(pageNum)
    }
    //声明返回内容
    let prodsel={
        totalRecord: 0,
        pageSize: 3,
        pageCount: 0,
        pageNum,
        data: []
    };
    //判断两个sql语句是否都完成 再发送res.json(prodsel)
    let sqlLoad = false;
    let sql1Load = false;
    //查询总记录条数
    let sql = 'select count(*) as c from mf_product';
    pool.query(sql,(err,results) => {
        if(err) throw err;
        //[{c:总记录条数}]
        prodsel.totalRecord = results[0].c;
        prodsel.pageCount = Math.ceil(prodsel.totalRecord/prodsel.pageSize)
        sqlLoad = true;
        if(sql1Load){
            res.send(prodsel)
        }
    });
    //查询数据内容
    let sql1='select pid,title1,title2,pic from mf_product ' +
        ' order by pid desc limit ?,?';
    let start = (prodsel.pageNum-1)*prodsel.pageSize;
    let p=prodsel.pageSize;
    pool.query(sql1,[start,p],(err,results)=>{
        if(err) throw err;
        prodsel.data = results;
        //console.log(results)
        sql1Load=true;
        if(sqlLoad){
            res.json(prodsel)
        }

    })
});