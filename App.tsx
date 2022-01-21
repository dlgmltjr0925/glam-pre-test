import { QueryClient, QueryClientProvider } from 'react-query';

import Navigation from './src/navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

axios.defaults.baseURL = 'https://test.dev.cupist.de';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
