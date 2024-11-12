import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground } from 'react-native';
import { CartContext } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, getTotalPrice } = useContext(CartContext);

  return (
    <ImageBackground 
      style={styles.background}
      source={require('../assets/background.jpg')}
      imageStyle={styles.backgroundImage} // Elhalványítjuk a képet
    >
      <View style={styles.container}>
        {/* Ha a kosár üres */}
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Nincs semmi a kosárban</Text>
        ) : (
          <>
            {/* Kosár elemek */}
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text>{item.name} - {item.quantity} db - {item.price * item.quantity} Ft</Text>
                  <Button title="Törlés" onPress={() => removeFromCart(item.id)} />
                </View>
              )}
            />

            {/* Összesített ár megjelenítése */}
            <Text style={styles.totalPrice}>Összesen: {getTotalPrice()} Ft</Text>

            {/* Fizetés gomb */}
            <Button title="Fizetés" onPress={() => navigation.navigate('Checkout')} />
          </>
        )}
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
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
