import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CartContext } from '../contexts/CartContext';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function FoodProductsScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, 'FoodProducts');
        const productSnapshot = await getDocs(productCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  // Filtered products based on category and search query
  const filteredProducts = products.filter(product => {
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

        {/* Search bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Keresés terméknév alapján"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Category picker */}
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

        {/* Display message if no results */}
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
