var express=require('express');
var app=express();
app.get('/',function (req, res) {
    res.send('Hello World');
});
//微信将很多事件推送到此接口上
// app.post('/index.html', function(req, res, next) {
//     //微信得到返回后会通过你的认证
//     var query = req.query;
//     var echostr = query.echostr;
//     res.send(echostr);
// });
app.listen(80,function () {
    console.log('app is listening at port 80');
});
