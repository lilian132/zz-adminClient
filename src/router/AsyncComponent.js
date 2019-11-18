import React from 'react'
// import { connect } from "react-redux";
// import { withStore } from "retalk";

const defaultRoute = {
  acquisition: true,
  back: true,
  needLogin: false,
}

export default (loadComponent, config) => class AsyncComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Component: null,
      isLoaded: false,
    };
    this.unmount = false;
    this.config = Object.assign({}, defaultRoute, config);
  }

  componentWillMount() {
    // Toast.loading()
    const _this = this;
    Promise.all([loadComponent()])
      .then(modules => modules.map(m => m.default)) // 兼容 module.default ? module.default : module
      .then(([Component]) => {
        // Toast.hide()
        this.setState({
          Component,
          isLoaded: true
        });       
       
      })
      .catch((err) => {
        console.error(`<AsyncComponent />fail  ${err}`);
        throw err;
      });    
  }

  componentDidUpdate() {
    
  }
  componentWillUnmount() {
    this.unmount = true;
  }

  render() {
    const { Component, isLoaded } = this.state;
    if (!isLoaded) {
      return null

    }
    return <Component {...this.props} />;
  }
}