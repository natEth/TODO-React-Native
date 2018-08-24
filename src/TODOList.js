import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet } from 'react-native'
import {FAB, FABGroup, Colors, Checkbox} from 'react-native-paper'

import Storage from './Storage'


const NEW_TODO = {
            title: '',
            text: '',
            done: false
        }

export default class TODOList extends React.Component {

    static title = "TODOs"

    state = {
        data: null,
        open: false
    }

    _editTodo = (id) => {
        let todoToEdit = this.state.data.find(todo => todo.key === id)
        
        console.debug(`todo to edit id: ${id} data: ${todoToEdit} `)
        
        return this.props.navigation.navigate('TODOForm', {refresh: this._loadToDos, todo: todoToEdit})
    }

    _toggleDone = (id) => {
        console.debug(`id is ${id}`)

        let newData = []
        
        this.state.data.forEach( (todo) => {                            
               
               if(todo.key === id){
                  todo.value.done = !todo.value.done
               }

               newData.push(todo)
        })

        this.setState(Object.assign({}, this.state, {data: newData}))
    }

    _renderItem = (data) => {
        console.debug(`dobe data: ${data.item.value.done}`)
        let checked = data.item.value.done === true

        return <View style={styles.listItem}>                        
                 <View>
                     <Checkbox checked={checked} onPress={() => this._toggleDone(data.item.key) } />
                 </View>    
                 <View style={styles.checkBoxText}>
                    <Text onPress={() => this._editTodo(data.item.key) } style={[styles.textStyle, (checked ? {textDecorationLine: 'line-through'}: {})]}>{data.item.value.title}</Text> 
                 </View>
               </View>
    }

    _addItem = () => {
        return this.props.navigation.navigate('TODOForm', {refresh: this._loadToDos, todo: NEW_TODO})
    }

    _loadToDos = () => {
        this.setState({data: null})

        Storage.getToDos().then(data => {
           this.setState({data: data})
       }).catch(err=> console.error(err))
    }

    componentDidMount(){
       this._loadToDos()
    }

    render(){
        let content = null;         
    

        if(this.state.data){
            content = <FlatList data={this.state.data} renderItem={this._renderItem} />
        }

        return (
            <View style={styles.container}>    
               {content}
               <View pointerEvents="box-none" style={styles.fabContainer}>
                    <FAB style={styles.fab} small icon="add"  onPress={this._addItem} />                                
               </View>     
            </View>)
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    padding: 4,
  },

  fabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  fab: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 0,
  },

  textStyle: {
    
  },
  checkBoxText: {
      flex: 1,
      justifyContent: 'center'
  },
  listItem: {
    flexDirection: "row",
    height: 40,
    borderBottomWidth: 2,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#AAAAAA"
    
  }
});

