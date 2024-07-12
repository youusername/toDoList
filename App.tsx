import React, { Component } from 'react'
import MainSection from './MainSection';
import AppState from './appstate';


const initialState = []

for (var i = 0; i < 5; i++) {
  initialState.push({
    text: 'Item' + (i+1),
    id: i,
    CheckBoxState: Boolean(i%2),
    favoritesState: !Boolean(i%2),
  });

}

const store = new AppState(initialState);

class App extends Component {
  render() {
    console.log("App.render");
    return (
      <MainSection store= {store}/>
      
    );
  }
}

export default App;