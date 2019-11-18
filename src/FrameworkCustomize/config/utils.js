function setConfigByUserAgent(baseConfig) {
  const { style_config, b, c } = baseConfig;
  // 优先通过userAgent确定style
  const key = navigator.userAgent.split(' ').pop(); 
  for (let i = 0; i < style_config.length; i++) {
    const item = style_config[i];
    if (item.userAgent && item.userAgent == key) {
      baseConfig.b = item.b;
      baseConfig.c = item.c;
      baseConfig.style = item;
      return baseConfig;
    }
  }
  // 其次通过b,c确定style
  if (b && c) {
    for (let i = 0; i < style_config.length; i++) {
      const item = style_config[i];
      if (item.b == b && item.c == c) {
        baseConfig.b = item.b;
        baseConfig.c = item.c;
        baseConfig.style = item;
        return baseConfig;
      }
    }
  }
  return baseConfig;
}

export default setConfigByUserAgent;
