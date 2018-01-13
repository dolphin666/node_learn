let eventproxy = require('eventproxy');
let superagent = require('superagent');
let cheerio = require('cheerio');

let url = require('url');
let cnodeUrl = 'https://cnodejs.org/';
superagent.get(cnodeUrl)
    .end((err, res) => {
        if (err) {
            return console.error(err);
        }
        let topicUrls = [];
        let $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each((idx, element) => {
            let $element = $(element);
            let href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        })
        console.log(topicUrls);
    });
