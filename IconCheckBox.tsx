import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    const {stateChecked, checkOn, checkOff ,onPress=() =>{}} = this.props;
    const { size = 30 } = this.props;

    return (

      <TouchableOpacity style={[styles.checkBoxContainer,{ width: size, height: size }]} onPress={onPress}>
      <Text style={[styles.checkBoxText, { fontSize: size * 0.8 }]}>{stateChecked ? checkOn : checkOff}</Text>
      </TouchableOpacity>
    );
  }
}

IconCheckBox.propTypes = {
  stateChecked: PropTypes.bool.isRequired,
  checkOn: PropTypes.string.isRequired,
  checkOff: PropTypes.string.isRequired,

}

export default IconCheckBox;