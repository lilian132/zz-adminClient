import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'; // 是处理模块重新加载以及错误处理的组件。应用程序的根组件应该作为子组件嵌套在AppContainer中。在生产环境中，AppContainer自动禁用，只返回其子组件。具体使用代码如下：
import './FrameworkCustomize';
import App from './router';
import configureStore from '@/redux/configureStore';
import '@/css/index.js'; // 全局引入css

let store = configureStore();
const render = Component => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>    
  </AppContainer>,
  document.getElementById('root'),
);

render(App);

if (module && module.hot) {
  module.hot.accept();
}