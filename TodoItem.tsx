import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import IconCheckBox from './IconCheckBox';
import FavoritesCheckBox from './IconCheckBox';
import AppState, {todo} from 'appstate';

interface IconCheckBoxProps {
  todo: todo;
  store: AppState;
  onLongPress: (id: number) => void;
  onPress: (id: number) => void;
  subTitleVisible?: boolean;
}

@observer
class TodoItem extends Component<IconCheckBoxProps> {
  constructor(props: any) {
    super(props);
  }

  getSubTitle = (todo: todo) => {
    const subTodos: todo[] = todo.subTodos!;
    if (subTodos.length === 0) {
      return '';
    }

    let inProgressCount: number = 0;

    subTodos.forEach((subtodo: any) => {
      console.log(todo);
      if (subtodo.CheckBoxState) {
        inProgressCount += 1;
      }
    });

    return '第' + inProgressCount + '步,共' + subTodos.length + '步';
  };

  render() {
    const {
      todo,
      store,
      onLongPress,
      onPress,
      subTitleVisible = true,
    } = this.props;
    // console.log("TodoItem render:"+todo.id +"  CheckBoxState:"+todo.CheckBoxState);
    console.log('TodoItem render');

    return (
      console.log('TodoItem.render.return'),
      (
        <View style={styles.container}>
          <IconCheckBox
            checkOn="●"
            checkOff="◯"
            stateChecked={todo.CheckBoxState}
            onPress={() => store.completeTodo(todo.id)}
            size={30}
          />

          <TouchableOpacity
            style={[styles.title]}
            onLongPress={() => {
              // onLongPress(todo.id);
            }}
            onPress={() => {
              onPress(todo.id);
            }}
            activeOpacity={1}>
            <Text
              style={[
                styles.title,
                todo.CheckBoxState && subTitleVisible
                  ? styles.strikethroughText
                  : {},
              ]}>
              {todo.text}
            </Text>
            {todo.subTodos?.length && subTitleVisible ? (
              <Text>{this.getSubTitle(todo)}</Text>
            ) : (
              <></>
            )}
          </TouchableOpacity>
          <FavoritesCheckBox
            checkOn="★"
            checkOff="☆"
            stateChecked={todo.favoritesState}
            size={30}
            onPress={() => store.favoritesTodo(todo.id)}
          />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Avenir',
    backgroundColor: '#fff',
    alignContent: 'center',
    flex: 3,
    // margin:5,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    // fontSize: 20,
    color: '#000',
  },
});

export default TodoItem;
