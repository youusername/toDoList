import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
    };

  }

  toggleCheckBox = () => {
    this.setState((prevState: { checked: any; }) => {
      const newCheckedState = !prevState.checked;
      if (this.props.onToggle) {
        this.props.onToggle(newCheckedState); 
      }
      return { checked: newCheckedState };
    });
    console.log('toggleCheckBox' + this.state.checked);
  };

  render() {
    const { stateChecked, checkOn, checkOff } = this.props;
    const { size = 30 } = this.props;

    return (
      <TouchableOpacity style={[styles.checkBoxContainer,{ width: size, height: size }]} onPress={this.toggleCheckBox}>
      <Text style={[styles.checkBoxText, { fontSize: size * 0.8 }]}>{stateChecked ? checkOn : checkOff}</Text>
      </TouchableOpacity>
    );
  }
}



export default IconCheckBox;