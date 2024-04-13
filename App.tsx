import TextRecognition from '@react-native-ml-kit/text-recognition';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from 'react';
const logoImg = require('./assets/no-image-icon.png');

export default function App() {
  const [image, setImage] = useState<any>();
  const [text, setText] = useState<any>('');

  const openCamera = async () => {
    let result: any = await launchCamera({mediaType: 'photo'});
    if (result != undefined && !result.didCancel) {
      setImage(result.assets[0].uri);
    }
    console.log('user canceled image picker');
  };

  const openLibrary = async () => {
    let result: any = await launchImageLibrary({mediaType: 'photo'});
    if (result != undefined) {
      setImage(result.assets[0].uri);
    }
    console.log('user canceled image picker');
  };

  const textRecognize = async () => {
    if (image != '') {
      const result = await TextRecognition.recognize(image);
      if (result != undefined) {
        setText(result.text);
      }
    }
  };

  useEffect(() => {
    textRecognize();
  }, [image]);

  return (
    <View style={styles.container}>
      <Text style={styles.textRecognition}>Text Recognition</Text>
      <TextInput style={styles.textInput}>{text}</TextInput>
      <View style={styles.containerButton}>
        <Button onPress={openCamera} title="Open Camera" />
        <Button onPress={openLibrary} title="Open Gallery" />
      </View>
      {image && (
        <Image source={{uri: image ? image : logoImg}} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textRecognition: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  textInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  image: {
    width: '80%',
    height: 400,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
