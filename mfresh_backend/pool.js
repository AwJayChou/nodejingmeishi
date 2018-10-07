/*整个项目中唯一的一个数据可连接词模块*/
const mysql=require('mysql');
let pool=mysql.createPool({
   host:'127.0.0.1',
   user:'root',
   password:'',
   port:3306,
   database:'mfresh',
    connectionLimit:15
});
module.exports=pool;