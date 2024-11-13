import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FoodProductsScreen from './screens/FoodProductsScreen';
import ToolProductsScreen from './screens/ToolProductsScreen'; // Importáltuk az új szerszámok képernyőt
import ToysProductsScreen from './screens/ToysProductsScreen';
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
          <Stack.Screen name="FoodProducts" component={FoodProductsScreen} options={{ title: 'Ételek' }} />
          <Stack.Screen name="ToolProducts" component={ToolProductsScreen} options={{ title: 'Müszaki' }} />
          <Stack.Screen name="ToysProducts" component={ToysProductsScreen} options={{ title: 'Játékok' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Kosár' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Fizetés' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
