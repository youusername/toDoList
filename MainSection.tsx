import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  SectionList,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import IconCheckBox from './IconCheckBox';
import TodoItem from './TodoItem';
import EditModal from './EditModal';
import {observable} from 'mobx';
import AppState from './appstate';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#806B33',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    // marginVertical: 8,
    flexDirection: 'row',
  },

  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  safeArea: {
    backgroundColor: '#4b5bb3',
    flex: 1,
  },
});

const TodoList = observer((par: any) => (
  <>
    <View style={styles.item}>
      {/* {console.log("MainSection.TodoList todo:"+JSON.stringify(par.todo, null, 2))} */}
      <TodoItem
        todo={par.todo}
        store={par.store}
        onLongPress={par.onLongPress}
      />
    </View>
  </>
));

interface MainSectionProps {
  store: AppState;
}

@observer
class MainSection extends Component<MainSectionProps> {
  @observable selectedItemId = -1;
  @observable modalVisible = false;

  constructor(props: any) {
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
    console.log('MainSection.render');
    const {store} = this.props;
    // console.log("MainSection.store:"+store);

    return (
      <SafeAreaView style={styles.safeArea}>
        <SectionList
          sections={store.visibleSectionListTodos()}
          keyExtractor={(item, index) => item.text + index}
          renderItem={({item}) => (
            <TodoList
              todo={item}
              store={store}
              onLongPress={(id: number) => {
                this.handleLongPress(id);
              }}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
          ItemSeparatorComponent={() => {
            return (
              // react-native/no-inline-styles
              <View style={{borderBottomWidth: 1, borderBottomColor: 'red'}} />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <Text style={{fontSize: 30, textAlign: 'center', color: '#ffff'}}>
                ToDoList
              </Text>
            );
          }}
        />

        <IconCheckBox
          checkOn="➕"
          checkOff="➕"
          stateChecked={false}
          size={55}
          onPress={() => {
            console.log('MainSection IconCheckBox onPress');
            this.openEditModal();
          }}
        />

        <EditModal
          modalVisible={this.modalVisible}
          itemID={this.selectedItemId}
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
