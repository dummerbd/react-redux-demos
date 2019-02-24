import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import createRemoteData from "../redux-modules/createRemoteData";

const fetchExampleData = id => fetch(`/api/my-data/${id}`).then(r => r.json());

const exampleRemoteData = createRemoteData({
  name: "example",
  asyncRequest: fetchExampleData
});

const mapStateToProps = state => {
  const { isLoading, data } = exampleRemoteData.select(state);

  return { isLoading, loadedId: data ? data.id : null };
};

const mapDispatchToProps = { requestData: exampleRemoteData.requestData };

class DataPreloader extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    loadedId: PropTypes.string,
    currentId: PropTypes.string,
    requestData: PropTypes.func
  };

  maybeLoad() {
    if (!this.props.isLoading && this.props.loadedId !== this.props.currentId) {
      this.props.requestData(this.props.currentId);
    }
  }

  componentDidMount() {
    this.maybeLoad();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.maybeLoad();
  }

  render() {
    return null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPreloader);
