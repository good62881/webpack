const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



var pageArr = ['index/login','index/fPass','news/list'];
var configEntry = {};
pageArr.forEach((page) => {
	configEntry[page] = path.resolve(__dirname,'src/public/bundle/'+page);
});


//插件列表
var pluginsConfig=[
	new UglifyJSPlugin({
		sourceMap: true
	}),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	}),
	new ExtractTextPlugin({
		filename: (getPath) => {
			return "css/" + getPath('[name]').replace(/\/(.*)/, '') + ".css";
		},
		allChunks: true
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		filename: 'bundle/[name].js',
		minChunks:3
	}),
	new webpack.ProvidePlugin({  
		$: 'jquery',
		jQuery: 'jquery'
	})
];
pageArr.forEach((page) => {  
	const htmlPlugin = new HtmlWebpackPlugin({
		filename: '../views/'+page+'.html',   
		template: 'src/views/'+page+'.html',   
		chunks: ['common',page] 
	});
	pluginsConfig.push(htmlPlugin);
});

module.exports = {
	entry:configEntry,
	output: {
		filename: 'bundle/[name].js',  
		path: path.resolve(__dirname, 'out/public'),
		publicPath: '/'
	},
	devtool: 'source-map',
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
				use: 'css-loader?minimize=true'
			}),
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?minimize=true', 'less-loader'],
			})
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					less: ExtractTextPlugin.extract({
						use: ['css-loader?minimize=true', 'less-loader'],
						fallback: 'vue-style-loader'
					})
				}
			}
		}, {
			test: /\.html$/,
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

