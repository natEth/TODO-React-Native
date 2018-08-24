import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import RootNavigator from './src/RootNavigator'
import TODOList from './src/TODOList'
import Storage from './src/Storage'


const App = createDrawerNavigator(
  { Home:  RootNavigator }
);

//Storage.clear()

export default App;