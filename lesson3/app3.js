let express=require('express');
let superagent=require('superagent');
let cheerio=require('cheerio');

let app=express();
app.get('/',function (req, res, text) {
    superagent.get('http://www.cnodejs.org/')
        .end(function (err, sres) {
            if(err){
                return text(err);
            }
            let $=cheerio.load(sres.text);
            let items=[];
            $('#topic_list .topic_title').each(function (idx, element) {
                let $element=$(element);
                items.push({
                    title:$element.attr('title'),
                    href:$element.attr('href')
                });
            });
           res.send(items);
        });
});
app.listen(3000,function () {
    console.log('app is listening at port 3000');
})