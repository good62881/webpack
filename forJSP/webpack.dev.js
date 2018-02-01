const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");



var pageArr = ['index/login','index/fPass','news/list'];   //每个页面的入口文件
var configEntry = {};
pageArr.forEach((page) => {
	configEntry[page] = path.resolve(__dirname,'src/public/bundle/'+page);
});


//插件列表
var pluginsConfig=[
	new ExtractTextPlugin({  //这里以页面的上一级目录命名样式表，也就注定了页面的目录关系为   栏目名/页面名
		filename: (getPath) => {
			return "css/" + getPath('[name]').replace(/\/(.*)/, '') + ".css";
		},
		allChunks: true
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		filename: 'bundle/[name].js',
		minChunks:3   //这里注意根据项目中的页面，判断有多少的页面引用才算公共文件
	}),
	new HtmlWebpackHarddiskPlugin(),
	new webpack.ProvidePlugin({  
		$: 'jquery',
		jQuery: 'jquery'
	})
];
pageArr.forEach((page) => {  
	const htmlPlugin = new HtmlWebpackPlugin({
		filename: '../views/'+page+'.html',   
		template: 'src/views/'+page+'.html',   
		chunks: ['common',page],    
		alwaysWriteToDisk: true   
	});
	pluginsConfig.push(htmlPlugin);
});

module.exports = {
	entry:configEntry,
	output: {
		filename: 'bundle/[name].js',  
		path: path.resolve(__dirname, 'out/public'),    //注意和node入口文件中的app.use(express.static('./out/public'))保持一致
		publicPath: '/'   //如果需要虚拟路径，publicPath: '/aaa/'，同时修改node入口文件中app.use('/aaa',express.static('./out/public'))
	},
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(png|jpg|gif)$/,
			loader: "file-loader?name=images/[name].[ext]" 
		}, {
			test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
			loader: "file-loader?name=font/[name].[ext]"
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			}),
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'less-loader'],
			})
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					less: ExtractTextPlugin.extract({        //这里可以不写，组件中的less会被编译到每个页面里当做内联样式，
						use: ['css-loader', 'less-loader'],  //如果写，则注意引用的次数是否达到CommonsChunkPlugin中公共资源的次数，否则无法导出到common。
						fallback: 'vue-style-loader'
					})
				}
			}
		}, {
			test: /\.html$/,   //这里有使用html-loader，所以无需每次都在入口文件中import引入img，组件中同理。
        	loader: 'html-loader'
		}]
	},
	resolve: {
		alias: {      
			'vue$': 'vue/dist/vue.esm.js'   
		}
	},
	plugins:pluginsConfig,
};


//动态页面输出
//1.相对于静态页面输出有如下优缺点：
//	优点：
//	由于不用考虑静态资源的路径问题，所以不需要配置img和其他资源的publicPath。也可以正常的使用html-loader和vue-loader，无需单独import引入img。
//	只要和后端保持一样文件路径和路由配置，就可以很好的模拟出页面在后端服务器上的展示情况。
//	缺点：
//	必须用到node服务器，不能直接打开浏览页面！
//2.静态资源的路径，注意output中的publicPath、path与node入口文件中的app.use(express.static('./out/public'))的关系，和后端保持一致。
//3.页面地址由node中app.set('views','./out/views')决定，在node路由中app.get('/aaa',function(req,res){ res.render('index/login');})模拟后端路由配置