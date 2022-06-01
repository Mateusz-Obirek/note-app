import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import * as SecureStore from "expo-secure-store";

class AddCatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="#ffffff"
                    placeholder="KATEGORIA..."
                    placeholderTextColor="#d4d4d4"
                    onChangeText={(text) => {
                        this.setState({ cat: text });
                        console.log(this.state.cat);
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title={"DODAJ"}
                        onPress={() => {
                            this.getItem();
                        }}
                    />
                </View>
            </View>
        );
    }

    getItem = async () => {
        let cats = await SecureStore.getItemAsync('cats');
        cats = JSON.parse(cats);
        cats.push(this.state.cat)
        console.log(cats)
        await saveItem('cats', JSON.stringify(cats));
        cats = await SecureStore.getItemAsync('cats');
        console.log(cats)
        this.props.navigation.navigate('dodaj notatkę')
    };
}
async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
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

export default AddCatScreen;
