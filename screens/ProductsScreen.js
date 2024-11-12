import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CartContext } from '../contexts/CartContext';

const allProducts = [
  { id: '1', name: 'Alma', price: 100, category: 'Gyümölcs' },
  { id: '2', name: 'Banán', price: 50, category: 'Gyümölcs' },
  { id: '3', name: 'Narancs', price: 80, category: 'Gyümölcs' },
  { id: '4', name: 'Paradicsom', price: 120, category: 'Zöldség' },
  { id: '5', name: 'Krumpli', price: 60, category: 'Zöldség' },
];

export default function ProductsScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Szűrt termékek, ha nincs kiválasztott kategória, minden terméket mutatunk
  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Háttérkép */}
      <ImageBackground 
        style={styles.background}
        source={require('../assets/background.jpg')}
        imageStyle={styles.backgroundImage} // Elhalványítjuk a képet
      />
      {/* Kategória kiválasztó */}
      <View style={styles.overlay}>
        <Button title="Ugrás a kosárhoz" onPress={() => navigation.navigate('Cart')} />

        {/* Kategória kiválasztó */}
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Minden termék" value="All" />
          <Picker.Item label="Gyümölcs" value="Gyümölcs" />
          <Picker.Item label="Zöldség" value="Zöldség" />
        </Picker>

        {/* Szűrt termékek megjelenítése */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Text>{item.name} - {item.price} Ft</Text>
              <Button title="Kosárba" onPress={() => addToCart(item)} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',  // A háttérkép pozicionálása
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,  // Háttér a háttérben
  },
  backgroundImage: {
    opacity: 0.3, // Elhalványítjuk a háttérképet
  },
  overlay: {
    flex: 1,
    zIndex: 1,  // A tartalomnak felül kell lennie
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
