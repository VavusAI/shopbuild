import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type ParamList = { Product: { id: string } };
export default function ProductScreen() {
  const { params } = useRoute<RouteProp<ParamList, 'Product'>>();
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Product: {params.id}</Text>
    </View>
  );
}
