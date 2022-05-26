import React, { Component } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

import Note from "./Note";

class S1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.funkcja = null;
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    style={styles.list}
                    contentContainerStyle={{ justifyContent: "center" }}
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Note item={item} removeItem={this.removeItem} />}
                />
            </View>
        );
    }
    getItem = async () => {
        a = await SecureStore.getItemAsync("keys");
        a = JSON.parse(a);

        console.log("getItem");
        console.log(a);
        let dane = [];
        for (let i = 0; i < a.length; i++) {
            let d = await SecureStore.getItemAsync(a[i].toString());
            dane.push(JSON.parse(d));
        }
        this.setState({ data: dane });
    };
    removeItem = async (id) => {
        Alert.alert("Usunięcie notatki", "Czy chcesz usunąć notatkę?", [
            {
                text: "TAK",
                onPress: () => {
                    this.remove(id);
                },
            },
            { text: "NIE", onPress: () => console.log(id) },
        ]);
    };
    remove = async (id) => {
        let a = await SecureStore.getItemAsync("keys");
        a = JSON.parse(a);
        console.log("removing");
        console.log(a);
        a.splice(a.indexOf(id * 1), 1);
        console.log("after splice");
        console.log(id);
        await saveItem("keys", JSON.stringify(a));
        await SecureStore.deleteItemAsync(id.toString());
        this.getItem();
    };

    componentDidMount = () => {
        this.funkcja = this.props.navigation.addListener("focus", () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
            this.getItem();
        });

        // ta funkcja wykona się raz podczas uruchomienia ekranu
        this.getItem();
    };

    componentWillUnmount = () => {
        this.funkcja();
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2b2b2b",
        height: "100%",
        width: "100%",
    },
    list: {
        flex: 1,
        flexWrap: "wrap",
        width: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: '5%',
        right: 0,
    },
});

export default S1;

async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
}
