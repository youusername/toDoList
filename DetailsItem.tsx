import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import IconCheckBox from './IconCheckBox';
import AppState, {todo} from 'appstate';

interface IconCheckBoxProps {
  todo: todo;
  store: AppState;
  onLongPress: (id: number) => void;
}

@observer
class DetailsItem extends Component<IconCheckBoxProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {todo, store, onLongPress} = this.props;
    // console.log("DetailsItem render:"+todo.id +"  CheckBoxState:"+todo.CheckBoxState);
    console.log('DetailsItem render');

    return (
      console.log('DetailsItem.render.return'),
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
    // alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 25,
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

export default DetailsItem;
