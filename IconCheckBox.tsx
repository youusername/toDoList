import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  checkBoxContainer: {
    alignItems: 'center',
    backgroundColor:"red",
  },
  checkBoxText: {
    fontSize: 28,
  },
});

class IconCheckBox extends Component<any,any> {
  static propTypes: {
    todo: PropTypes.Validator<object>;
    store: PropTypes.Validator<object>; 
    checkOn: PropTypes.Validator<string>; 
    checkOff: PropTypes.Validator<string>; 
    stateChecked: PropTypes.Validator<boolean>; 
    };
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
    };

  }



  render() {
    const { todo,stateChecked, checkOn, checkOff,store ,onPress=() =>{}} = this.props;
    const { size = 30 } = this.props;
    // console.log("iconcheckbox.render:"+JSON.stringify(todo, null, 2));
    return (

      <TouchableOpacity style={[styles.checkBoxContainer,{ width: size, height: size }]} onPress={onPress}>
      <Text style={[styles.checkBoxText, { fontSize: size * 0.8 }]}>{stateChecked ? checkOn : checkOff}</Text>
      </TouchableOpacity>
    );
  }
}

IconCheckBox.propTypes = {
  todo: PropTypes.object.isRequired,
  stateChecked: PropTypes.bool.isRequired,
  checkOn: PropTypes.string.isRequired,
  checkOff: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
}

export default IconCheckBox;