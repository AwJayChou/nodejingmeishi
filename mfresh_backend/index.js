/**
 * 项目入口文件*/
const http = require('http');
const express = require('express');

//服务器
let port = 1997;
let app = express();
http.createServer(app).listen(port,()=>{
    console.log('server listening port')
});
/*****中间件******/
const cors = require('cors');
 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({extended:true}));
 const cookieParser = require('cookie-parser');
 app.use(cookieParser());
 app.use(cors({
     origin:'*',
     credentials:true
 }));
/*****路由、路由器*****/
app.use('/news',require('./routes/news'));
app.use('/product',require('./routes/product'));
app.use('/cart',require('./routes/cart'));
app.use('/user',require('./routes/user'));