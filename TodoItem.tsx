
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import React, { Component } from 'react'
import { SectionList, View, TouchableOpacity,StyleSheet,Text,Alert } from 'react-native'
import IconCheckBox from './IconCheckBox';
import FavoritesCheckBox from './IconCheckBox';
import PropTypes from 'prop-types'
import AppState from './appstate'

@observer
class TodoItem extends Component<any,any> {
  static propTypes: { todo: PropTypes.Validator<object>; store: PropTypes.Validator<object>; };

  handleLongClick = () => {
    console.log("TodoItem handleLongClick")
  };
  constructor(props: any) {
    super(props);

  }
      render() {

        const { todo ,store} = this.props
        // console.log("TodoItem render:"+todo.id +"  CheckBoxState:"+todo.CheckBoxState);
        console.log("TodoItem render")

        return (
          console.log("TodoItem.render.return"),

            
            <>
            <IconCheckBox checkOn='●' checkOff='◯' stateChecked={todo.CheckBoxState} todo={todo} onPress={() => store.completeTodo(todo.id)}/>
            
            <TouchableOpacity style={[styles.title]} onLongPress={()=>this.handleLongClick()} activeOpacity={1}>
            <Text style={[styles.title,todo.CheckBoxState ? styles.strikethroughText : {}]}>{todo.text}</Text>
            </TouchableOpacity>
            <FavoritesCheckBox checkOn='★' checkOff='☆' stateChecked={todo.favoritesState} todo={todo}onPress={() => store.favoritesTodo(todo.id)}/>
            </>
        )
      }
    }

    const styles = StyleSheet.create({
        title: {
            fontSize: 24,

            backgroundColor:"#fff",
            alignContent:"center",
            flex:3
            // margin:5,
          },
          strikethroughText: {
            textDecorationLine: 'line-through',
            fontSize: 20,
            color: '#000',
          },

      })

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default TodoItem
