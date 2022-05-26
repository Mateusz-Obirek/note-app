import * as React from "react";
import { Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";

const Drawer = createDrawerNavigator();

import S1 from "./components/S1";
import S2 from "./components/S2";

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <DrawerItem
                label="test"
                icon={() => <Image source={require("./assets/favicon.png")} />}
                onPress={() => Alert.alert("App info", "ver. 1.0, author: Mateusz Obirek ", [{ text: "OK", onPress: () => console.log("OK Pressed") }])}
            />
        </DrawerContentScrollView>
    );
}

function App() {
    saveItem("keys", JSON.stringify([]));
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                    name="notatki"
                    component={S1}
                    options={{
                        drawerIcon: (config) => <Image style={{ width: 20, height: 20 }} source={require("./assets/post-it.png")}></Image>,
                    }}
                />
                <Drawer.Screen
                    name="dodaj notatkę"
                    component={S2}
                    options={{
                        drawerIcon: (config) => <Image style={{ width: 20, height: 20 }} source={require("./assets/edit.png")}></Image>,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default App;

async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
}
