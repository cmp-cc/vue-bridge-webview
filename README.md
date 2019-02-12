
# vue-bridge-webview

javascript bridge android/ios webview

## Installation

### Browser

```
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-bridge-webview@1.1.0/vue-bridge-webview.js"></script>
```

### Package Managers

```sh
npm install vue-bridge-webview --save

import Vue from 'vue'
import VueBridgeWebview from 'vue-bridge-webview'
Vue.use(VueBridgeWebview)

// set default config 
VueBridgeWebview.config(0,true);
```

## Api

syntax format: **[this | Vue | window].$bridge.[method]**
* Set global config
```
$bridge.config(handleDelayTime,silent); // default handleDelayTime = 0 * 1000,silent = false 
```
* Android/IOS invoke JS
```
$bridge.registerHandler : function(name, registerCallback) // callback name, callback function

example: refersh page view
[this|Vue|window].$bridge.registerHandler("refreshPage",function(){
                              document.location.reload();
                          })
```
* JS invoke Android/IOS
```
$bridge.callHandler: function(name,params,callback) // callback name, request params, callback function

example: get userInfo
[this|Vue|window].$bridge.callHandler('getUserInfo',{},function(data){
           ... 
        })
```

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2016-present, cmp-cc