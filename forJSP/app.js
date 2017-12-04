var express=require('express');
var app=express();
var http = require('http').Server(app);
var proxy = require('http-proxy-middleware');

//配置静态文件
app.use(express.static('./out/public'));


//配置html后缀以及路径
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.set('views','./out/views');

app.get('/',function(req,res){   
	res.render('index/login');
});

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));

http.listen(3000,function() {
	console.log('服务器正常启动于3000端口！')
});



//1.由于没有使用webpack的中间件webpack-dev-middleware，node服务和webpack没有相互关联。node提供服务器，webpack实现打包和压缩。
//2.注意静态资源的地址和webpack相对应，路由和静态资源与后端保持一致，能在输出页面时直接移交后端。
//3.node按正常情况设置静态资源和页面路由，能正常使用代理和各种中间件。有必要时还可以模拟session操作。
//4.通常情况下，前后端分离。访问后端服务器上的api接口时，需要使用代理。同时接口的地址最后做出约定，以/api开头，方便过滤。