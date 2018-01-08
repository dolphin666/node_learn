let express=require('express');
let utility=require('utility');
let app=express();
app.get('/',function (req, res) {
    let q=req.query.q;
    let md5value=utility.md5(q);
    res.send(md5value);
});
app.listen(3000,function (req, res) {
    console.log('app is listening at port 3000');
});
