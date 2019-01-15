const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

const config = {
	entry: [path.join(srcPath, "index.tsx")],
	output: {
		filename: "bundle.js",
		path: distPath
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'index.html' }),
		new ExtractTextPlugin({ filename: 'bundle.css' })
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(s*)css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {},
				  },
				],
			}
		]
	},
	devServer: {
		contentBase: distPath,
		compress: true,
		port: 9000
	}
};

module.exports = config;