import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Picker } from '@react-native-picker/picker';
const mies = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];

const colors = ["#d65151", "#a5d68b", "#6454cc", "#85397e"];

class EditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: "",
            cat: "",
            cats: []
        };
        this.funkcja = null
    }

    render() {
        console.log(this.props.route.params)
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="#ffffff"
                    defaultValue={this.props.route.params.desc}
                    value={this.state.title}
                    placeholderTextColor="#d4d4d4"
                    onChangeText={(text) => {
                        this.setState({ title: text });
                        console.log(this.state.title);
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="#ffffff"
                    placeholderTextColor="#d4d4d4"
                    defaultValue={this.props.route.params.desc}
                    value={this.state.desc}
                    onChangeText={(text) => {
                        this.setState({ desc: text });
                        console.log(this.state.desc);
                    }}
                />
                <Picker style={styles.picker}
                    selectedValue={this.state.cat}
                    onValueChange={(val) => this.setState({ cat: val })}>
                    {this.state.cats}

                </Picker>
                <View style={styles.buttonContainer}>
                    <Button
                        title={"EDYTUJ"}
                        onPress={() => {
                            this.getItem(this.props.route.params.id);
                        }}
                    />
                </View>
            </View>
        );
    }
    getItem = async (key) => {
        let newTitle = this.state.title;
        let newDesc = this.state.desc;
        let newCat = this.state.cat
        console.log(this.props.route)
        await saveItem(this.props.route.params.id.toString(), JSON.stringify({ title: newTitle, desc: newDesc, date: this.props.route.params.date, color: this.props.route.params.color, id: this.props.route.params.id, cat: newCat }));
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

    loadItem = async () => {
        let items = await SecureStore.getItemAsync('cats');
        items = JSON.parse(items)
        let cats = []
        items.forEach(element => {
            cats.push(<Picker.Item label={element} value={element} key={element} />)
        })
        this.setState({ cats: cats })
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
    picker: {
        width: '80%',
        height: 40
    }
});

async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
}



export default EditScreen;
