import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Picker } from '@react-native-picker/picker';
const mies = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];

const colors = ["#d65151", "#a5d68b", "#6454cc", "#85397e"];

class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: "",
            cat: ""
        };
        this.funkcja = null
        this.cats = []
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="#ffffff"
                    placeholder="TYTUŁ..."
                    placeholderTextColor="#d4d4d4"
                    onChangeText={(text) => {
                        this.setState({ title: text });
                        console.log(this.state.title);
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="#ffffff"
                    placeholder="TREŚĆ..."
                    placeholderTextColor="#d4d4d4"
                    onChangeText={(text) => {
                        this.setState({ desc: text });
                        console.log(this.state.desc);
                    }}
                />
                <Picker
                   selectedValue={this.state.cat}
                   onValueChange={(val)=>this.setState({cat:val})}>
                   {this.cats}
                
                </Picker>
                <View style={styles.buttonContainer}>
                    <Button
                        title={"DODAJ"}
                        onPress={() => {
                            this.getItem("keys");
                        }}
                    />
                </View>
            </View>
        );
    }
    getItem = async (key) => {
        let item = await SecureStore.getItemAsync(key);
        item = JSON.parse(item);
        let newDate = new Date();
        let dateText = newDate.getDate() + " " + mies[newDate.getMonth()];
        let newTitle = this.state.title;
        let newDesc = this.state.desc;
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        let newId = item.length > 0 ? item[item.length - 1] * 1 + 1 : 0;
        await saveItem(item.length.toString(), JSON.stringify({ title: newTitle, desc: newDesc, date: dateText, color: newColor, id: newId }));
        console.log(item);
        item.push(item.length);
        console.log(item.length);
        await saveItem("keys", JSON.stringify(item));
        let a = await SecureStore.getItemAsync("0");
        console.log(a);
        this.props.navigation.navigate('notatki')
    };

    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener("focus", () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
            this.loadItem();
        });

        // ta funkcja wykona się raz podczas uruchomienia ekranu
        this.loadItem();
    };

    componentWillUnmount = () => {
        this.funkcja();
    };

    loadItem = async()=>{
        let items = await SecureStore.getItemAsync('cats');
        items = JSON.parse(items)
        this.cats = []
        items.forEach(element => {
            this.cats.push(<Picker.Item label={element} value={element} />)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2b2b2b",
        height: "100%",
        alignItems: "center",
    },
    textInput: {
        color: "white",
        marginTop: 30,
    },
    buttonContainer: {
        marginTop: 30,
    },
});

async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
}



export default S2;
