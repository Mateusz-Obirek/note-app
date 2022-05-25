import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class S1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    this.getItem()
    return (
      <View style={styles.container}>
        <FlatList 
                  horizontal={false}
                  numColumns={2}
                  style={styles.list}
                  contentContainerStyle={{justifyContent: 'center' }}
                  data={
                    this.state.data
                  }
                  keyExtractor={item => item.id}
                  renderItem={({ item }) =>
                  <View style={styles.noteContainer} backgroundColor={item.color}> 
                  <TouchableOpacity
                  onPress={()=>{this.removeItem(item.id)}}
                  >
                    <View style={styles.dateContainer}>
                      <Text style={styles.noteText}>{item.id}</Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.noteText}>{item.title}</Text>
                      <Text style={styles.noteText}>{item.desc}</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                  }

        />
      </View>
    );
  }
  getItem= async()=>{
    a = await SecureStore.getItemAsync('keys');
    a = JSON.parse(a)
    let dane = []
    for(let i=0; i<a.length; i++){
      let d = await SecureStore.getItemAsync(a[i].toString());
      dane.push(JSON.parse(d))
    }
    this.setState({data: dane})
  }
  removeItem= async(id)=>{
    Alert.alert(
      "Usunięcie notatki",
      "Czy chcesz usunąć notatkę?",
      [
        { text: "TAK", onPress: () => {

          this.remove(id)

        } },
        { text: "NIE", onPress: () => console.log("NO Pressed") }
      ]
    )
  }
  remove = async(id)=>{
    let a = await SecureStore.getItemAsync('keys');
      a = JSON.parse(a)

      a.splice(a.indexOf(id), 1);
      console.log(a)

      await saveItem('keys', JSON.stringify(a))
      await SecureStore.deleteItemAsync(id.toString());
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b2b2b',
    height: '100%',
    width:'100%'
  },
  list:{
    flex: 1,
    flexWrap: 'wrap',
    width:'100%',
  },
  noteText:{
    marginTop: 30,
    color:'white'
  },
  dateContainer:{
    justifyContent: 'flex-end',
  },
  noteContainer:{
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: 'white',
    width:'48%'
  },
  textContainer:{
    alignItems: 'center'
  }
});

export default S1;

async function saveItem(key, value){
  await SecureStore.setItemAsync(key, value);
}