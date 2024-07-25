import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DetailsItem from './DetailsItem';
import AppState, {Todo} from './appstate';
import {NavigationScreenProp} from 'react-navigation';
import TodoItem from './TodoItem';
import EditModal from './EditModal';
import {observable} from 'mobx';

interface NavigationParams {
  id: number;
  store: AppState;
}
type Navigation = NavigationScreenProp<void, NavigationParams>;

export interface Props {
  navigation: Navigation;
}

@observer
export default class DetailsSection extends React.Component<Props> {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: '#f4511e',
      height: 34 + 47,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  @observable selectedItemId = this.props.navigation.getParam('id');
  @observable modalVisible = false;
  @observable selectedSubItemId = -1;

  render() {
    const {navigation} = this.props;
    const {state, setParams} = navigation;
    const {params} = state;
    console.log(
      'DetailsSection render params:' + JSON.stringify(params, null, 2),
    );

    const store: AppState = navigation.getParam('store');
    const todo: Todo = store.findTodo(navigation.getParam('id'))!;

    if (!todo) {
      return;
    }
    const testSubTodo: Todo = {
      id: 999,
      text: '+ 下一步',
      CheckBoxState: false,
      favoritesState: false,
    };
    // console.log(
    //   'DetailsSection subTodos:' + JSON.stringify(todo.subTodos!, null, 2),
    // );

    const flatListData = todo.subTodos!.slice();
    flatListData.push(testSubTodo);

    console.log('DetailsSection flatListData:' + flatListData);
    return (
      <>
        <View style={styles.container}>
          <TodoItem
            todo={todo}
            store={store}
            subTitleVisible={false}
            onLongPress={() => {}}
            onPress={() => {}}
          />
        </View>

        <ScrollView style={styles.flatList}>
          {flatListData.map((subTodo) =>
            subTodo.id !== 999 ? (
              <View key={subTodo.id}>
                <DetailsItem
                  todo={subTodo}
                  superID={this.selectedItemId}
                  store={store}
                  onPress={(id: number) => {
                    this.selectedSubItemId = id;
                    this.modalVisible = true;
                  }}
                />
                <View style={styles.itemSeparator} />
              </View>
            ) : (
              <TouchableOpacity
                key={subTodo.id}
                style={styles.addsubItemTouchable}
                onPress={() => {
                  //下一步
                  console.log('DetailsSection onPress add');
                  this.selectedSubItemId = -1;
                  this.modalVisible = true;
                }}
                activeOpacity={1}>
                <Text style={[styles.addSubItem]}>{subTodo.text}</Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        <EditModal
          modalVisible={this.modalVisible}
          isDetails={true}
          itemID={this.selectedItemId}
          itemSubID={this.selectedSubItemId}
          store={store}
          onRequestClose={() => {
            // this.onRequestClose();
            console.log('DetailsSection onRequestClose');
            this.selectedSubItemId = -1;
            this.modalVisible = false;
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  itemSeparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 55,
    marginRight: 15,
  },
  flatList: {
    // backgroundColor: '#4b5bb3',
    // flex: 1,
  },
  container: {
    // flex: 1,
    // padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 10,
    flex: 3,
  },
  // listItem: {
  //   fontSize: 16,
  //   marginBottom: 5,
  // },
  checkBoxContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'white',
  },
  checkBoxChecked: {
    backgroundColor: 'black',
  },
  addsubItemTouchable: {
    backgroundColor: 'red',
    alignContent: 'center',
    // flex: 3,
    marginBottom: 0,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 5,
  },
  addSubItem: {
    backgroundColor: '#fff',
    // padding: 10,
    color: 'blue',
    fontSize: 25,
  },
});
