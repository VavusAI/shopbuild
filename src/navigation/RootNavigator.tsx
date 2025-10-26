// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Product: { id: string };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* All “tabbed” screens live inside TabNavigator */}
        <Stack.Screen name="Tabs" component={TabNavigator} />

        {/* Detail screens live here. Names must be unique within this navigator. */}
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: true, title: 'Cart', animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
