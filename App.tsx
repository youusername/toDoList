import React, {Component} from 'react';
import MainSection from './MainSection';
import AppState from './appstate';
import {View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import DetailsSection from './DetailsSection';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: MainSection,
      navigationOptions: {
        title: 'ToDoList22',
        headerTitle: 'ToDoList111',
      },
    },
    Page1: {
      screen: DetailsSection,
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
