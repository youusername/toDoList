import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { SectionList, View, SafeAreaView,StyleSheet,Text,Alert } from 'react-native'
import IconCheckBox from './IconCheckBox';
// import cellDataModel from './tools/cellDataModel'
import TodoItem from './TodoItem';
import EditModal from './EditModal';

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

const TodoList = observer((par:any) => (
  
    <>

    <View style={styles.item}>
      {/* {console.log("MainSection.TodoList todo:"+JSON.stringify(par.todo, null, 2))} */}
      {/* {console.log("MainSection.TodoList store:"+JSON.stringify(par.store, null, 2))} */}
      <TodoItem todo={par.todo} store={par.store}/>

      {/* {par.store.visibleTodos.map((todo: any) =>
      <TodoItem todo={todo} store={par.store} />
    )} */}
      
    </View>
    </>
  ));

@observer
class MainSection extends Component<any,any> {
  editModalRef: React.RefObject<EditModal>
  constructor(props: any) {
    super(props);
    this.editModalRef = React.createRef();
  }

  openEditModal = () => {
    this.editModalRef.current?.openModal();
  };
  closeEditModal = () => {
    this.editModalRef.current?.closeModal();
  };


  handleCheckBoxToggle = (_:any) => {
    // Alert.alert(`CheckBox is now '}`+newState);
    console.log('1234');

  };
  handleConfirm = (text:any, isChecked:any) => {
    console.log('Text:', text);
    console.log('Checked:', isChecked);
  };
  static propTypes: { store: PropTypes.Validator<object>; };

  render() {
    console.log("MainSection.render");
    const { store } = this.props;
    // console.log("MainSection.store:"+store);
    // console.log("MainSection.storeVisibleTodos:"+store.visibleTodos);
    // console.log("MainSection.storeVisibleTodos:"+JSON.stringify(store.visibleTodos, null, 2));
 
    // {console.log("MainSection.render store:"+JSON.stringify(store, null, 2))}
    return (
      
        <SafeAreaView style={styles.safeArea}>

          {/* <TodoList store={store} /> */}

          <SectionList
            sections={store.visibleSectionListTodos()}

            keyExtractor={(item, index) => (item.text + index)}
            
            renderItem={({item}) => (<TodoList todo={item} store={store}/>) }

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

            <IconCheckBox checkOn='➕' checkOff='➕' size={55} onPress={() =>{

              console.log('handle AddData')
              this.openEditModal()
              // store.addTodo('new todo')

            }} />
            {/* <View style={styles.container}> */}
              <EditModal ref={this.editModalRef} onConfirm = {() =>this.handleConfirm} />
            {/* </View> */}
          </SafeAreaView>
          
    )
  }
}

MainSection.propTypes = {
  store: PropTypes.object.isRequired,
}

export default MainSection


