import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import TODOList from './src/TODOList'
import TODOForm from './src/TODOForm'

const App = createStackNavigator(
  {
    home: { screen: TODOList },
    TODOForm: {screen: TODOForm}
  }
);

// const App = createDrawerNavigator(
//   {
//     home: { screen: TODOList },
//     TODOForm: {screen: TODOForm}
//   }
// );

// const App = createDrawerNavigator(
//   { 'ALL':  TODOList },
//   { 'DONE': TODOList},
//   { 'TODO':  TODOList}
// );


//import Storage from './src/Storage'
//Storage.clear()

export default App;