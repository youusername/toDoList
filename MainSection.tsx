import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  SectionList,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import IconCheckBox from './IconCheckBox';
import TodoItem, {TodoCheckBoxProps} from './TodoItem';
import EditModal from './EditModal';
import {observable} from 'mobx';
import AppState, {Todo} from './appstate';
import {
  NavigationContainer,
  NavigationScreenProp,
  ScrollView,
} from 'react-navigation';

const initialState = [];
const subTodo: Todo = {
  id: 12,
  text: 'subTodo test',
  CheckBoxState: false,
  favoritesState: false,
};

for (var i = 0; i < 5; i++) {
  initialState.push({
    text: 'Item' + (i + 1),
    id: i,
    CheckBoxState: Boolean(i % 2),
    favoritesState: !Boolean(i % 2),
    subTodos: i === 4 ? [subTodo] : [],
  });
}

const store = new AppState(initialState);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#806B33',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    // marginVertical: 8,
    flexDirection: 'row',
    borderRadius: 5,
    // margin: 5,
    marginTop: 2.5,
    marginBottom: 0,
    marginLeft: 5,
    marginRight: 5,
  },

  header: {
    fontSize: 32,
    color: '#fff',
    backgroundColor: '#4b5bb3',
  },
  safeArea: {
    backgroundColor: '#4b5bb3',
    flex: 1,
  },
  addTouchable: {
    // backgroundColor: '#fff',
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  addTouchableText: {
    fontSize: 50,
    alignContent: 'center',
    justifyContent: 'center',
    color: 'blue',
  },
});

const TodoList = observer((par: TodoCheckBoxProps) => (
  <>
    <View style={styles.item}>
      {/* {console.log("MainSection.TodoList todo:"+JSON.stringify(par.todo, null, 2))} */}
      <TodoItem
        todo={par.todo}
        store={par.store}
        onLongPress={par.onLongPress}
        onPress={par.onPress}
      />
    </View>
  </>
));
type Navigation = NavigationScreenProp<void>;

export interface Props {
  navigation: Navigation;
}
@observer
class MainSection extends Component<Props> {
  static navigationOptions = {
    title: 'Home1111111',
    headerBackTitle: '首页', //设置返回此页面的返回按钮文案，有长度限制
    header: null,
  };

  @observable selectedItemId = -1;
  @observable selectedSubItemId = -1;
  @observable modalVisible = false;

  constructor(props: Props) {
    super(props);
  }

  openEditModal = () => {
    this.selectedItemId = -1;
    this.modalVisible = true;
  };
  closeEditModal = () => {
    this.selectedItemId = -1;
    this.modalVisible = false;
  };
  onRequestClose = () => {
    this.closeEditModal();
  };
  handleLongPress = (id: number) => {
    // Alert.alert(`CheckBox is now '}`+newState);
    console.log('MainSection handleLongPress id:', id);
    this.selectedItemId = id;
    this.modalVisible = true;
  };

  render() {
    const {navigation} = this.props;
    console.log('MainSection.render:');

    // console.log("MainSection.store:"+store);
    const visibleSectionList = store.visibleSectionListTodos;
    return (
      <SafeAreaView style={styles.safeArea}>
        <>
          <ScrollView>
            {visibleSectionList.map((section) =>
              section.data.map((item) => (
                <TodoList
                  key={item.id}
                  todo={item}
                  store={store}
                  onLongPress={(id: number) => {
                    this.handleLongPress(id);
                  }}
                  onPress={(id: number) => {
                    navigation.navigate('Page1', {store: store, id: id});
                  }}
                />
              )),
            )}
            <TouchableOpacity
              style={[styles.addTouchable]}
              onPress={() => {
                console.log('MainSection IconCheckBox onPress');
                this.openEditModal();
              }}
              activeOpacity={1}>
              <Text style={styles.addTouchableText}>{'➕'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </>

        <EditModal
          modalVisible={this.modalVisible}
          isDetails={false}
          itemID={this.selectedItemId}
          itemSubID={this.selectedSubItemId}
          store={store}
          onRequestClose={() => {
            this.onRequestClose();
          }}
        />
      </SafeAreaView>
    );
  }
}

export default MainSection;
