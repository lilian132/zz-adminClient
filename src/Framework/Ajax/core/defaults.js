const defaults = {
    timeout:'90000',
    preventDouble:true,//如果启用preventDouble，则不允许在第一个请求完成响应之前，发送相同的url请求
    localApiList:[],//本地mock列表
    urlProcessFun:null,//url统一加工处理函数
    dataProcessFun:null,//data统一加工处理函数
    axios_interceptors_request:null,//axios请求拦截器函数
    axios_interceptors_request_error:null,//axios请求拦截器失败函数
    axios_interceptors_response:null,//axios响应拦截器函数
    axios_interceptors_responset_error:null,//axios响应拦截器失败函数
}


module.exports = defaults