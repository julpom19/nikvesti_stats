const con = require('./databaseConfig').getConnection();
console.log('');

module.exports = {
    getNewsInfo: function (startDate, endDate) {
        return new Promise((resolve, reject) => {
            let query = 'select count(title) as count, region, owner_id, (select concat(first_name," ",last_name) from users where id = owner_id) as author from nodes where ((published >= ' + startDate + ' AND published <= ' + endDate + ') AND (title is not null) AND (type = "news")) group by owner_id, region;'

            con.query(query, function (err, result) {
                // if (err) reject(err);
                // if(!result) {
                //     reject('DB error');
                //     return;
                // }
                // let resObj = {};
                // for(item of result) {
                //     if(!resObj.hasOwnProperty(item.owner_id)) {
                //         // console.log('in not');
                //         resObj[item.owner_id] = {};
                //         resObj[item.owner_id].data = {};
                //         resObj[item.owner_id].name = item.author;
                //     }
                //     let key = '';
                //     switch (item.region) {
                //         case 1: {
                //             key = 'countNiko';
                //             break;
                //         }
                //         case 2: {
                //             key = 'countUkr';
                //             break;
                //         }
                //         case 3: {
                //             key = 'countWorld';
                //             break
                //         }
                //     }
                //     if(key) {
                //         resObj[item.owner_id].data[key] = item.count;
                //     }
                // }
                resolve({
                    "30": {
                        "data": {
                            "countNiko": 9,
                            "countUkr": 5,
                            "countWorld": 6
                        },
                        "name": "Дмитрий Булаш"
                    },
                    "31": {
                        "data": {
                            "countUkr": 1
                        },
                        "name": "Артем Куцолабский"
                    },
                    "38": {
                        "data": {
                            "countUkr": 5,
                            "countWorld": 4
                        },
                        "name": " Бойченко Ю."
                    }
                });
            });
        });

    },
    getPhotoreportInfo: function (startDate, endDate) {
        return new Promise((resolve, reject) => {
            let query = 'select id, title, (select concat(first_name," ",last_name) from users where id = owner_id) as author, published from nodes where ((published >= ' + startDate + ' AND published <= ' + endDate + ') AND (title is not null) AND (category = "photoreportage"));'

            con.query(query, function (err, result) {
                if (err) reject(err);
                if(!result) {
                    reject('DB error');
                    return;
                }
                let resArray = [];
                for(item of result) {
                    let obj = {
                        title: item.title,
                        author: item.author,
                        date: new Date(item.published * 1000),
                        link: 'http://nikvesti.com/news/photoreportage/' + item.id
                    }
                    resArray.push(obj);
                }
                resolve(resArray);
            });
        });

    },
    getBlogsInfo: function (startDate, endDate) {
        return new Promise((resolve, reject) => {
            let query = 'select count(title) as count, (select fullName from blogers where id = blogger_id) as author, sum(counter) as view_count from blg_nodes where ((created >= ' + startDate + ' AND created <= ' + endDate + ') AND (title is not null)) group by blogger_id;'

            con.query(query, function (err, result) {
                if (err) reject(err);
                if(!result) {
                    reject('DB error');
                    return;
                }
                let resArray = [];
                console.log('RESuLT', result);
                for(item of result) {
                    let obj = {
                        author: item.author,
                        blogCount: item.count,
                        viewCount: item.view_count
                    }
                    resArray.push(obj);

                }

                resolve(resArray);
            });
        });

    },
    getArticlesInfo: function (startDate, endDate) {
        return new Promise((resolve, reject) => {
            let query = 'select owner_id, count(title) as count, (case source_url when "" then "own" else "not own" end) as owner, (select concat(first_name," ",last_name) from users where id = owner_id) as author from nodes where ((published >= ' + startDate + ' AND published <= ' + endDate + ') AND (title is not null) AND (type = "article")) group by owner_id, owner;'

            con.query(query, function (err, result) {
                if (err) reject(err);
                if(!result) {
                    reject('DB error');
                    return;
                }
                let resObj = {};
                for(item of result) {
                    if(!resObj.hasOwnProperty(item.owner_id)) {
                        resObj[item.owner_id] = {};
                        resObj[item.owner_id].data = {};
                        resObj[item.owner_id].name = item.author;
                    }
                    let key = '';
                    switch (item.owner) {
                        case 'own': {
                            key = 'countOfOwn';
                            break;
                        }
                        case 'not own': {
                            key = 'countOfNotOwn';
                            break;
                        }
                    }
                    if(key) {
                        resObj[item.owner_id].data[key] = item.count;
                    }
                }
                resolve(resObj);
            });
        });

    },
    getSourcesInfo: function (startDate, endDate) {
        return new Promise((resolve, reject) => {
            let query = 'select count(title) as count, (select name from sources where id = source) as source_name from nodes where ((published >= ' + startDate + ' AND published <= ' + endDate + ') AND (title is not null) AND (source != 5)) group by source;'

            con.query(query, function (err, result) {
                if (err) reject(err);
                if(!result) {
                    reject('DB error');
                    return;
                }
                resolve(result);
            });
        });

    }
}