import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  checkBoxContainer: {
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  checkBoxText: {
    fontSize: 28,
  },
});

interface IconCheckBoxProps {
  stateChecked: boolean;
  checkOn: string;
  checkOff: string;
  onPress?: () => void;
  size: number;
}

class IconCheckBox extends Component<IconCheckBoxProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    const {
      stateChecked,
      checkOn,
      checkOff,
      onPress = () => {},
      size = 30,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.checkBoxContainer, {width: size, height: size}]}
        onPress={onPress}>
        <Text style={[styles.checkBoxText, {fontSize: size * 0.8}]}>
          {stateChecked ? checkOn : checkOff}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default IconCheckBox;
