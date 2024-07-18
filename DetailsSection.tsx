import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import FavoritesCheckBox from './IconCheckBox';
import DetailsItem from './DetailsItem';
import AppState, {todo} from './appstate';
import {NavigationScreenProp} from 'react-navigation';

type Navigation = NavigationScreenProp<void>;

export interface Props {
  navigation: Navigation;
}
@observer
export default class DetailsSection extends React.Component<Props> {
  render() {
    const {navigation} = this.props;
    const {state, setParams} = navigation;
    const {params} = state;
    console.log(
      'DetailsSection render params:' + JSON.stringify(params, null, 2),
    );

    const toDoCheckBoxChecked = false;
    const store = navigation.getParam('store');
    const todo: todo = store.findTodo(navigation.getParam('id'));
    const favoritesState = false;

    const testSubTodo: todo = {
      id: 12,
      text: 'DetailsSection test',
      CheckBoxState: false,
      favoritesState: false,
    };
    let flatListData = ['testTodo'];
    flatListData.push('add');
    // console.log('DetailsSection flatListData:' + flatListData);
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.checkBoxContainer,
              toDoCheckBoxChecked && styles.checkBoxChecked,
            ]}
            onPress={() =>
              this.setState({checkBoxChecked: !toDoCheckBoxChecked})
            }></TouchableOpacity>
          <Text style={styles.header}>{todo.text}</Text>
          <FavoritesCheckBox
            checkOn="★"
            checkOff="☆"
            stateChecked={favoritesState}
            size={30}
            onPress={() => {}}
          />
        </View>
        <View style={styles.flatList}>
          <FlatList
            data={flatListData} // Split description into lines
            // renderItem={({item}) => <Text style={styles.subItem}>{item}</Text>}
            renderItem={({item}) =>
              item !== 'add' ? (
                <DetailsItem
                  todo={testSubTodo}
                  store={store}
                  onLongPress={(id: number) => {}}
                />
              ) : (
                <TouchableOpacity
                  style={styles.addsubItemTouchable}
                  onPress={() => {
                    console.log('DetailsSection onLongPress add');
                  }}
                  activeOpacity={1}>
                  <Text style={[styles.addSubItem]}>{'+ 下一步'}</Text>
                </TouchableOpacity>
              )
            }
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => {
              return (
                // react-native/no-inline-styles
                <View style={styles.itemSeparator} />
              );
            }}
          />
          {/* <Text style={styles.footer}>Next Step</Text> */}
        </View>
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
    flex: 1,
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
    marginLeft: 25,
    marginRight: 5,
  },
  addSubItem: {
    backgroundColor: '#fff',
    padding: 10,
    color: 'blue',
    fontSize: 25,
    // flexDirection: 'row',
    // borderRadius: 5,
    // margin: 5,
    // marginTop: 2.5,
    // marginBottom: 0,
    // marginLeft: 25,
    // marginRight: 5,
  },
});
