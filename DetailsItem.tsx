import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import IconCheckBox from './IconCheckBox';
import AppState, {Todo} from 'appstate';

interface IconCheckBoxProps {
  todo: Todo;
  superID: number;
  store: AppState;
  onPress: (id: number) => void;
}

@observer
class DetailsItem extends Component<IconCheckBoxProps> {
  constructor(props: IconCheckBoxProps) {
    super(props);
  }
  render() {
    const {todo, store, onPress, superID} = this.props;
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
            onPress={() => store.completeSubTodo(superID, todo.id)}
            size={30}
          />

          <TouchableOpacity
            style={[styles.title]}
            onPress={() => {
              onPress(todo.id);
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginLeft: 25,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Avenir',
    backgroundColor: '#fff',
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    color: '#000',
  },
});

export default DetailsItem;
