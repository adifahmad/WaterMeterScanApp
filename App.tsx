import TextRecognition from '@react-native-ml-kit/text-recognition';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import {useEffect, useState} from 'react';
const logoImg = require("./assets/no-image-icon.png")

export default function App() {
  const [image, setImage]= useState<any>();
  const [text, setText] = useState<any>("")

  const openCamera = async () => {
    let result : any = await launchCamera({mediaType : 'photo'})
    if(result != undefined){
      setImage(result.assets[0].uri)
    }
  }

  const openLibrary = async () => {
    let result : any = await launchImageLibrary({mediaType : 'photo'})
    if(result != undefined){
      setImage(result.assets[0].uri)
    }
  }

  const textRecognize = async () => {
    if (image != ""){
      const result = await TextRecognition.recognize(image)
      if(result != undefined){
        setText(result.text)
      }
    }
  }

  useEffect(() => {
    textRecognize()
  }, [image])
    
  return (
    <View style={styles.container}>
      <Text style={styles.textRecognition}>Text Recognition</Text>
      <TextInput style={styles.textColor}>{text}</TextInput>
      {image && <Image source={{ uri: image ? image : logoImg }} style={styles.image} />}
      <View style={styles.containerButton}>
      <Button onPress={openCamera} title='Take a Camera'/>
      <Button onPress={openLibrary} title='Open Galery'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textRecognition:{
    marginTop : 20,
    fontSize : 20,
    color: 'black',
    marginBottom : 20
  },
  containerButton:{
    flexDirection: 'row'
  },
  buttonFirst:{
    marginRight: 3
  },
  textColor:{
    marginTop : 10,
    marginBottom : 40,
    color: 'black',
    fontSize : 18,
    borderStyle : 'solid',
    borderWidth : 2,
    borderColor: 'black',
    width : '95%',
    height : '6%'
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
  }
});
