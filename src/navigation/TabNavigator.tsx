import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import VectorIcon from '../components/icons/VectorIcon';

const Tab = createBottomTabNavigator();

function Placeholder({ label }: { label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{label}</Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111',
        tabBarInactiveTintColor: '#5f6a7d',
        tabBarLabelStyle: { fontSize: 12, marginBottom: 2 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <VectorIcon name="home" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Search"
        children={() => <Placeholder label="Search coming soon" />}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => <VectorIcon name="search" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => <VectorIcon name="cart" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Account"
        children={() => <Placeholder label="Account" />}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => <VectorIcon name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
