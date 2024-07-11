import React, { Component } from 'react'

// import cellDataModel from './tools/cellDataModel'
import MainSection from './MainSection';
import { Provider, observer } from 'mobx-react';
import AppState from './appstate';


const initialState = []

for (var i = 0; i < 5; i++) {
  initialState.push({
    text: 'Item' + (i+1),
    id: i+1,
    CheckBoxState: Boolean(i%2),
    favoritesState: !Boolean(i%2),
  });

}

const store = new AppState(initialState);

// export const storesContext = React.createContext({
//   appStore: DATA,
//  });

class App extends Component {
  render() {
    console.log("App.render");
    return (
      // <MainSection store={DATA} />
      <MainSection store= {store}/>
      
    );
  }
}

export default App;