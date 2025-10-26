import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.wrap}>
      <View style={styles.grid}>
        <Column title="Customer Service" items={['Help Center','Returns & Refunds','Shipping Info','Contact Us']} />
        <Column title="About" items={['About Us','Careers','Press','Blog']} />
        <Column title="Legal" items={['Terms of Service','Privacy Policy','Cookie Policy','Accessibility']} />
        <View>
          <Text style={styles.h3}>Preferences</Text>
          <Text style={styles.sub}>Language • Currency</Text>
        </View>
      </View>
      <Text style={styles.copy}>© {new Date().getFullYear()} Marketplace. All rights reserved.</Text>
    </View>
  );
}

function Column({title, items}:{title:string; items:string[]}) {
  return (
    <View>
      <Text style={styles.h3}>{title}</Text>
      {items.map((t)=> <Text key={t} style={styles.link}>{t}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ borderTopWidth:1, borderColor:'#eee', backgroundColor:'#fafafa', paddingHorizontal:16, paddingVertical:24 },
  grid:{ gap:16 },
  h3:{ fontWeight:'700', marginBottom:8 },
  link:{ color:'#5f6a7d', marginBottom:6 },
  sub:{ color:'#5f6a7d' },
  copy:{ textAlign:'center', color:'#5f6a7d', marginTop:16, borderTopWidth:1, borderColor:'#eee', paddingTop:16, fontSize:12 },
});
