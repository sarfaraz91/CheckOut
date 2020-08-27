import {Toast} from 'native-base';
import {Alert} from 'react-native';
class ViewUtils {
  static showToast(text: any, buttonText = 'Okay', duration = 4000, buttonCallback = () => {}) {
    Toast.show({
      text: JSON.stringify(text),
      position: 'top',
      buttonText,
      duration,
      onClose: (reason) => {
        if (reason == 'user') {
          if (buttonCallback) {
            buttonCallback();
          }
        }
      }
    });
  }

  static showAlert(
    msg,
    okClick,
    cancelClick = null,
    okText = 'Ok',
    title = 'Check  Out',
  ) {
    let cancel = null;
    if (cancelClick) {
      cancel = {
        text: 'Cancel',
        onPress: cancelClick,
        style: 'cancel',
      };
    }

    Alert.alert(title, msg, [cancel, {text: okText, onPress: okClick}], {
      cancelable: false,
    });
  }
}

export {ViewUtils};
{/* <FlatList
                                data={this.state.sports}
                                style={{ flex: 1 }}
                                renderItem={({ item, index }) =>

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                        <View style={sports.input__row}>
                                            <View style={sports.icon__wrapper}>
                                                <Image source={{ uri: item.icon }} style={sports.icon_image} />
                                            </View>
                                            <View style={sports.input__wrapper}>
                                                <View>
                                                    <Text style={sports.inputBox}>{item.name}</Text>
                                                </View>
                                            </View>
                                            <View style={sports.CheckBox}>
                                                <CheckBox style={{backgroundColor: 'black', color:'white', borderRadius: 5,margin: 4,borderWidth: 0,}}
                                                    checked={item.is_checked}
                                                    size={40}
                                                    onChange={() => {
                                                        const dup = JSON.parse(JSON.stringify(this.state.sports));
                                                        console.warn("sports == ",dup[index])
                                                        dup[index].is_checked = !item.is_checked;
                                                        this.setState({ sports: dup });
                                                        if (!item.is_checked) {
                                                            this.lastSelectedSportIndex = index;                                                     
                                                            this.props.navigation.navigate('Disciplines', { disciplines: item.disciplines, onDisciplinesResult: this._onDisciplinesResult.bind(this) })
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                }
                            /> */}