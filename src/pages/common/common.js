// tabs标签数组
export const gameTypesList = [
    {
        title: "热门推荐", type: "ALL"
    },
    {
        title: "动作游戏", type: "A"
    },
    {
        title: "射击游戏", type: "B"
    },
    {
        title: "角色扮演", type: "C"
    },
    {
        title: "动作冒险", type: "D"
    },
    {
        title: "冒险解谜", type: "E"
    },
    {
        title: "格斗游戏", type: "F"
    },
    {
        title: "赛车竞技", type: "G"
    },
    {
        title: "模拟经营", type: "H"
    },
    {
        title: "即时战略", type: "I"
    },
    {
        title: "文字游戏", type: "J"
    },
    {
        title: "恐怖冒险", type: "K"
    },
    {
        title: "休闲益智", type: "L"
    },
    {
        title: "音乐游戏", type: "M"
    },
    {
        title: "策略游戏", type: "N"
    },
    {
        title: "生存冒险", type: "O"
    },
    {
        title: "卡通可爱", type: "P"
    },
    {
        title: "体育竞技", type: "Q"
    },
    {
        title: "街机游戏", type: "R"
    }
]

/* dangerouslySetInnerHTML
    1.dangerouslySetInnerHTMl 是React标签的一个属性，类似于angular的ng-bind；
    2.有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对;
    3.既可以插入DOM，又可以插入字符串；
*/
export const useDangerouslySetInnerHTML = (htmlText) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
}

/*
取随机数
min 最小值
max 最大值
*/
export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

/*
取随机颜色
*/
export const randomColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}

// 处理页面滚动
export const handleOnScroll = () => {
    // 滚动条距离顶部
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 可视区域
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 滚动条内容的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    return scrollTop + clientHeight === scrollHeight
}

// 去掉html标记、换行符、空格
export const formattingStr = function(str) {
	return str == null ? '' : str.replace(/<\/?.+?>/g, "").replace(/\ +/g, "").replace(/[\r\n]/g, "")
}

// 比较两个时间的大小
export const bjDate = function(date, date1) {
	var date = new Date(date);
	var date1 = new Date(date1);
	if (date.getTime() - date1.getTime() < 0) {
		return '第二个时间大';
	} else {
		return '第一个时间大';
	}
}

//两个时间相差天数 兼容firefox chrome    
export const dateDifference = function(startTime, endTime, diffType) {
	//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
	startTime = startTime.replace(/\-/g, "/");
	endTime = endTime.replace(/\-/g, "/");
	//将计算间隔类性字符转换为小写
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); //开始时间
	var eTime = new Date(endTime); //结束时间
	//作为除数的数字
	var timeType = 1;
	switch (diffType) {
		case "second":
			timeType = 1000;
			break;
		case "minute":
			timeType = 1000 * 60;
			break;
		case "hour":
			timeType = 1000 * 3600;
			break;
		case "day":
			timeType = 1000 * 3600 * 24;
			break;
		default:
			break;
	}
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
}

/**
 * @description 判断时间戳是否是今天
 * @param {Number} str 
 * @return {Boolean}
 */
 export const isToday = function(str) {
	return new Date().getTime() - new Date(str).getTime() < 86400000;
}