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
export  function deepClone(data) {
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
export function resetDateFormat(date){
	if(date.split(' ').length>1){
		return date
	}
	if(date.split('-').length>2){
		return date+" 00:00:00"
	}
}