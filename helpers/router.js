'use strict'
const express = require('express');
const router = express.Router();
const dbHelper = require('./dbHelper');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.send({mess: "HELLO WORLD!"});
});

router.get('/newsInfo', function(req, res, next) {
    processRequest('news', req, res)

});

router.get('/articlesInfo', function(req, res, next) {
    processRequest('articles', req, res)
});

router.get('/blogsInfo', function(req, res, next) {
    processRequest('blogs', req, res)
});

router.get('/photoreportInfo', function(req, res, next) {
    processRequest('photoreport', req, res)
});

router.get('/sourcesInfo', function(req, res, next) {
    processRequest('sources', req, res)
});

function processRequest(type, req, res) {
    let startDate = new Date(req.query.startDate).getTime() / 1000;
    let endDate = new Date(req.query.endDate).getTime() / 1000;
    let handler = null;
    switch(type) {
        case 'news': {
            handler = dbHelper.getNewsInfo;
            break;
        }
        case 'articles': {
            handler = dbHelper.getArticlesInfo;
            break;
        }
        case 'blogs': {
            handler = dbHelper.getBlogsInfo;
            break;
        }
        case 'photoreport': {
            handler = dbHelper.getPhotoreportInfo;
            break;
        }
        case 'sources': {
            handler = dbHelper.getSourcesInfo;
            break;
        }
    }
    handler(startDate, endDate).then(
        (result) => {
            res.send({
                code: 200,
                result: result
            })
        }
    ).catch(
        (error) => {
            res.send({
                code: 404,
                mess: 'DB error'
            })
        }
    );
}

module.exports = router;