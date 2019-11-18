import defaults from './defaults';

let config = defaults

const init = function(opt){    
    Object.assign(config, opt);
    console.log('init============', config)
}

//通过b值和c值获取style
const getStyle = function() {
    let style
    return function _get(opt){
        if (style) return style
        let _config = opt||config       
        let b = _config.b
        let c = _config.c
        //提供浏览器设置sessionStorage改变B值，供调试
        if (_config.env.noPro && sessionStorage.getItem('debugmjB')) {
            b = sessionStorage.getItem('debugmjB')
        }
        //提供浏览器设置sessionStorage改变C值，供调试
        if (_config.env.noPro && sessionStorage.getItem('debugmjC')) {
            c = sessionStorage.getItem('debugmjC')
        }
        let _style = _config.style_config
        for(let i in _style){
            if(_style[i].b == b && _style[i].c == c){
                style = _style[i].config
                return style
            }
        }
    }
};

/*设置某一项配置
* @param key 配置项属性名
* @param val 配置项属性值
*/
const setConfig = function(key,val){
    if(!key)return
    config[key] = val
}

Object.assign(config, {
    init: init,
    setConfig: setConfig,
    getStyle: getStyle()
});

// module.exports = config;
export default config;