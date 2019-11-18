let formatPrice = function(str) {
    if (!str) {
        return 0;
    };
    str = str.toString().replace(/,/g, "")
    var len = str.length,
        str2 = '',
        max = Math.floor(len / 3);
    for (var i = 0; i < max; i++) {
        var s = str.slice(len - 3, len);
        str = str.substr(0, len - 3);
        str2 = (',' + s) + str2;
        len = str.length;
    }
    str += str2;
    if (len % 3 == 0) {
        str = str.slice(1);
    }
    return str
};

/**
 * @param date  时间戳
 * @param format 时间格式 默认'yyyy.MM.dd'
 * 把format中包含'yMdhmsqS'字符串的地方替换成date转换成的日期
 */
let formatDate = function(date, format) {
    date = new Date(Number(date));
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (!format) format = 'yyyy.MM.dd';
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

let tools_international = {
    formatPrice,
    formatDate,
};

// module.exports = tools_international;
export default tools_international