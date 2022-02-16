var proxy=null;

if(process.env.VUE_APP_MODE=='development'){
    proxy={
        '/api': {
            target: process.env.VUE_APP_SERVER_URL,
            pathRewrite: {
                '^/api': ''
            }
        },
    }
}
module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: proxy,
    },
    css:{
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 75
                    })
                ]
            }
        }
    }
}
