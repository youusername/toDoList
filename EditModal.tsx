import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {observer} from 'mobx-react';

interface EditModalProps {
  store: any;
  modalVisible: boolean;
  itemID: number;
  onRequestClose?: () => void;
}

interface EditModalState {
  inputValue: string;
  checkBoxChecked: boolean;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 0,
    height: 0,
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
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'white',
  },
  checkBoxChecked: {
    backgroundColor: 'black',
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
  deleteButton: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

@observer
class EditModal extends Component<EditModalProps, EditModalState> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      inputValue: '',
      checkBoxChecked: false,
    };
  }

  handleShow = () => {
    this.openModal();
  };
  openModal = (text: string = '', CheckBoxState: boolean = false) => {
    if (this.props.itemID === -1) {
      console.log('EditModal openModal');
      this.setState({inputValue: text, checkBoxChecked: CheckBoxState});
    } else {
      console.log('EditModal openModal FromID');
      this.openModalFromID(this.props.itemID);
    }
  };
  openModalFromID = (id: number) => {
    console.log('EditModal openModalFromID:' + id);
    let t_todo = this.props.store.findTodo(id);
    console.log('EditModal openModalFromID text:' + t_todo.text);
    this.setState({
      inputValue: t_todo.text,
      checkBoxChecked: t_todo.CheckBoxState,
    });
  };
  deleteData = () => {
    console.log('EditModal deleteDataFromID:' + this.props.itemID);
    this.props.store.deleteTodo(this.props.itemID);
    this.closeModal();
  };

  closeModal = () => {
    console.log('EditModal closeModal');
    this.setState({inputValue: '', checkBoxChecked: false});
    this.props.onRequestClose?.();
  };

  handleConfirm = () => {
    console.log('EditModal handleConfirm');

    const {inputValue, checkBoxChecked} = this.state;
    if (inputValue.length <= 0) {
      Alert.alert(`todo title is null`, '', [
        {
          text: 'OK',
          onPress: () => {
            this.closeModal();
          },
        },
      ]);
    } else {
      if (this.props.itemID === -1) {
        console.log('EditModal handleConfirm new');
        this.props.store.addTodo(inputValue, checkBoxChecked);
      } else {
        console.log('EditModal handleConfirm edit');
        this.props.store.editTodo(
          this.props.itemID,
          inputValue,
          checkBoxChecked,
        );
      }
      this.closeModal();
    }
  };

  render() {
    const {inputValue, checkBoxChecked} = this.state;
    console.log('EditModal render');
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={this.props.modalVisible}
          animationType="none" //'none' | 'slide' | 'fade'
          onRequestClose={this.closeModal}
          onShow={this.handleShow}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior="padding">
            <TouchableOpacity
              style={styles.overlay}
              onPress={this.closeModal}></TouchableOpacity>

            <View style={styles.modalContent}>
              <TouchableOpacity
                style={[
                  styles.checkBoxContainer,
                  checkBoxChecked && styles.checkBoxChecked,
                ]}
                onPress={() =>
                  this.setState({checkBoxChecked: !checkBoxChecked})
                }>
                <Text style={styles.checkBoxText}>
                  {checkBoxChecked ? '' : ''}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={(text) => this.setState({inputValue: text})}
                placeholder="Enter text"
                autoFocus={true}
              />
              {this.props.itemID === -1 ? (
                <></>
              ) : (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={this.deleteData}>
                  <Text style={styles.deleteButtonText}>删除</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={this.handleConfirm}>
                <Text style={styles.confirmButtonText}> ↑ </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

export default EditModal;
