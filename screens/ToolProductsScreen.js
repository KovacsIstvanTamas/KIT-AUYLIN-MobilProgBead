import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CartContext } from '../contexts/CartContext';

const allProducts = [
  // Szerszámok
  { id: '1', name: 'Csavarkulcs', price: 1500, category: 'Szerszám' },
  { id: '2', name: 'Kalapács', price: 2000, category: 'Szerszám' },
  { id: '3', name: 'Fűrész', price: 3000, category: 'Szerszám' },
  { id: '4', name: 'Csavarhúzó készlet', price: 2500, category: 'Szerszám' },
  { id: '5', name: 'Fogó', price: 1800, category: 'Szerszám' },
  
  // Gépek
  { id: '6', name: 'Fúrógép', price: 10000, category: 'Gépek' },
  { id: '7', name: 'Csiszológép', price: 12000, category: 'Gépek' },
  { id: '8', name: 'Vízszivattyú', price: 15000, category: 'Gépek' },
  { id: '9', name: 'Hegesztőgép', price: 20000, category: 'Gépek' },
  { id: '10', name: 'Láncfűrész', price: 25000, category: 'Gépek' },
  
  // Védőfelszerelés
  { id: '11', name: 'Védőszemüveg', price: 1000, category: 'Védőfelszerelés' },
  { id: '12', name: 'Füldugó', price: 500, category: 'Védőfelszerelés' },
  { id: '13', name: 'Védőkesztyű', price: 1500, category: 'Védőfelszerelés' },
  { id: '14', name: 'Sisak', price: 3000, category: 'Védőfelszerelés' },
  { id: '15', name: 'Légzésvédő', price: 2500, category: 'Védőfelszerelés' },
];

export default function TechnicalProductsScreen({ navigation }) {
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
        source={require('../assets/Tools.jpg')}
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
          <Picker.Item label="Szerszám" value="Szerszám" />
          <Picker.Item label="Gépek" value="Gépek" />
          <Picker.Item label="Védőfelszerelés" value="Védőfelszerelés" />
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
