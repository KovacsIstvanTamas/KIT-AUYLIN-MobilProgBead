import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CartContext } from '../contexts/CartContext';

const allProducts = [
  // Gyümölcsök
  { id: '1', name: 'Alma', price: 100, category: 'Gyümölcs' },
  { id: '2', name: 'Banán', price: 50, category: 'Gyümölcs' },
  { id: '3', name: 'Narancs', price: 80, category: 'Gyümölcs' },
  { id: '4', name: 'Eper', price: 200, category: 'Gyümölcs' },
  { id: '5', name: 'Szőlő', price: 120, category: 'Gyümölcs' },
  { id: '6', name: 'Mangó', price: 150, category: 'Gyümölcs' },
  { id: '7', name: 'Ananász', price: 300, category: 'Gyümölcs' },
  { id: '8', name: 'Körte', price: 100, category: 'Gyümölcs' },
  { id: '9', name: 'Citrom', price: 70, category: 'Gyümölcs' },
  { id: '10', name: 'Dinnye', price: 180, category: 'Gyümölcs' },
  
  // Tejtermékek
  { id: '11', name: 'Tej', price: 200, category: 'Tejtermék' },
  { id: '12', name: 'Jogurt', price: 100, category: 'Tejtermék' },
  { id: '13', name: 'Sajt', price: 300, category: 'Tejtermék' },
  { id: '14', name: 'Vaj', price: 250, category: 'Tejtermék' },
  { id: '15', name: 'Túró', price: 150, category: 'Tejtermék' },
  { id: '16', name: 'Kefír', price: 90, category: 'Tejtermék' },
  { id: '17', name: 'Tejföl', price: 110, category: 'Tejtermék' },
  { id: '18', name: 'Feta sajt', price: 350, category: 'Tejtermék' },
  { id: '19', name: 'Mozzarella', price: 400, category: 'Tejtermék' },
  { id: '20', name: 'Kecskesajt', price: 500, category: 'Tejtermék' },
  
  // Zöldségek
  { id: '21', name: 'Paradicsom', price: 120, category: 'Zöldség' },
  { id: '22', name: 'Krumpli', price: 60, category: 'Zöldség' },
  { id: '23', name: 'Hagyma', price: 40, category: 'Zöldség' },
  { id: '24', name: 'Répa', price: 50, category: 'Zöldség' },
  { id: '25', name: 'Paprika', price: 130, category: 'Zöldség' },
  { id: '26', name: 'Káposzta', price: 80, category: 'Zöldség' },
  { id: '27', name: 'Brokkoli', price: 140, category: 'Zöldség' },
  { id: '28', name: 'Karfiol', price: 150, category: 'Zöldség' },
  { id: '29', name: 'Saláta', price: 60, category: 'Zöldség' },
  { id: '30', name: 'Cukkini', price: 90, category: 'Zöldség' },

  // Húsok
  { id: '31', name: 'Csirke', price: 500, category: 'Hús' },
  { id: '32', name: 'Marhahús', price: 1000, category: 'Hús' },
  { id: '33', name: 'Sertéshús', price: 800, category: 'Hús' },
  { id: '34', name: 'Bárány', price: 1200, category: 'Hús' },
  { id: '35', name: 'Pulyka', price: 600, category: 'Hús' },
  { id: '36', name: 'Hal', price: 700, category: 'Hús' },
  { id: '37', name: 'Kacsa', price: 900, category: 'Hús' },
  { id: '38', name: 'Nyúl', price: 850, category: 'Hús' },
  { id: '39', name: 'Bacon', price: 650, category: 'Hús' },
  { id: '40', name: 'Sonka', price: 700, category: 'Hús' },
];

export default function FoodProductsScreen({ navigation }) {
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
        source={require('../assets/Foods.jpg')}
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
          <Picker.Item label="Gyümölcs" value="Gyümölcs" />
          <Picker.Item label="Tejtermék" value="Tejtermék" />
          <Picker.Item label="Zöldség" value="Zöldség" />
          <Picker.Item label="Hús" value="Hús" />
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