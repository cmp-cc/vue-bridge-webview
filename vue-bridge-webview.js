/**
 * Vue Bridge Webview v1.1.0
 * https://github.com/cmp-cc/vue-bridge-webview
 *
 * Copyright 2016, cmp-cc
 * Released under the MIT license
 */

(function() {

  /**
   *  vue-bridge-webview config
   *
   * @type {{bridgeWebViewDelay: number}}
   */
  var bridgeConfig = {
    bridgeWebViewDelay : 0,
    callHandle : {}, // bridge android / ios
    silent : false
  }

  var $bridge = {
    registerHandler : function (name,callback) {
      if(bridgeConfig.silent){
        console.log(name,' register handler failure')
      }
    },
    callHandler : function (name, params, callback) {
      if(bridgeConfig.silent){
        console.log(name,' call handler webView failure')
      }
    }
  };

// ============ device init operation start ===========

  /* setup WebView Javascript Bridge for ios , ios 初始化 */
  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
  }

  /* 用于创建桥接对象的函数 , android 初始化 */
  function connectWebViewJavascriptBridge(callback) {
    //如果桥接对象已存在，则直接调用callback函数
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    }
    //否则添加一个监听器来执行callback函数
    else {
      document.addEventListener('WebViewJavascriptBridgeReady', function () {
        callback(WebViewJavascriptBridge)
      }, false)
    }
  }

  /* device detect for ios/android */
  
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    setupWebViewJavascriptBridge(function(bridge){
      $bridge = bridge
    })
  }else if(/(Android)/i.test(navigator.userAgent)) {
   connectWebViewJavascriptBridge(function(bridge){
     $bridge = bridge
   })
  }

// ==============device init operation end ============

  var VueBridgeWebView = {

    install: function(Vue) {
      Vue.prototype.$bridge = this
      Vue.bridge = this

      // config
      bridgeConfig.silent = Vue.config.silent
    },

    config : function(bridgeWebViewDelay,silent) {
      if(bridgeWebViewDelay) {
        bridgeConfig.bridgeWebViewDelay = bridgeWebViewDelay;
      }
      if(silent) {
        bridgeConfig.silent = silent;
      }
    },

    /**
     *  Android / IOS 调用JS,需要明确调用的`function名称` .
     *
     *
     * @param name `function name`
     * @param registerCallback 回调的响应事件
     */
    registerHandler : function(name, registerCallback){
      if($bridge['registerHandler']){

        setTimeout(function(){
          $bridge.registerHandler(name,registerCallback)
        },bridgeConfig.bridgeWebViewDelay)

      }else{
        console.log("don't built-in WebView invoking ",name,'{registerHandler}')
      }
    },

    /**
     *  JS 调用 Android / IOS
     *
     *  name: 回调名称, android/ios 名称 ,eg: 'getUserInfo'
     *  params 请求参数, eg: { 'userId' : 1}
     *  callback: response(响应函数)
     *
     *  eg: this.$bridge.callHandler('getUserInfo',{'userId':1},function(data){...})
     *
     */
    callHandler: function(name,params,callback){

        if($bridge['callHandler']){

          $bridge.callHandler(name,params,function(data){
            if(typeof callback == 'function'){
              /* 解决部分系统加载延迟导致 ios/android 不响应问题 */
              setTimeout(function(){
                callback(data);
              },bridgeConfig.bridgeWebViewDelay)
            }
          })

        }else {
          console.log("don't built-in WebView invoking ",name,'{callHandler}')
        }
    }
  }

  if (typeof exports == "object") {
    module.exports = VueBridgeWebView;
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return VueBridgeWebView; })
  } else if (window.Vue) {
    window.$bridge = VueBridgeWebView
    Vue.use(VueBridgeWebView);
  }else{
    window.$bridge = VueBridgeWebView
  }

})()
