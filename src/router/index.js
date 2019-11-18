/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom';
import { Route, HashRouter, Switch } from 'react-router-dom';
import getAsyncComponent from './getAsyncComponent.js';
import routeConfigs from './Config';
import Main from '@/views/Layouts/main';

// 404
const NoMatch = () => (
  <div>router not found</div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upVer: false,
    }
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    return (
      <HashRouter>
        <Route render={({ location }) => {
          return (
            <Main>
              <Switch>
                <Route location={location} exact path="/" component={getAsyncComponent(routeConfigs[0].import, routeConfigs[0])} />
                {
                  routeConfigs.map((item, index) => {                   
                    return <Route key={index} exact path={item.path} location={location} component={getAsyncComponent(item.import, item)} />
                  })
                }
                <Route component={NoMatch} />
              </Switch>              
            </Main>
          )
        }} />
      </HashRouter>
    );
  }
}

export default App;
