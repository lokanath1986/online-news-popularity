import React, { Component } from 'react';
import Head from "../containers/Head";
import Main from "../containers/Main";


class App extends Component {
  render() {
    return (
        <div className="container">
        <Head/>
        <Main/>
        </div>
    );
  }
}

export default App;
