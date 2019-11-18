### Config 模块

应用的核心配置文件，调用init初始化之后，直接在项目中引入该模块使用配置信息。
***

### 内置配置项说明
配置项 | 类型| 说明
---|---|---
config.env | String | 环境变量，可选值pro/test/dev，分别对应生成/测试/开发，默认pro
config.b | String | 当前app的业务B值
config.c | String | 当前app的业务C值
config.style_config | Array | 当前app的所有马甲包配置信息
config.base_url | String | 接口url地址
config.acq_url | String | 数据上报url地址
config.h5appver | String | H5版本
|

说明：config.style_config 是专门为多马甲配置设定的配置项，不同b值和c值对应有不同的马甲配置信息，具体格式示例：
```javascript
/*
  * 不同b值和c值对应不同马甲/共贷包，对应有不同的配置;可以在config中增加其它配置
  * name 项目名 用在代码或域名中
  * fmtName 格式化名字 显示在界面中的名字
  * acq 大数据上报配置
  * encrypt ajax加密配置
  * onlinePlanId 在线客服配置id
  */
  style_config : [
      {b:'10',c:'2',config:{
          name: 'danarupiah',fmtName:'Dana Rupiah',acq:{appid:'jkand'},onlinePlanId:'474'
      }},
      {b:'10',c:'101',config:{
          name: 'danaku',fmtName:'Dana Ku',acq:{appid:'jkanddanaku'},onlinePlanId:'475'
      }},
      {b:'16',c:'2',config:{
          name: 'uangplus',fmtName:'Uang Plus',acq:{appid:'jkanduangplus'},encrypt:{pre:'p',next:'o',app_id:'Ug03s'},onlinePlanId:'476'
      }}
  ]
```
---
### API列表

API | 参数类型| 参数可选 |说明
---|---|---|---
config.init | Object| 否| 初始化方法
config.setConfig | key[String],val[*]| 否| 设置某一个config属性
config.getStyle | Object| 是| 获取app当前配置信息，参数为config配置对象，没有参数默认用当前config对象
|

#### config.init(Object)

通过此方法初始化配置，如果没有调用此方法则使用默认配置

* 参数说明：

对应config的内置配置项；同时可自定义自己的config项

* 示例代码：

```javascript
import config from '@/Framework/Config';

//以下是框架中的默认配置
const defaults = {
  //环境变量 
  env: 'dev',
  //b值配置
  b : '10',
  //c值配置
  c : '2',   
  /*
  * 不同b值和c值对应不同马甲/共贷包，对应有不同的配置;可以在config中增加其它配置
  * name 项目名 用在代码或域名中
  * fmtName 格式化名字 显示在界面中的名字
  * acq 大数据上报配置
  * encrypt ajax加密配置
  * onlinePlanId 在线客服配置id
  */
  style_config : [
      {b:'10',c:'2',config:{
          name: 'danarupiah',fmtName:'Dana Rupiah',acq:{appid:'jkand'},onlinePlanId:'474'
      }},
      {b:'10',c:'101',config:{
          name: 'danaku',fmtName:'Dana Ku',acq:{appid:'jkanddanaku'},onlinePlanId:'475'
      }},
      {b:'16',c:'2',config:{
          name: 'uangplus',fmtName:'Uang Plus',acq:{appid:'jkanduangplus'},encrypt:{pre:'p',next:'o',app_id:'Ug03s'},onlinePlanId:'476'
      }}
  ],
  //接口url地址
  base_url: 'https://ehkrd.danarupiah.id',
  //数据上报url地址
  acq_url: "https://ebjqa.weshare.com.cn/sea/v1/metrics",
  h5appver:'1.1.0',//H5版本
  USERSTATUS:'0',//自定义常量
}

//不同环境自定义
if(location.host.indexOf('300') == -1 && location.host.indexOf('ebjrd') == -1){
  defaults.env = 'pro'
  //假设线上base_url需要依赖style_config中的name作为域名，可以通过config.getStyle获取当前style
  let name = config.getStyle(defaults).name
  defaults.base_url = `https://ehkrd.${name}.id`
}

config.init(defaults)
```

### config.setConfig(key[String],val[*])

设置config配置项的值，也可以通过该方法直接新增一个配置项

* 参数说明：

key: 可以是config内置配置项属性名，也可以是自定义任意字符串</br>
val: 配置项的值，任意数据类型

* 示例代码：

```javascript
    import config from '@/Framework/Config'

    config.setConfig('appver','3.0')
    console.log(config.appver)  //3.0
```


### config.getStyle(Object)

该方法会根据b值/c值/style_config值，返回对应的app配置值

* 参数说明：

Object：config配置对象（可选）

* 示例代码：

```javascript
    import config from '@/Framework/Config'

    let style = config.getStyle()
    console.log(style)  //根据当前config返回配置信息
```
