import { AppRouter } from "./app/providers/";
import { TranslationsProvider } from "./app/providers/translations/TranslationsProvider";

function App() {
  return (
    <TranslationsProvider>
      <AppRouter />
    </TranslationsProvider>
  );
}

export default App;
