// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import AccountNavigator from './AccountNavigator';
import TextIcon from '../components/icons/TextIcon';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, { name: Parameters<typeof TextIcon>[0]['name'] }> = {
            Home: { name: 'home' },
            Search: { name: 'tab-search' },
            Cart: { name: 'cart' },
            Account: { name: 'account' },
          };
          const entry = map[route.name] ?? { name: 'home' };
          return <TextIcon name={entry.name} size={size ?? 18} color={color ?? '#111'} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
}
