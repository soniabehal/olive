import React from "react";
import ListView from "../components/ListView/ListView";
import MapView from "../components/MapView/MapView";
import "./App.css";

class App extends React.PureComponent {
  state = {
    searchList: [],
    selected: false,
    isToggled: false,
  }

  setSearchList = (list) => {
    this.setState({
      searchList: list,
    })
  }

  toggle = () => {
    const selected = this.state.selected;
    this.setState({
      selected: !selected,
      isToggled: true,
    })
  }

  render() {
    return (
      <div className="App">
        {(!this.state.selected || !this.state.isToggled) && <ListView places={this.state.searchList} />}
        <MapView 
        setSearchList={this.setSearchList} 
        selected={this.state.selected} 
        toggle={this.toggle} 
        />
      </div>
    );
  }
}

export default App;