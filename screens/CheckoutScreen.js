import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CheckoutScreen({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleCheckout = () => {
    // Validáció: ellenőrizzük, hogy minden mezőt kitöltöttek
    if (!name || !address || !city || !zipCode) {
      Alert.alert('Hiba', 'Kérjük, töltse ki az összes mezőt!');
      return;
    }

    // Sikeres fizetés esetén
    Alert.alert(`Köszönjük a rendelést, ${name}!`, '', [
      { text: 'OK', onPress: () => navigation.navigate('Products') }, // Visszairányítás a termékekre
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Számlázási adatok</Text>
      <TextInput 
        style={styles.input}
        placeholder="Név"
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input}
        placeholder="Cím"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput 
        style={styles.input}
        placeholder="Város"
        value={city}
        onChangeText={setCity}
      />
      <TextInput 
        style={styles.input}
        placeholder="Irányítószám"
        value={zipCode}
        onChangeText={setZipCode}
      />
      <Button 
        title="Fizetés"
        onPress={handleCheckout}
        disabled={!name || !address || !city || !zipCode} // Ha nem minden mező kitöltött, a gomb letiltva
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
});
