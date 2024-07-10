import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

interface EditModalProps {
  onConfirm: (inputValue: string, checkBoxChecked: boolean) => void;
}

interface EditModalState {
  modalVisible: boolean;
  inputValue: string;
  checkBoxChecked: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  checkBoxContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkBoxChecked: {
    backgroundColor: 'green',
  },
  checkBoxText: {
    fontSize: 24,
    color: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginLeft: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

class EditModal extends Component<EditModalProps, EditModalState> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      modalVisible: false,
      inputValue: '',
      checkBoxChecked: false,
    };
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, inputValue: '', checkBoxChecked: false });
  };

  handleConfirm = () => {
    const { inputValue, checkBoxChecked } = this.state;
    this.props.onConfirm(inputValue, checkBoxChecked);
    this.closeModal();
  };

  render() {
    const { modalVisible, inputValue, checkBoxChecked } = this.state;
    
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.openButton} onPress={this.openModal}>
          <Text style={styles.openButtonText}>Open Modal</Text>
        </TouchableOpacity> */}

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={this.closeModal}
        >
          <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
            <View style={styles.overlay} />
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[styles.checkBoxContainer, checkBoxChecked && styles.checkBoxChecked]}
                onPress={() => this.setState({ checkBoxChecked: !checkBoxChecked })}
              >
                <Text style={styles.checkBoxText}>{checkBoxChecked ? '✓' : ''}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={(text) => this.setState({ inputValue: text })}
                placeholder="Enter text"
                autoFocus={true}
              />
              <TouchableOpacity style={styles.confirmButton} onPress={this.handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>

      </View>

    );
  }
}

export default EditModal;
