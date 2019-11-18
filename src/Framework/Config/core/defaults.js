const defaults = {
    //环境变量 pro  test  dev
    env: 'pro', 
    //b值配置
    b : '',
    //c值配置
    c : '',   
    /*
    * 不同b值和c值对应不同马甲/共贷包，对应有不同的配置;可以在config中增加其它配置
    * name 项目名 用在代码或域名中
    * fmtName 格式化名字 显示在界面中的名字
    * acq 大数据上报配置
    * encrypt ajax加密配置
    * onlinePlanId 在线客服配置id
    */
    style_config : [        
    ],
    //接口url地址
    base_url: '',
    //数据上报url地址
    acq_url: "",
    h5appver:'1.0.0',//H5版本
}

export default defaults