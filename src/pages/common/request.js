import React from "react";

/**
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export const fuzzyQuery = function (list, keyWord) {
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
 * @param {Number} page 
 * @param {Boolean} updatedAt
 * @param {Boolean} readCount 
 */
export const djxzAllGames = function (page, updatedAt, readCount) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        if (updatedAt && readCount) {
            query.order('-createdAt', '-readCount')
        }
        if (updatedAt && !readCount) {
            query.order('-createdAt')
        }
        if (!updatedAt && readCount) {
            query.order('-readCount')
        }
        query.limit(40)
        query.skip(page * 40)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        }).catch(err => {
            reject(err)
        });

    })
}

/*
获取一行记录
objectId 主键ID
tableName 数据表名，默认为 CGP_HotRecommend
*/
export const djxzQueryWithID = function (objectId, tableName) {
    return new Promise((resolve, reject) => {
        const query = React.$bmob.Query(!!tableName ? tableName : 'CGP_HotRecommend')
        query.get(objectId).then(res => {
            // console.log(res)
            resolve(res)
        }).catch(err => {
            // console.log(err)
            reject(err)
        })
    })
}

/**
 * 根据 tabs 标签查询数据
 * @param  {String} type 类型
 * @param {Boolean} updatedAt
 * @param {Boolean} readCount
 * @return {Array}  查询的结果
 */
export const djxcQueryGames = function (type, page, updatedAt, readCount) {
    return new Promise((resolve, reject) => {

        const query = React.$bmob.Query('CGP_HotRecommend')
        query.equalTo("type", "==", type)
        if (updatedAt && readCount) {
            query.order('-createdAt', '-readCount')
        }
        if (updatedAt && !readCount) {
            query.order('-createdAt')
        }
        if (!updatedAt && readCount) {
            query.order('-readCount')
        }
        query.limit(40)
        query.skip(page * 40)
        query.find().then(res => {
            // console.log(res)
            resolve(res)
        });

    })
}

// 热门文章列表数据
export const djxzAllArticles = function(page) {
	return new Promise((resolve, reject) => {

		const query = React.$bmob.Query('CGP_PopularArticles')
		// 对createdAt字段降序排列
		query.order("-createdAt")
		query.limit(40)
		query.skip(page*40)
		query.find().then(res => {
			// console.log(res)
			resolve(res)
		});

	})
}
