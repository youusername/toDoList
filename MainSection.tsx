import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { SectionList, View, SafeAreaView,StyleSheet,Text,Alert } from 'react-native'
import IconCheckBox from './IconCheckBox';
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
      <TodoItem todo={par.todo} store={par.store} onLongPress={par.onLongPress}/>
      
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


  handleLongPress = (id:number) => {
    // Alert.alert(`CheckBox is now '}`+newState);
    console.log('MainSection handleLongPress id:',id);
    this.editModalRef.current?.openModalFromID(id);

  };

  static propTypes: { store: PropTypes.Validator<object>; };

  render() {
    console.log("MainSection.render");
    const { store } = this.props;
    // console.log("MainSection.store:"+store);

    return (
      
        <SafeAreaView style={styles.safeArea}>

          {/* <TodoList store={store} /> */}

          <SectionList
            sections={store.visibleSectionListTodos()}

            keyExtractor={(item, index) => (item.text + index)}
            
            renderItem={({item}) => (<TodoList todo={item} store={store} onLongPress={(id:number)=>{this.handleLongPress(id)}}/>) }

            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.header}>{title}</Text>
            )}

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

            <IconCheckBox checkOn='➕' checkOff='➕' stateChecked={false} todo={null} size={55} onPress={() =>{

              console.log('MainSection IconCheckBox onPress')
              this.openEditModal()
              
              // store.addTodo('new todo')
            }} />
            
            <EditModal ref={this.editModalRef} store={store}/>
            
          </SafeAreaView>
          
    )
  }
}

MainSection.propTypes = {
  store: PropTypes.object.isRequired,
}

export default MainSection


