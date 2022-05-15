const path = require('path');

module.exports = {
  mode: 'development', // 开发模式
  entry: path.resolve(__dirname, 'src/main.js'), // 入口文件
  output: {
    filename:'bundle.js', // 打包后的文件名称
    path: path.resolve(__dirname, 'dist'),
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader',                 
          {
            loader:'css-loader',
            options:{
              modules:true
            }
          },
          {
            loader:'postcss-loader',
            options:{
              postcssOptions: { 
                plugins: ['autoprefixer']
              }
            }
          },
          {
            test:/\.scss$/,
            use:['style-loader', 'css-loader', 'sass-loader']
          }
        ],
      }
    ]
  }
}
