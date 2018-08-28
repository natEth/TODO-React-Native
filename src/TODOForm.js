import React from 'react'
import {View, Text, StyleSheet, AsyncStorage, TextInput as NativeTextInput} from 'react-native'
import {TextInput, Colors, FAB, FABGroup} from 'react-native-paper'
import {Toolbar, ToolbarContent, ToolbarAction, ToolbarBackAction} from 'react-native-paper'

import Storage from './Storage'

const INITIAL_STATE = {}

export default class TODOForm extends React.Component {

    state = INITIAL_STATE

    static navigationOptions = ({navigation}) => {
        console.log(`nav state ${JSON.stringify(navigation.state)}`)
        return {
            header: (
              <Toolbar>
                <ToolbarBackAction onPress={() => navigation.goBack()} />
                <ToolbarContent title={navigation.getParam('title', 'TODO')} />
              </Toolbar>
            )
        };
    }

    constructor(props){
        super(props)
        
       const todo = this.props.navigation.getParam('todo', {title: '', text: ''}) 
         
        this.state = {
            id: todo.key,
            ...todo.value
        }
    }

    _goToHome = () => {
        console.debug('Navigating out of TODO Form')
        this.props.navigation.state.params.refresh();
        this.props.navigation.navigate('home')
    }

    _saveItem = () => {
        console.debug('Saving TODO Form')

        Storage.addToDo(this.state)
                .then(() => this._goToHome())
                .catch(error => console.error('Error occured while saving todo form: '+error));
        
    }

    render(){
        return (
            <View style={styles.container}>
                <View>
                      <TextInput
                            style={styles.input}
                            label='Title'
                            value={this.state.title}
                            onChangeText={title => this.setState({ title })}
                        />
                </View>
                <View>
                         <TextInput
                            style={styles.input}
                            label='Description'
                            multiline={true}
                            numberOfLines={1}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>
                </View>          
                <View style={styles.fabContainer}>
                    <FAB style={styles.fab} small icon="save"  onPress={this._saveItem} />                
                </View>     
            </View>
        )
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    padding: 4,
  },

  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  fabContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  fab: {
    margin: 8,
    marginRight: 1
  }
});