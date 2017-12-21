import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <span>Hello world</span>
    )
  }
}

const appDom = document.getElementById('app')

ReactDOM.render(<App/>, appDom);