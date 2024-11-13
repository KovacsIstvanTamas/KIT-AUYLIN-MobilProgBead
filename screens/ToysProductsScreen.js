import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CartContext } from '../contexts/CartContext';

const allProducts = [
  // Játékok
  { id: '1', name: 'Tamagotchi', price: 1000, category: 'Játék' },
  { id: '2', name: 'Bébi játék', price: 500, category: 'Játék' },
  { id: '3', name: 'Lego építőjáték', price: 3000, category: 'Építő' },
  { id: '4', name: 'Tűzoltóautó', price: 1500, category: 'Járművek' },
  { id: '5', name: 'Bábukészlet', price: 1200, category: 'Játék' },
  { id: '6', name: 'Puzzle', price: 800, category: 'Építő' },
  { id: '7', name: 'Dínó figura', price: 1100, category: 'Játék' },
  { id: '8', name: 'Képregény', price: 600, category: 'Játék' },
  { id: '9', name: 'Biliárd játék', price: 2500, category: 'Játék' },
  { id: '10', name: 'Játék kamera', price: 2200, category: 'Játék' },
  { id: '11', name: 'Autós szett', price: 2000, category: 'Járművek' },
  { id: '12', name: 'Képregény', price: 600, category: 'Játék' },
];

export default function ToysProductsScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Szűrt termékek
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.background}
        source={require('../assets/Toys.jpg')}
        imageStyle={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Button title="Ugrás a kosárhoz" onPress={() => navigation.navigate('Cart')} />

        {/* Keresőmező */}
        <TextInput
          style={styles.searchInput}
          placeholder="Keresés terméknév alapján"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Kategória kiválasztó */}
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Minden termék" value="All" />
          <Picker.Item label="Játék" value="Játék" />
          <Picker.Item label="Építő" value="Építő" />
          <Picker.Item label="Járművek" value="Járművek" />
        </Picker>

        {/* Ha nincs találat, megjelenítjük az üzenetet */}
        {filteredProducts.length === 0 ? (
          <Text style={styles.noResults}>Sajnos nincs ilyen termék</Text>
        ) : (
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    borderRadius: 5,
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
  noResults: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
