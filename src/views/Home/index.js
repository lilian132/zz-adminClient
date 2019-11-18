import Demo from './components/demo';
import { getErrorData } from './data';
import './index.inline.less';

class HomeIndex extends Component {

  state = {
    errorData: null,
  };

  componentDidMount() {  
    getErrorData().then(data => {
      this.setState({
        errorData: data.stateData,
      });
    });
  }

  render() {
    const { errorData } = this.state;
    return (
      <div className="acv-home">
        <Demo dataSource={errorData}/>
      </div>
    )
  }
}

export default HomeIndex;
