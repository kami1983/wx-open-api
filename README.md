# wx-open-api
Backend code program that cooperates with the WeChat Open Platform API, a fast implementation version based on Express.

# reference document
* Wx login： https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
* Wx cloud： https://developers.weixin.qq.com/miniprogram/dev/wxcloudrun/src/quickstart/custom/node.html
* Develop guide： https://developers.weixin.qq.com/miniprogram/dev/wxcloudrun/src/development/call/mini.html

# How to deploy the project
* push code to branch `deployed"
```
通过 wx.cloud 代替 wx.request 不耗费任何公网流量，前后端通信走内网, 后端可直接获取用户信息，无需调接口即可以获取opneid等。如果托管服务仅仅服务小程序公众号，那么自然使用前者更方便。

```