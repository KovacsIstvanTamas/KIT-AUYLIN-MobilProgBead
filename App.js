import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import { CartProvider } from './contexts/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Főoldal' }} />
          <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Termékek' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Kosár' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Fizetés' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
