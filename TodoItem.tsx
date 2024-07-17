import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import IconCheckBox from './IconCheckBox';
import FavoritesCheckBox from './IconCheckBox';
import AppState, {todo} from 'appstate';

interface IconCheckBoxProps {
  todo: todo;
  store: AppState;
  onLongPress: (id: number) => void;
}

@observer
class TodoItem extends Component<IconCheckBoxProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {todo, store, onLongPress} = this.props;
    // console.log("TodoItem render:"+todo.id +"  CheckBoxState:"+todo.CheckBoxState);
    console.log('TodoItem render');

    return (
      console.log('TodoItem.render.return'),
      (
        <>
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
              onLongPress(todo.id);
            }}
            activeOpacity={1}>
            <Text
              style={[
                styles.title,
                todo.CheckBoxState ? styles.strikethroughText : {},
              ]}>
              {todo.text}
            </Text>
          </TouchableOpacity>
          <FavoritesCheckBox
            checkOn="★"
            checkOff="☆"
            stateChecked={todo.favoritesState}
            size={30}
            onPress={() => store.favoritesTodo(todo.id)}
          />
        </>
      )
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,

    backgroundColor: '#fff',
    alignContent: 'center',
    flex: 3,
    // margin:5,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    fontSize: 20,
    color: '#000',
  },
});

export default TodoItem;
