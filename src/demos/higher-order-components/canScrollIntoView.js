import React from "react";

export default function canScrollIntoView(WrappedComponent) {
  class EnhancedComponent extends React.PureComponent {
    scrollIntoView = smooth => {
      this.wrapperDivRef.current.scrollIntoView({
        block: "start",
        behavior: smooth ? "smooth" : "auto"
      });
    };

    wrapperDivRef = React.createRef();

    render() {
      return (
        <div ref={this.wrapperDivRef}>
          <WrappedComponent
            {...this.props}
            scrollIntoView={this.scrollIntoView}
          />
        </div>
      );
    }
  }

  const name = WrappedComponent.displayName || WrappedComponent.name;
  EnhancedComponent.displayName = `canScrollIntoView(${name})`;

  return EnhancedComponent;
}

class Demo extends React.PureComponent {
  handleClick = () => {
    this.props.scrollIntoView();
  };

  render() {
    return (
      <div>
        <p>A really super long paragraph that you really need to scroll to.</p>
        <button onClick={this.handleClick}>Scroll to Top</button>
      </div>
    );
  }
}

export const Demo = canScrollIntoView(Demo);
