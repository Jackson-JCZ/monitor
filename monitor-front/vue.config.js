const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{   
    proxy:{      
        '/api':{
           target:'http://47.103.139.192:3000/',
            ws:true,
            changeOrigin:true,//开启代理
            pathRewrite:{
                '^/api':''
            },
        }
    }
}
})
