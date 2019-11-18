import ajax from '@/Framework/Ajax';
import tools from '@/Framework/Tools';
const defaults = {
  // 超时时间
  timeout: '40000',
  // 如果启用preventDouble，则不允许在第一个请求完成响应之前，发送相同的url请求
  preventDouble: false,
  localApiList: [
    // 'ostrader',
    // 'mainhome',
    // 'creditstatus',
  ],
  // url统一处理，可以在这里增加统一参数
  urlProcessFun(url) {    
    return url;
  },
  // data统一处理，可以在这里增加统一参数
  dataProcessFun(data) {   
    return data;
  },
  // axios请求拦截器
  axios_interceptors_request(reqConfig) {    
    return reqConfig;
  },
  // axios请求拦截器发生错误
  axios_interceptors_request_error(error) {
    return error;
  },
  // axios响应拦截器
  axios_interceptors_response(response) {
    return response;
  },
  // axios响应拦截器发生错误
  axios_interceptors_response_error(error) {    
    return error;
  },
};

const preventDoublePostConfig = Object.assign({}, defaults, {
  preventDouble: true,
});

/* eslint-disable */
const init = function () {
  ajax.init(defaults);
  ajax.extend({
    method: 'post',
    name: 'preventDoublePost',
    config: preventDoublePostConfig,
  });
  try {
    const event = new CustomEvent('ajaxInit-event');
    window.dispatchEvent(event);
  } catch (e) {
    console.log(e);
  }
};
/* eslint-enable */

export default {
  init,
};
