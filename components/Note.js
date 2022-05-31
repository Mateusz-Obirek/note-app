import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
class Note extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.noteContainer} backgroundColor={this.props.item.color}>
                <TouchableOpacity
                    onLongPress={() => {
                        this.props.removeItem(this.props.item.id);
                    }}
                    onPress={()=>{
                        this.props.editItem(this.props.item)
                    }}
                >
                    <View style={styles.catContainer}>
                        <Text style={styles.noteText}>{this.props.item.cat}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.noteText}>{this.props.item.date}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.noteText}>{this.props.item.title}</Text>
                        <Text style={styles.noteText}>{this.props.item.desc}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noteText: {
        marginTop: 30,
        color: "white",
    },
    dateContainer: {
        justifyContent: "flex-end",
    },
    catContainer: {
        justifyContent: "flex-start",
    },
    noteContainer: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "white",
        width: "48%",
    },
    textContainer: {
        alignItems: "center",
    },
});

export default Note;
