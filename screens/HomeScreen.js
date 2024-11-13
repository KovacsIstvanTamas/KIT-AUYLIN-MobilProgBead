import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      style={styles.background}
      source={require('../assets/background.jpg')}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Ételek gomb */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FoodProducts')}>
          <Text style={styles.buttonText}>Ételek</Text>
        </TouchableOpacity>

        {/* Müszaki gomb */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ToolProducts')}>
          <Text style={styles.buttonText}>Müszaki</Text>
        </TouchableOpacity>

        {/* Játék gomb */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ToysProducts')}>
          <Text style={styles.buttonText}>Játék</Text>
        </TouchableOpacity>
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
    opacity: 0.3,
  },
  container: {
    flexDirection: 'row',  // Gombok egymás melletti elrendezése
    flexWrap: 'wrap',  // Lehetővé teszi a gombok összetömörítését, ha szükséges
    justifyContent: 'space-around',  // Egyenlő térközöket ad a gombok között
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  button: {
    width: '30%',  // Minden gomb szélessége 30% a rendelkezésre álló helyből
    height: 100,  // A gombok magassága
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,  // Gombok közötti távolság
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
