

#[vue-bridge-webview](https://github.com/cmp-cc/vue-bridge-webview)

>  javascript bridge android/ios webview

---

## Installation
```sh
npm install vue-bridge-webview --save

```

**or**

download [vue-bridge-webview](https://github.com/cmp-cc/vue-bridge-webview/blob/master/vue-bridge-webview.js)

## Api
* registerHandler : function(name, registerCallback)

**Android / IOS 调用JS,需要明确调用的`function名称` [回调名称,回调函数]**
* callHandler: function(name,params,callback)

**JS 调用 Android / IOS [回调名称,请求参数,回调函数]**

## demo
**vue-bridge-webview 并不依赖任何框架,只是对`vue`相对更加友好**
```
   created: function(){  // vue project

        // android/ios 调用js 刷新界面
        this.$bridge.registerHandler("refreshPage",function(){
            document.location.reload();
        })

        // js 调用 android/ios 获取用户信息
        this.$bridge.callHandler('getUserInfo',{},function(data){
           ... // 相关业务操作
        })
    },


    如上等价于, 同于也可以应用于 ng2/react
    window.$bridge.registerHandler("refreshPage",function(){
                document.location.reload();
       })
    window.$bridge.callHandler('getUserInfo',{},function(data){
               ... // 相关业务操作
       })
```


## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2016-present, cmp-cc