const express=require('express');
const pool=require('../pool');
let router=express.Router();
module.exports = router;
/**
 *向购物车中添加商品
 *请求参数：
 uid-用户ID，必需
 pid-产品ID，必需
 *输出结果：
 * {"code":1,"msg":"succ", "productCount":1}
 * 或
 * {"code":400}
 */
router.get('/add',(req,res)=>{
    //res.send('cart/add')
    let uid = req.query.uid;
    let pid = req.query.pid;
    let sql = 'insert into mf_cart_detail values(?,?,?,?)'
    pool.query(sql,[null,uid,pid,'1'],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows==1){
            res.send({"code":1,"msg":"succ", "productCount":1})
        }else{
            res.send({"code":400})
        }
    })
});
/**
 *根据购物车详情记录编号删除该购买记录
 *请求参数：
 did-详情记录编号
 *输出结果：
 * {"code":1,"msg":"succ"}
 * 或
 * {"code":400}
 */
router.get('/delete',(req,res)=>{
    res.send('cart/delete')
})
/**
 *查询指定用户的购物车内容
 *请求参数：
 uid-用户ID，必需
 *输出结果：
 {
    "uid": 1,
    "products":[
      {"pid":1,"title1":"xxx","pic":"xxx","price":1599.00,"count":3},
      {"pid":3,"title1":"xxx","pic":"xxx","price":1599.00,"count":3},
      ...
      {"pid":5,"title1":"xxx","pic":"xxx","price":1599.00,"count":3}
    ]
  }
 */
router.get('/select',(req,res)=>{
    res.send('cart/select')
})
/**
 *根据购物车详情记录编号修改该商品购买数量
 *请求参数：
 did-详情记录编号
 pid-商品编号
 count-更新后的购买数量
 *输出结果：
 * {"code":1,"msg":"succ"}
 * 或
 * {"code":400}
 */
router.get('/update',(req,res)=>{
   // res.send('cart/update')
    let did=req.query.uid;
    let count=req.query.count;
    //console.log(did,count)
    let sql = 'update mf_cart_detail set count=? where did=?';
    pool.query(sql,[count,did],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows==1){
            res.json({"code":1,"msg":"succ"})
        }else{
            res.json({"code":400})
        }
    })
})