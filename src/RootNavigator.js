/* @flow */

import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction,
} from 'react-native-paper';


import TODOList from './TODOList'
import TODOForm from './TODOForm'

const components = {
    'TODOForm': TODOForm
}

const routes = Object.keys(components)
        .map(id => ({id, item: components[id]}) )
        .reduce((acc, {id, item}) => {
          const Comp = item

          const Screen = props => <Comp {...props} />;   

          Screen.navigationOptions = props => ({
            header: (
              <Toolbar>
                <ToolbarBackAction onPress={() => props.navigation.goBack()} />
                <ToolbarContent title={(Comp: any).title} />
              </Toolbar>
            ),
            ...(typeof Comp.navigationOptions === 'function'
              ? Comp.navigationOptions(props)
              : Comp.navigationOptions),
          });

          return {
              ...acc,
              [id]: { screen: Screen },
          };
        }, {})

export default createStackNavigator(
  {
    home: { screen: TODOList },
    ...routes
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: (
        <Toolbar>
          <ToolbarContent title={TODOList.title} />
        </Toolbar>
      ),
    }),
  }
);
