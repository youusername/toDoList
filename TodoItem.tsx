
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import React, { Component } from 'react'
import { SectionList, View, SafeAreaView,StyleSheet,Text,Alert } from 'react-native'
import IconCheckBox from './IconCheckBox';
import FavoritesCheckBox from './IconCheckBox';
// import cellDataModel from './tools/cellDataModel';
import AppState from './appstate';

@observer
class TodoItem extends Component<any,any> {

  constructor(props: any) {
    super(props);

  }
      render() {
        // const { itemData } = this.props;
        const { todo } = this.props
        console.log("TodoItem todo:"+todo);
        return (
            <>
            <IconCheckBox checkOn='●' checkOff='◯' stateChecked={todo.CheckBoxState}/>
            <Text style={[styles.title,todo.CheckBoxState ? styles.strikethroughText : {}]}>{todo.text}</Text>
            <FavoritesCheckBox checkOn='★' checkOff='☆' stateChecked={todo.favoritesState}/>
            </>
        );
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

      });


export default TodoItem
