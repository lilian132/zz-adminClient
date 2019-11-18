/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const connectReact =  (component, actions, mapStateToProps = null, mapDispatchToProps = null) => {
  mapStateToProps = mapStateToProps || function (state) {
    return state;
  };

  mapDispatchToProps = mapDispatchToProps || (actions ? function (dispatch) {
      return { action: bindActionCreators(actions, dispatch) };
  } : null);

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component)
};

export default connectReact;
