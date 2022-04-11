/* eslint-disable no-loop-func */
import React from "react";

/**
 * 使用test方法实现模糊查询
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export const fuzzyQuery = function (keyWord) {
    let list = []
    if (!window.localStorage) {
        list = []
        alert('浏览器不支持localstorage')
        return
    }
    
    let cacheData = window.localStorage.getItem(GAMESTITLEIDKEY)
    if (cacheData) {
        list = JSON.parse(cacheData)
    }

    var reg = new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        if (reg.test(list[i].title)) {
            arr.push(list[i]);
        }
    }
    return arr;
}

// type类型数组
export const djxzGameTypes = [
    "ALL",
    "A", "B", "C",
    "D", "E", "F",
    "G", "H", "I",
    "J", "K", "L",
    "M", "N", "O",
    "P", "Q", "R"
]

// 获取配置信息
export const djxzConfigs = function () {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_Configs')
        query.find().then(res => {
            resolve(res)
        });

    })
}

// 获取广告位数据
export const djxzBanner = function () {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_Banner')
        query.find().then(res => {
            resolve(res)
        });

    })
}

/**
 * @description 获取全部数据
 * @param {Number} page 页数
 * @param {Boolean} updatedAt 创建时间
 * @param {Boolean} readCount 阅读数量
 * @param {String} title 标题
 * @param {Number} limit 每页数据条数
 */
export const djxzAllGames = function (page, updatedAt, readCount, title, limit) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        if (updatedAt) {
            query.order('-createdAt')
        }
        if (readCount) {
            query.order('-readCount')
        }
        if (title) {
            query.order('title')
        }
        query.limit(limit ? limit : 40)
        query.skip(page * (limit ? limit : 40))
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        }).catch(err => {
            reject(err)
        });

    })
}

/**
 * 根据 tabs 标签查询数据
 * @param  {String} type 类型
 * @param {Number} page 页数
 * @param {Boolean} updatedAt 创建时间
 * @param {Boolean} readCount 阅读数量
 * @param {String} title 标题
 * @param {Number} limit 每页数据条数
 */
export const djxcQueryGames = function (type, page, updatedAt, readCount, title, limit) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        query.equalTo("type", "==", type)
        if (updatedAt) {
            query.order('-createdAt')
        }
        if (readCount) {
            query.order('-readCount')
        }
        if (title) {
            query.order('title')
        }
        query.limit(limit ? limit : 40)
        query.skip(page * (limit ? limit : 40))
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

const GAMESTITLEIDKEY = 'GAMESTITLEIDKEY'

/**
 * @description 获取全部游戏标题、游戏ID
*/
export const djxzAllGamesTitleID = function () {
    return new Promise((resolve, reject) => {

        if (!window.localStorage) {
            reject('浏览器不支持localstorage')
            return
        }

        // 判断本地是否缓存过全部游戏标题、游戏ID的数据
        // 先获取全部游戏数量
        djxzQueryGamesCount().then(gamesCount => {
            let cacheData = window.localStorage.getItem(GAMESTITLEIDKEY)
            if (cacheData) {
                // 1.有缓存
                console.log(`GAMESTITLEIDKEY：本地缓存共${JSON.parse(cacheData).length}条数据`);
                // 比较缓存数据的长度与服务端数据的长度
                if (JSON.parse(cacheData).length < gamesCount) {
                    // 更新本地缓存
                    // 先清除本地缓存
                    window.localStorage.removeItem(GAMESTITLEIDKEY)
                    // 再根据游戏数量设定API调用次数
                    let loopNum = Math.ceil(gamesCount / 500)
                    loopAPI(loopNum)
                    console.log('GAMESTITLEIDKEY：更新本地缓存');
                }
            } else {
                // 2.无缓存
                // 根据游戏数量设定API调用次数
                let loopNum = Math.ceil(gamesCount / 500)
                loopAPI(loopNum)
                console.log('GAMESTITLEIDKEY：设置本地缓存');
            }
        })

    })
}

// 同步循环调用API
const loopAPI = async function (loopNum) {
    let titleIDArray = []
    for (let i = 0; i < loopNum; i++) {
        await getGamesTitleID(i).then(titlesIDs => {
            if (i === 0) {
                titleIDArray = titlesIDs
            } else {
                titleIDArray = titleIDArray.concat(titlesIDs)
            }
        })
    }
    // 存入localStorage
    window.localStorage.setItem(GAMESTITLEIDKEY, JSON.stringify(titleIDArray))
}

/**
 * @description 获取全部游戏标题、游戏ID
 * @param {Number} page 页数
*/
const getGamesTitleID = function (page) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        query.select("title", "objectId")
        query.limit(500)
        query.skip(page * 500)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

/**
 * 热门文章列表数据
 * @param {Number} page 页数
 * @param {Boolean} updatedAt 创建时间
 * @param {Boolean} readCount 阅读数量
 * @param {String} title 标题
 * @param {Number} limit 每页数据条数
 */
export const djxzAllArticles = function (page, updatedAt, title, limit) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_PopularArticles')
        if (updatedAt) {
            query.order('-createdAt')
        }
        if (title) {
            query.order('title')
        }
        query.limit(limit ? limit : 40)
        query.skip(page * (limit ? limit : 40))
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

/**
 * @description 统计热评资讯数量
 */
export const djxzQueryArticlesCount = function () {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_PopularArticles');
        query.count().then(res => {
            console.log(`服务端共有${res}条热评资讯记录`)
            resolve(res)
        });

    })
}

/**
 * @description 统计游戏记录数量
 * @param  {String} type 类型
 */
export const djxzQueryGamesCount = function (type) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend');
        if (type) {
            query.equalTo("type", "==", type)
        }
        query.count().then(res => {
            console.log(`服务端共有${res}条游戏记录`)
            resolve(res)
        });

    })
}

// 通过主键修改一行记录
// objectId 主键
export const djxzAddReadCount = function (objectId) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend');
        query.get(objectId).then(res => {
            // 每次打开游戏详情页，给readCount增加1
            res.set('readCount', (!!!res.readCount ? 0 : res.readCount) + 1)
            res.save().then(res => {
                // console.log(res)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })

    })
}

/*
获取一行记录
objectId 主键ID
tableName 数据表名，默认为 CGP_HotRecommend
*/
export const djxzQueryWithID = function (objectId, tableName) {
    return new Promise((resolve, reject) => {
        const query = React.$bmob.Query(tableName ? tableName : 'CGP_HotRecommend')
        query.get(objectId).then(res => {
            // console.log(res)
            resolve(res)
        }).catch(err => {
            // console.log(err)
            reject(err)
        })
    })
}

