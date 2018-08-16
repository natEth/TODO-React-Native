import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet } from 'react-native'
import {FAB, FABGroup, Colors} from 'react-native-paper'

import Storage from './Storage'

export default class TODOList extends React.Component {

    static title = "TODOs"

    state = {
        data: null,
        open: false
    }

    _renderItem = (data) => {
        console.log(`DATA: ${JSON.stringify(data)}`)

        return <View style={styles.listItem}><Text>{data.item.value.title}</Text></View>
    }

    _addItem = () => {
        return this.props.navigation.navigate('TODOForm')
    }

    componentDidMount(){

       Storage.getToDos().then(data => {
           this.setState({data: data})
       }).catch(err=> console.error(err))

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

  listItem: {
    flexDirection: "row",
    height: 40,
    borderBottomWidth: 2,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#AAAAAA"
    
  }
});

