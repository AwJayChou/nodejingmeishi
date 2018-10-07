const express = require('express');
const pool = require('../pool');
const router = express.Router();
module.exports = router;
/**
 *验证电话号码是否已经存在
 *请求参数：
 phone-用户名
 *输出结果：
 * {"code":1,"msg":"exist"}
 * 或
 * {"code":2,"msg":"non-exist"}
 */
router.get('/checkphone',(req,res)=>{
    //res.send('user/checkphone')
   let phone = req.query.phone;
   if(phone){
       let sql='select * from mf_user where phone=?';
       pool.query(sql,[phone],(err,results)=>{
           if(err) throw err;
           if(results.length!==0){
               res.json({"code":1,"msg":"exist"})
           }else{
               res.json({"code":2,"msg":"non-exist"})
           }
       })
   }
});
/**
 *验证用户名是否已经存在
 *请求参数：
 uname-用户名
 *输出结果：
 * {"code":1,"msg":"exist"}  存在
 * 或
 * {"code":2,"msg":"non-exist"}  不存在
 */
router.get('/checkuname',(req,res)=>{
   // res.send('user/checkuname')
    let uname=req.query.uname;
    if(uname){
        let sql = 'select * from mf_user where uname=?';
        pool.query(sql,[uname],(err,results)=>{
            if(err) throw err;
            if(results.length>0){
                res.json({"code":1,"msg":"exist"})
            }else{
                res.json({"code":2,"msg":"non-exist"})
            }
        })
    }
})
/**
 *用户登录验证
 *请求参数：
 unameOrPhone-用户名或手机
 upwd-密码
 *输出结果：
 * {"code":1,"uid":1,"uname":"test","phone":"13012345678"}
 * 或
 * {"code":400}
 */
router.get('/login',(req,res)=>{
    //res.send('user/login')

    let unameOrPhone = req.query.unameOrPhone;
    let upwd = req.query.upwd;
    let sql= "SELECT uid,uname,phone FROM mf_user WHERE " +
        " (uname=? AND upwd=?) OR " +
        " (phone=? AND upwd=?)";
    pool.query(sql,[unameOrPhone,upwd,unameOrPhone,upwd],(err,results)=>{
        if(err) throw err;
        //console.log(results)
        if(results.length>0){
        let code1 = {
            "code":1,"uid":results[0].uid,"uname":results[0].uname,"phone":results[0].phone
        };

            res.send(code1)
        }else{
            res.send({"code":400})
        }

    })
});
/**
 *注册新用户
 *请求参数：
 uname-用户名
 upwd-密码
 phone-电话号码
 *输出结果：
 * {"code":1,"uid":3,"uname":"test"}
 * 或
 * {"code":500}
 */
router.get('/register',(req,res)=>{
    //res.send('user/register')
   // console.log(req)
    let uname = req.query.uname;
    let upwd = req.query.upwd;
    let phone = req.query.phone;
    console.log(uname,upwd,phone)
    let sql = 'insert into mf_user(uname,upwd,phone) values(?,?,?)';
    pool.query(sql,[uname,upwd,phone],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows>0){
            res.json({"code":1,"uid":1,"uname":uname})
        }else{
            res.json({"code":400})
        }
    })
})