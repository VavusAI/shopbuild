// src/App.tsx
import React, { useEffect } from 'react';
import RootNavigator from './navigation/RootNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ENV } from './config/env.generated';
import { useCartStore } from './stores/cart';

const client = new QueryClient();
const pk = ENV.STRIPE_PUBLISHABLE_KEY;

export default function App() {
  useEffect(() => {
    // Avoid selector typing issues; run once on mount
    useCartStore.getState().hydrate();
  }, []);

  return (
    <StripeProvider publishableKey={pk}>
      <QueryClientProvider client={client}>
        <RootNavigator />
      </QueryClientProvider>
    </StripeProvider>
  );
}
