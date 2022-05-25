import * as React from 'react';
import { Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator();

import S1 from "./components/S1"
import S2 from "./components/S2"

function CustomDrawerContent(props) {
  return (
      <DrawerContentScrollView {...props}>
          
          <DrawerItemList {...props} />

          <DrawerItem
              label="test"
              icon={() => <Image />}
              onPress={() => Alert.alert(
                "App info",
                "ver. 1.0, author: Mateusz Obirek ",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )}
          />
         
      </DrawerContentScrollView>
  );
}

function App() {
  saveItem('keys', JSON.stringify([]))
  let funkcja = null
  return (
      <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="notatki" component={S1}  />
              <Drawer.Screen name="dodaj notatkę" component={S2} />
          </Drawer.Navigator>
      </NavigationContainer>
  );
  componentDidMount = () => {
    funkcja = navigation.addListener('focus', () => {
          // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
        refresh()
    });

    // ta funkcja wykona się raz podczas uruchomienia ekranu
    refresh()

}

componentWillUnmount = () => {
    funkcja();
}

}
export default App;

async function saveItem(key, value){
  await SecureStore.setItemAsync(key, value);
}