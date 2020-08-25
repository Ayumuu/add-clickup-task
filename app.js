// ライブラリ読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3010; // port番号を指定


// GET http://localhost:3000/api/v1/
app.post('/api/v1/',function(req, res){

    const axiosBase = require('axios');
    const axios = axiosBase.create({
        baseURL: 'https://api.clickup.com/api/v2', // バックエンドB のURL:port を指定する
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'pk_3819517_DJ2QDHESULEVT6WT1MHNQ25DWPMTTUUW'
        },
        responseType: 'json'
    });

    axios.post('/list/14329023/task', {
        "name": "タスクだよ",
        "description": "New Task Content"
    })
        .then(() => {
            res.json({
                message:"created task."
            });
        });
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);