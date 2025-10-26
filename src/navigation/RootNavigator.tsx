// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductListScreen from '../screens/ProductListScreen';

export type RootStackParamList = {
  Tabs: undefined;
  Product: { id: string };
  Cart: undefined;
  Categories: undefined;
  Subcategories: { categorySlug: string; categoryName: string };
  ProductList: { title?: string; category?: string };
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
        <Stack.Screen
          name="Categories"
          component={CategoryScreen}
          options={{ headerShown: true, title: 'Categories' }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.title || 'Products',
          })}
        />
        <Stack.Screen
          name="Subcategories"
          component={require('../screens/SubcategoryScreen').default}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.categoryName || 'Subcategories',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
