import {AsyncStorage} from 'react-native'

export const TODO_STORAGE_KEY_PREFIX = "@todo"

export default class Storage {

    static addToDo(data) {
      console.debug("Adding todo: "+JSON.stringify(data))  

      if(!data.id) data.id= this.guid()

	  return AsyncStorage.setItem(`${TODO_STORAGE_KEY_PREFIX}:${data.id}`, JSON.stringify(data));
	}

    static getToDos(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getAllKeys((err, keys) => {
                 if(err){
                     reject(err)
                     return
                 }

                 AsyncStorage.multiGet(keys, (err, stores) => {
                        if(err){
                            reject(err)
                            return
                        }
                        let result = stores.map((result, i, store) => ({key: store[i][0], value: JSON.parse(store[i][1])}))
                        
                        resolve(result);
                });
            });
        })
        
    }

    static clear(){
        AsyncStorage.clear()
    }


    static guid() {
        s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }
}