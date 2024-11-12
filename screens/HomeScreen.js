import React from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      style={styles.background}
      source={require('../assets/background.jpg')}
      imageStyle={styles.backgroundImage} // Elhalványítjuk a képet
    >
      <View style={styles.container}>
        <Button title="Termékek" onPress={() => navigation.navigate('Products')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.3, // Elhalványítjuk a háttérképet
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
