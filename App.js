import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false)

  const onReset = () => {
    setShowAppOptions(false);
  }
  const onAddSticker = () => {
    setIsModalVisible(true);
  }
  const onCloseModal = () => {
    setIsModalVisible(false);
  }
  const onSaveImageAsync = () => {

  }
  const pickImageAsync = async () => {
    console.log("in image picker.. ");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
    else {
      alert('You did not select any image')
    }
  };
  const placehoderImage = require("./assets/images/background-image.png");

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={placehoderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>

      {showAppOptions ?
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={"refresh"} label={"Reset"} onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon={"save-alt"} label={"Save"} onPress={onSaveImageAsync} />
          </View>
        </View> :
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onCloseModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseModal} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
