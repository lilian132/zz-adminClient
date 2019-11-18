import axios from 'axios';
import _encryptUrl from './ajax_encrypt';
import defaults from './defaults';
import appConfig from '../../Config';

//避免babel/webpack 自动为Promise打补丁
var Promise = window.Promise

//默认配置
let _config = defaults

//存储容器
if(!GlobalSources){
	var GlobalSources = {
		ajaxCancel:[],
		ajaxStore:[],
		ajax:{}
	}
	window.GlobalSources = GlobalSources;
}

//接口数据mock，比如 'varanus/repayment/bill'
let localApiList = [];

class Ajax {  
	// 构造  
	constructor(myInstance, myConfig) {  
		this.myInstance = myInstance;
		this.myConfig = Object.assign({}, myConfig); 
		this.myInstance.defaults.timeout = this.myConfig.timeout
		this.myInstance.defaults.preventDouble = this.myConfig.preventDouble
		this.myInstance.interceptors.request.use(this.axios_interceptors_request.bind(this),this.axios_interceptors_request_error.bind(this));
		this.myInstance.interceptors.response.use(this.axios_interceptors_response.bind(this),this.axios_interceptors_response_error.bind(this));
	}  
	
	//请求拦截器（请求之前的操作）
	axios_interceptors_request(config){
		if(this.myConfig.axios_interceptors_request){
			config = this.myConfig.axios_interceptors_request(config)			
    }
		// dev 环境会根据 localApiList 过滤出来要请求本地 devServer 的接口 
		if(appConfig.env.isDev){
			let hitApiEnable = localApiList.some((item)=>{
				if(config.originUrl.indexOf(item) != -1){
						return true;
				}
			});
			if(hitApiEnable){
				config.url = config.originUrl.replace(/^http(s)?\:\/\/([^/]*)/, '');
			}
		}	
		return config;
	}

	//请求拦截器（失败）
	axios_interceptors_request_error(error){
		if(this.myConfig.axios_interceptors_request_error){
			error = this.myConfig.axios_interceptors_request_error(error)			
		}
		return Promise.reject(error);
	}

	//响应拦截器
	axios_interceptors_response(response) {	
		if(this.myConfig.axios_interceptors_response){
			response = this.myConfig.axios_interceptors_response(response)
		}
		return response;
	}

	//响应拦截器（失败）
	axios_interceptors_response_error(error) {	
		if(this.myConfig.axios_interceptors_response_error){
			error = this.myConfig.axios_interceptors_response_error(error)		
		}
		return Promise.reject(error);
	}

	//统一处理url
	getEncryptUrl(url){
		url = this.getProcessUrl(url)	
		if(_encryptUrl){
			let style = appConfig.getStyle()
			let encryptConfig
			if(style){
				encryptConfig = style.encrypt
			}
			if(encryptConfig){
				return _encryptUrl(url,encryptConfig)
			}else {
				return url
			}			
		}else{
			return url
		}
	}

	getProcessUrl(url){
		if(this.myConfig.urlProcessFun){
			url = this.myConfig.urlProcessFun(url)
			if(!url){
				throw error('urlDeployFun no return')
			}
		}
		return url
	}

	//统一处理data
	dataProcessFun(data){
    if (!data) {
      data = {};
    }
		if(this.myConfig.dataProcessFun){
			data = this.myConfig.dataProcessFun(data)
			if(!data){
				throw error('dataDeployFun no return')
			}
		}
		return data
	}

	creatAjax(method){
		let _this = this
		return function(url, data, onSuccess, onFail){
			//兼容url为对象
			if(typeof url == 'object') {
				data = url.data
				onSuccess = url.onSuccess
				onFail = url.onFail
				url = url.url
			}		
			//兼容请求没有data
			if(typeof data=='function') {
				onFail = onSuccess;
				onSuccess = data;
				data = {};
				if(method == "get") {
					data = '';
				}
			}
			
      //防重		
			if(_this.myInstance.defaults.preventDouble){
				if(GlobalSources.ajax[url]){
					return Promise.reject('last request is not over');
				}
				GlobalSources.ajax[url] = true
			}

			return _this.myInstance({
				method: method,
				url:  _this.getEncryptUrl(url),//getEncryptUrl
				data: _this.dataProcessFun(data),
				cancelToken: new axios.CancelToken(function(c){
					// GlobalSources.ajaxCancel.push(c);
					GlobalSources.ajaxStore.push(c);
				}),
				originUrl:_this.getProcessUrl(url)
			}).then(function(data){		
				delete GlobalSources.ajax[url]
				if(data.status==200){			
					onSuccess && onSuccess(data.data);
        }
        return data.data;
			}).catch(function(data) {
				delete GlobalSources.ajax[url]
        onFail && onFail(data);
        return data && data.data;
			});
		}
	}
}

//取消ajax
function _cancelAjax(){
	while (GlobalSources.ajaxCancel.length > 0) {
		GlobalSources.ajaxCancel.pop()('abort')
	}
}

//初始化设置
const _init = function(opt){	
	let config = Object.assign({}, _config, opt)
	let instance = axios.create()
	let ajax = new Ajax(instance, config)
	_export['get'] = ajax.creatAjax('get')
	_export['post'] = ajax.creatAjax('post')
	localApiList = config.localApiList
}

//扩展
function _extend(param){
	let config = Object.assign({}, _config, param.config)
  let instance = axios.create()
	let ajax = new Ajax(instance, config)
	_export[param.name] = ajax.creatAjax(param.method)
}


//设置默认get post对象
let instance = axios.create();
let ajax = new Ajax(instance,_config);

var _export = {
	init: _init,
  get: ajax.creatAjax('get'),
	post: ajax.creatAjax('post'),
	extend: _extend,
	cancelAjax: _cancelAjax,
	encryptUrl: _encryptUrl,
}

export default _export;