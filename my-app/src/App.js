import React from "react";
import StationList from "../src/components/Station";
import Station from "../src/components/Channels/index";
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header>
          <h1>Sverige Radio Stations</h1>
        </header>
        <Station />
      </div>
    );
  }
}

export default App;
