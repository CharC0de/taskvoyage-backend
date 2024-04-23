import { PaperProvider } from 'react-native-paper';
import Router from './router/Router';

export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}