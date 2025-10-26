import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Button } from './ui/Button';
import { useCart } from '../state/cartStore';

export default function Header() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const itemCount = useCart(s => s.items.reduce((n,i)=>n+i.qty,0));

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => nav.navigate('Home')} style={styles.logoRow}>
          <Icon name="cart-outline" size={28} color="#111"/>
          <Text style={styles.logoText}>Marketplace</Text>
        </Pressable>

        {/* inline search stub – we’ll replace with real SearchBar when ready */}
        <Pressable onPress={() => nav.navigate('Search' as never)} style={styles.search}>
          <Icon name="magnify" size={18} color="#5f6a7d"/>
          <Text style={styles.searchPh}>Search products</Text>
        </Pressable>

        <View style={styles.actions}>
          <Button variant="ghost" size="icon" onPress={() => nav.navigate('Account' as never)}>
            <Icon name="account-outline" size={20} color="#111"/>
          </Button>
          <Button variant="ghost" size="icon" onPress={() => nav.navigate('Orders' as never)}>
            <Icon name="package-variant" size={20} color="#111"/>
          </Button>
          <View>
            <Button variant="ghost" size="icon" onPress={() => nav.navigate('Cart' as never)}>
              <Icon name="cart-outline" size={20} color="#111"/>
            </Button>
            {itemCount>0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{itemCount}</Text></View>
            )}
          </View>
        </View>
      </View>
      {/* MegaMenu is web-only; we skip on mobile */}
    </>
  );
}

const styles = StyleSheet.create({
  header:{ paddingTop:10, paddingBottom:8, paddingHorizontal:12, borderBottomWidth:1, borderColor:'#eee', backgroundColor:'#fff', flexDirection:'row', alignItems:'center', gap:10 },
  logoRow:{ flexDirection:'row', alignItems:'center', gap:6 },
  logoText:{ fontSize:18, fontWeight:'800' },
  search:{ flex:1, flexDirection:'row', alignItems:'center', gap:8, backgroundColor:'#f6f6f6', borderRadius:12, paddingHorizontal:10, paddingVertical:8, borderWidth:1, borderColor:'#eee' },
  searchPh:{ color:'#5f6a7d' },
  actions:{ flexDirection:'row', alignItems:'center', gap:4 },
  badge:{ position:'absolute', right:2, top:-2, backgroundColor:'#111', borderRadius:999, minWidth:16, height:16, alignItems:'center', justifyContent:'center', paddingHorizontal:3 },
  badgeText:{ color:'#fff', fontSize:10, fontWeight:'700' },
});
