const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{   
    proxy:{      
        '/api':{
           target:'http://112.74.110.7',
            ws:true,
            changeOrigin:true,//开启代理
            pathRewrite:{
                '^/api':''
            },
        }
    }
}
})
