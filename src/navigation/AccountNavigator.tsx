// src/navigation/AccountNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountHomeScreen from '../screens/account/AccountHomeScreen';
import ProfileScreen from '../screens/account/ProfileScreen';
import AddressesScreen from '../screens/account/AddressesScreen';
import PaymentMethodsScreen from '../screens/account/PaymentMethodsScreen';
import NotificationsScreen from '../screens/account/NotificationsScreen';
import FollowsScreen from '../screens/account/FollowsScreen';

export type AccountStackParamList = {
  AccountHome: undefined;
  Profile: undefined;
  Addresses: undefined;
  Payments: undefined;
  Notifications: undefined;
  Follows: undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountHome" component={AccountHomeScreen} options={{ title: 'My Account' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="Addresses" component={AddressesScreen} options={{ title: 'Addresses' }} />
      <Stack.Screen name="Payments" component={PaymentMethodsScreen} options={{ title: 'Payment Methods' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Follows" component={FollowsScreen} options={{ title: 'Follows' }} />
    </Stack.Navigator>
  );
}
