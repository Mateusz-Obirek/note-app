import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const mies = [
  'sty',
  'lut',
  'mar',
  'kwi',
  'maj',
  'cze',
  'lip',
  'sie',
  'wrz',
  'paź',
  'lis',
  'gru'
]

const colors = [
  '#d65151',
  '#a5d68b',
  '#6454cc',
  '#85397e'
]

class S2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="#ff0000"
          placeholder="TYTUŁ..."
          placeholderTextColor='#d4d4d4'
          onChangeText={(text) => {this.setState({title:text})
          console.log(this.state.title)}}
        />
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="#ff0000"
          placeholder="TREŚĆ..."
          placeholderTextColor='#d4d4d4'
          onChangeText={(text) => {this.setState({desc:text})
          console.log(this.state.desc)}}
        />
        <View style={styles.buttonContainer}>
          <Button color='white' title={"DODAJ"} onPress={()=>{
            this.getItem('keys') 
          }} />
        </View>
      </View>
    );
  
  }
   getItem = async(key)=>{
    let item = await SecureStore.getItemAsync(key);
    item = JSON.parse(item)
    let newDate = new Date()
    let dateText = newDate.getDate()+' '+ mies[newDate.getMonth()]
    let newTitle = this.state.title
    let newDesc = this.state.desc
    let newColor = colors[Math.floor(Math.random()*colors.length)]
    await saveItem(item.length.toString(), JSON.stringify({title: newTitle, desc: newDesc, date:dateText, color:newColor, id:item.length.toString()}))
    console.log(item)
    item.push(item.length)
    console.log(item.length)
    await saveItem('keys', JSON.stringify(item))
    let a = await SecureStore.getItemAsync('0');
    console.log(a)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b2b2b',
    height: '100%',
    alignItems: 'center',
  },
  textInput:{
    color: 'white',
    marginTop: 30
  },
  buttonContainer:{
    marginTop: 30
  }
});




async function saveItem(key, value){
  await SecureStore.setItemAsync(key, value);
}

export default S2;
