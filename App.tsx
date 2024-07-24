import React, {Component} from 'react';
import MainSection from './MainSection';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DetailsSection from './DetailsSection';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: MainSection,
    },
    Page1: {
      screen: DetailsSection,
      navigationOptions: {
        headerStyle: {
          // backgroundColor: '#f4511e',
          height: 34 + 47,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    console.log('App.render');
    return <AppContainer />;
  }
}

// export default App;
