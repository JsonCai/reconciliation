/**
 * 对象深拷贝
 * @param obj
 * @returns obj
 */

function getType(obj) {
	//tostring 会返回对应不同的标签的构造函数
	const toString = Object.prototype.toString;
	const map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	return map[toString.call(obj)];
}
export function deepClone(data) {
	var type = getType(data);
	var obj = {};
	if (type === 'array') {
		obj = [];
	} else if (type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === 'array') {
		for (var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
}
export function resetDateFormat(date) {
	if (date.split(' ').length > 1) {
		return date
	}
	if (date.split('-').length > 2) {
		return date + " 00:00:00"
	}
}

export function dateFtt(fmt, date) { //author: meizz 
	var o = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

export function fmtMoney(val) {
	return val.toFixed(2)
}

export function fmtMoney2(val) {
	if (val > 0) {
		const str = '00' + val
		const s = str.substring(0, str.length - 2)
		const e = '.' + str.substring(str.length - 2)
		return Number(s + e)
	} else {

		const str1 = '' + val
		const s1 = str1.substring(1, str1.length - 2)

		const e1 = '.' + str1.substring(str1.length - 2)
		return (0 - Number(s1 + e1))
	}
}

export function accMul(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

export function fmtMoneyBySeparator(float) {
	var isMinus = false
	if (float < 0) {
		float = 0 - float
		isMinus = true
	}
	var result = [],
		counter = 0,
		r = '';
	let num = (float || 0).toString().split('.')[0].split('');
	for (var i = num.length - 1; i >= 0; i--) {
		counter++;
		result.unshift(num[i]);
		if (!(counter % 3) && i != 0) {
			result.unshift(',');
		}
	}
	if (float.toString().indexOf('.') != -1) {
		r = result.join('') + "." + float.toString().split('.')[1];
	} else {
		r = result.join('');
	}
	if (isMinus) {
		r = '-' + r
	}
	return r
}
