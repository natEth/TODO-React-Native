import React from 'react'
import {View, Text, StyleSheet, AsyncStorage, TextInput as NativeTextInput} from 'react-native'
import {TextInput, Colors, FAB, FABGroup} from 'react-native-paper'

import Storage from './Storage'

const INITIAL_STATE = {}

export default class TODOForm extends React.Component {

    static title = "Create TODO"
    
    state = INITIAL_STATE

    constructor(props){
        super(props)

       const { navigation } = this.props;

        console.log('Constructor called....')
        console.log(`params ${navigation.getParam('todo', {})}.`)
        const todo = navigation.getParam('todo', {title: '', text: ''}) 
        console.log(`params ${JSON.stringify(todo)}.`)
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