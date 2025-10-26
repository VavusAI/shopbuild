import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ENV } from './config/env.generated';

const client = new QueryClient();
const pk = ENV.STRIPE_PUBLISHABLE_KEY;
export default function App() {
  return (
    <StripeProvider publishableKey={pk}>
      <QueryClientProvider client={client}>
        <RootNavigator />
      </QueryClientProvider>
    </StripeProvider>

  );
}
