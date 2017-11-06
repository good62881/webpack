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
		path: path.resolve(__dirname, 'out/public'),
		
	},
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(png|jpg|gif)$/,
			loader: "file-loader?name=images/[name].[ext]&publicPath=../"   //这里决定了css中图片的路径，下同
		}, {
			test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
			loader: "file-loader?name=font/[name].[ext]&publicPath=../"
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
				},
				transformToRequire: {  //组件中的img不进行地址替换，直接使用相对于页面的地址。注意，可能有其他资源，例如视频。
					img: ''
				}
			}
		}]
	},
	resolve: {
		alias: {      
			'vue$': 'vue/dist/vue.esm.js'   
		}
	},
	plugins:pluginsConfig,
};




//静态文件的输出
//1.由于有用到css提取功能，造成静态文件资源引用的路径问题。原因如下：
//	loader中提取图片后，地址不会因引用的文件位置不同而改变。由于HTML和CSS的文件位置不同，都用同一图片地址一定会出错。
//2.为避免问题一，没有使用html-loader，禁止替换img的地址，手动修正图片地址。其他资源（如字体文件、视频）类似。如有vue组件，也需在组件中关闭img地址替换。
//	然后在有img的页面，在入口文件中手动import引入img。
//3.这里默认引用了jquery，修正了vue的地址（需在手动在入口文件中引用，原因见下）。
//4.如引用了element,vue和element需在入口文件中引用。vue的地址需重定向到完整地址。如果没有element，则vue在ProvidePlugin中声明即可。
//5.虽然输出配置中加入了es6的转换，js还是尽量使用es5编写。