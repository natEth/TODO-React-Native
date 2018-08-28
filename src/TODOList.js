import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, Button } from 'react-native'
import {FAB, FABGroup, Colors, Checkbox} from 'react-native-paper'
import {Toolbar, ToolbarContent, ToolbarAction} from 'react-native-paper'
import {DrawerSection, DrawerItem} from 'react-native-paper'
import {BottomNavigation} from 'react-native-paper'

import Storage from './Storage'


const NEW_TODO = {
            title: '',
            text: '',
            done: false
        }

export default class TODOList extends React.Component {

    static navigationOptions = ({ navigation }) => {
       const { params = {
            handleFilter: () => { /* */ },
            title: 'TODOs'
        } } = navigation.state

        return  {
            header: (
                <Toolbar>
                    <ToolbarContent title={params.title} />
                    <ToolbarAction icon="filter-list" onPress={params.handleFilter} />
                </Toolbar>
            ),
        }
    }


    state = {
        data: [],
        showFilter: false,
        activeFilter: 'TODO'
    }

    
    _editTodo = (id) => {
        let todoToEdit = this.state.data.find(todo => todo.key === id)
        
        console.debug(`todo to edit id: ${id} data: ${todoToEdit} `)
        
        return this.props.navigation.navigate('TODOForm', {refresh: this._loadToDos, todo: todoToEdit, title: 'EDIT TODO'})
    }

    _toggleDone = (id) => {
        console.debug(`id is ${id}`)
        let filter = this.state.activeFilter
        let newData = []
        
        this.state.data.forEach( (todo) => {                            
               
               if(todo.key === id){
                  todo.value.done = !todo.value.done
                
                  //save todo
                  Storage.addToDo({id: todo.key, ...todo.value})
               }


                if(filter == 'ALL'){
                    newData.push(todo)

                } else if(filter == 'DONE'){
                    if(todo.value.done)
                        newData.push(todo)

                } else {
                    if(!todo.value.done)
                        newData.push(todo)
                } 
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
        return this.props.navigation.navigate('TODOForm', {refresh: this._loadToDos, todo: NEW_TODO, title: 'CREATE TODO'})
    }

    _loadToDos = (filter = 'TODO') => {
        this.setState({data: null, activeFilter: filter})

        Storage.getToDos().then(data => {
           
           let filteredData 
           
           if(filter == 'ALL'){
                filteredData  = data
           } else if(filter == 'DONE'){
                filteredData  = data.filter(d => (d.value.done == true))
           } else {
                filteredData  = data.filter(d => (d.value.done != true))
           }

           this.setState({data: filteredData, showFilter: false})
           this._setTitle(filter)

       }).catch(err=> console.error(err))

    }

    _handleFilter = () => {
        console.debug("Filter button  clicked")
        this.setState({showFilter: !this.state.showFilter})
    }

    _setTitle = (title) => {
        this.props.navigation.setParams({title: title})
    }

    componentDidMount(){
       this.props.navigation.setParams({handleFilter: this._handleFilter });
       this._loadToDos('TODO')
    }

    render(){
        let content, drawer = null;         


        if(this.state.data){
            content = <FlatList data={this.state.data} renderItem={this._renderItem} />
        }

        if(this.state.showFilter){
            drawer = <View style={styles.sideBar}>
                        <DrawerItem
                        label="TODO"
                        active={this.state.activeFilter === 'TODO'}
                        onPress={() => {this._loadToDos('TODO')}}
                    />

                    <DrawerItem
                        label="DONE"
                        active={this.state.activeFilter === 'DONE'}
                        onPress={() => {this._loadToDos('DONE')}}
                    />

                    <DrawerItem
                        label="ALL"
                        active={this.state.activeFilter === 'ALL'}
                        onPress={() => {this._loadToDos('ALL')}}
                    />
                 
            </View>
        }

        return (
            <View style={styles.container}>  
               {content}
               
               {drawer}

               <View pointerEvents="box-none" style={styles.fabContainer}>
                    <FAB style={styles.fab} small icon="add"  onPress={this._addItem} />                                
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
  sideBar: {
    position: 'absolute', 
    right:0, 
    backgroundColor: 'white',
    marginBottom: 0
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

