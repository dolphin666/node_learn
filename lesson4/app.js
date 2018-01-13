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

        let ep = new eventproxy();
        ep.after('topic_html', topicUrls.length, function (topics) {
            topics = topics.map(function (topicPair) {
                let topicUrl = topicPair[0];
                let topicHtml = topicPair[1];
                let $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic.full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });
            console.log('final:');
            console.log(topics);
        });
        topicUrls.forEach((topicUrl) => {
            superagent.get(topicUrl)
                .end((err, res) => {
                    console.log('fetch' + topicUrl + 'successful');
                    ep.emit('topic_html', [topicUrl, res.text]);
                });
        });
    });
