import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import RootNavigator from './src/RootNavigator'
import TODOList from './src/TODOList'


const App = createDrawerNavigator(
  { Home:  RootNavigator }
);

export default App;