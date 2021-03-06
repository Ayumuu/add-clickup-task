// ライブラリ読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3010; // port番号を指定


// GET http://localhost:3000/api/v1/
app.post('/api/v1/list/:listId',function(req, res){

    const axiosBase = require('axios');
    const axios = axiosBase.create({
        baseURL: 'https://api.clickup.com/api/v2', // バックエンドB のURL:port を指定する
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'pk_3849513_1KSEPE427PWTPAWPYF0O47I1F8IMCJAQ'
        },
        responseType: 'json'
    });
    res.json({
        'action': req.body.action,
        'issue_body': req.body.issue.body,
        'list id': req.params.listId
    });
    if (req.body.action === 'opened') {
        axios.post(`/list/${req.params.listId}/task`, {
            "name":  req.body.issue.title,
            "description": req.body.issue.html_url
        })
            .then(() => {
                res.json({
                    message:"created task."
                });
            });
    }
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);