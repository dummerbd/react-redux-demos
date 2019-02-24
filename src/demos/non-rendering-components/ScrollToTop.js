import React from "react";

export default class ScrollToTop extends React.PureComponent {
  componentDidMount() {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    return null;
  }
}
