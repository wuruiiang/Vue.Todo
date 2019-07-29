const path=require('path')

const VueLoaderPlugin=require('vue-loader/lib/plugin')
const webpack=require('webpack')
const HTMLPlugin=require('html-webpack-plugin')
const ExtractPlugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV==='development'

const config={
    target:'web',
    //输入js的绝对路径  __dirname 当前目录  path.join 拼接路径
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {                
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                use:'babel-loader'
            },           
            {
                test:/\.(gif|jpg|jepg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',    //判断图片小于1024时转义为base64
                        options:{
                            limit:1024,
                            name:'[name]-base64.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            //可以在代码中调用到  用来判断当前运行的环境 区别开发环境和生产环境
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]

}

if(isDev){
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push( {
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool='#cheap-module-eval-source-map'      //映射文件
    config.devServer={
        port:'9001',
        host:'0.0.0.0',     //同时可以局域网和localhost或者127.0.0.1访问
        overlay:{
            errors:true
        },
        //open:true,        主动打开浏览器
        hot:true
    }
    //热加载需要增加的插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
else{
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push( {
        test:/\.styl/,
        use:ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })
    )
}

module.exports=config


