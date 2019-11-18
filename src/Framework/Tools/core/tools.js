// import tools_international from './tools_international';

/**
 * @param obj
 * 判断数据是否为空
 */
let isNullOrEmpty = function (obj) {
  var result = (obj == null || obj == undefined || obj == "" || obj == "null" || obj == "undefined" || typeof obj == "undefined");
  if (result && (obj != 0 || obj != "0")) {
    return result;
  } else {
    return false;
  }
};

/**
 * @param name   url参数名
 * @param searchUrlOnly   仅在url中查找，默认 false, 会在 sessionStorage 先查找
 * 获取当前链接中指定名字的参数
 */
let getParam = function (name, searchUrlOnly = true) {
  if (!name) return null

  let values = sessionStorage.getItem(name)
  if (!searchUrlOnly && values) return values

  values = decodeURIComponent((location.search.match(RegExp("[?|&|/]" + name + '=([^/\&|?&]+)')) || [, null])[1]);
  if (isNullOrEmpty(values)) {
    values = decodeURIComponent((location.hash.match(RegExp("[?|&|/]" + name + '=([^\&|?&]+)')) || [, null])[1]);
  }
  return isNullOrEmpty(values) || values == "null" ? "" : values;
}

/**
 * 判断是否为安卓
 */
let isAndroid = function () {
  var ua = window.navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) {
    return false;
  } else {
    return true;
  }
};

/**
 * 判断是否为ios
 */
let isIos = function () {
  var ua = window.navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Base64转换
 */
let Base64 = function () {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  // this.decode = function (input) {
  //   var output = "";
  //   var chr1, chr2, chr3;
  //   var enc1, enc2, enc3, enc4;
  //   var i = 0;
  //   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  //   while (i < input.length) {
  //     enc1 = _keyStr.indexOf(input.charAt(i++));
  //     enc2 = _keyStr.indexOf(input.charAt(i++));
  //     enc3 = _keyStr.indexOf(input.charAt(i++));
  //     enc4 = _keyStr.indexOf(input.charAt(i++));
  //     chr1 = (enc1 << 2) | (enc2 >> 4);
  //     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
  //     chr3 = ((enc3 & 3) << 6) | enc4;
  //     output = output + String.fromCharCode(chr1);
  //     if (enc3 != 64) {
  //       output = output + String.fromCharCode(chr2);
  //     }
  //     if (enc4 != 64) {
  //       output = output + String.fromCharCode(chr3);
  //     }
  //   }
  //   output = _utf8_decode(output);
  //   return output;
  // }
  // private method for UTF-8 encoding
  //把字符串string根据unicode码进行替换
  let _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  // let _utf8_decode = function (utftext) {
  //   var string = "";
  //   var i = 0;
  //   var c = c1 = c2 = 0;
  //   while (i < utftext.length) {
  //     c = utftext.charCodeAt(i);
  //     if (c < 128) {
  //       string += String.fromCharCode(c);
  //       i++;
  //     } else if ((c > 191) && (c < 224)) {
  //       c2 = utftext.charCodeAt(i + 1);
  //       string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
  //       i += 2;
  //     } else {
  //       c2 = utftext.charCodeAt(i + 1);
  //       c3 = utftext.charCodeAt(i + 2);
  //       string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
  //       i += 3;
  //     }
  //   }
  //   return string;
  // }

};

let Base64Encode = (new Base64()).encode

// let Base64Decode = (new Base64()).decode

// a+b
let add = function (a, b) {
  if (typeof (a) == 'number') a += ''
  if (typeof (b) == 'number') b += ''
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
// a-b
let sub = function (a, b) {
  if (typeof (a) == 'number') a += ''
  if (typeof (b) == 'number') b += ''
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
};

// 计算a和b的乘积  （Math.pow(m,n)返回m的n次幂）
let mul = function (a, b) {
  if (typeof (a) == 'number') a += ''
  if (typeof (b) == 'number') b += ''
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) { }
  try {
    c += e.split(".")[1].length;
  } catch (f) { }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
};

// a/b
let div = function (a, b) {
  if (typeof (a) == 'number') a += ''
  if (typeof (b) == 'number') b += ''
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
};

// 设置cookie，Days如果不设置默认为3000
let setCookie = function (name, value, Days) {
  function GetCookieDomain() {
    var host = location.hostname;
    var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (ip.test(host) === true || host === 'localhost') return host;
    return location.host.replace(/\w*./, '');
  }
  let upcurrentDomian = GetCookieDomain()
  if (!Days) Days = 3000;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + encodeURIComponent(value) + ";domain=" + upcurrentDomian + ";expires=" + exp.toGMTString() + ";path=/";
}

// 获得cookie
let getCookie = function (name) {
  if (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (decodeURIComponent(arr[2]));
    else
      return null;
  }
  return null;
};

// 删除cookie
let delCookie = function (name) {
  setCookie(name, '', -1);
};

// 获取一个16位的随机数为zuid
let createUuid = function () {
  return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 字符串首尾去空格
let trim = function (str) {
  if (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "")
  } else {
    return ''
  }
}
//函数去抖
let debounce = function (fn, delay) {
  let timer = null;

  return function () {
    let args = arguments;
    let context = this;
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
}

const init = function (opt) {
  Object.assign(tools, opt);
}

let tools = {
  init,
  isNullOrEmpty,
  getParam,
  isAndroid,
  isIos,
  Base64Encode,
  add,
  sub,
  mul,
  div,
  setCookie,
  getCookie,
  delCookie,
  createUuid,
  trim,
  debounce,
};

// Object.assign(tools, tools_international)
// module.exports = tools;
export default tools;