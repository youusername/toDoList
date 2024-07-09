import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { SectionList, View, SafeAreaView,StyleSheet,Text,Alert } from 'react-native'
import IconCheckBox from './IconCheckBox';
// import cellDataModel from './tools/cellDataModel'
import TodoItem from './TodoItem';
// import { serializer } from './metro.config';

// const ToggleAll = observer(({ store }) =>
//   <input className="toggle-all"
//     type="checkbox"
//     checked={store.completedCount === store.todos.length}
//     onChange={() => store.completeAll() } />
// )
// const TodoList = observer(({ store }) =>
//   <ul className="todo-list">
//     {store.visibleTodos.map(todo =>
//       <TodoItem key={todo.id} todo={todo} store={store} />
//     )}
//   </ul>
// )
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#806B33",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    // marginVertical: 8,
    flexDirection:'row' ,
  },

  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  safeArea:{
    backgroundColor: '#4b5bb3',
    flex:1,
  },
})

const TodoList = observer(({store_data}:any) => (
  
    <>

    <View style={styles.item}>
      {console.log("MainSection.TodoList:"+store_data)}
      <TodoItem todo={store_data}/>

    {/* {
      store.forEach((todo: any) => {
        console.log("TodoList forEach todo"+todo);
        <TodoItem key={todo.id} todo={todo} store={store} />
      })
    } */}
      
    </View>
    </>
  ));


class MainSection extends Component<any,any> {


  handleCheckBoxToggle = (_:any) => {
    // Alert.alert(`CheckBox is now '}`+newState);
    console.log('1234');

  };

  render() {
    console.log("MainSection.render");
    const { store } = this.props;
    // console.log("MainSection.store:"+store);
    // console.log("MainSection.storeVisibleTodos:"+store.visibleTodos);
    console.log("MainSection.storeVisibleTodos:"+JSON.stringify(store.visibleTodos, null, 2));
    const sectionsTest = [
      {
        title: 'Group 1',
        data: [{
          text: 'Item' ,
          id: 1,
          CheckBoxState: false,
          favoritesState: false,
        }, {
          text: 'Item' ,
          id: 2,
          CheckBoxState: false,
          favoritesState: false,
        }],
      },
      {
        title: 'Group 2',
        data: [{
          text: 'Item' ,
          id: 3,
          CheckBoxState: true,
          favoritesState: false,
        }],
      },
    ];

    return (
      
        <SafeAreaView style={styles.safeArea}>

          {/* <TodoList store={store} /> */}
          
          <SectionList
            sections={store.visibleTodos}

            keyExtractor={(item, index) => item.text + index}
            renderItem={({item}) => (<TodoList store_data={item}/>) }

            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}

            // react/no-unstable-nested-components
            ItemSeparatorComponent={() => {
              // 声明项目之间的分割符
              return (
                // react-native/no-inline-styles
                <View style={{borderBottomWidth: 1, borderBottomColor: 'red'}} />
              );
            }}
            //列表头组件
            ListHeaderComponent={() => {
              return <Text style={{fontSize: 30,textAlign:"center",color:"#ffff"}}>ToDoList</Text>;
            }}

          />

            <IconCheckBox checkOn='➕' checkOff='➕' size={55} onToggle={() =>{

              console.log('handleAddData');
              // store[0].data.push(new cellDataModel('add test',false,false))
            }} />
          </SafeAreaView>
          
    )
  }
}



export default MainSection


