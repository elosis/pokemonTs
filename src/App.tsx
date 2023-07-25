import React from "react";
import { PokeProvider } from "./store/context";
import PokeLayer from "./components/layer";

function App() {
  return (
    <PokeProvider>
      <PokeLayer />
    </PokeProvider>
  );
}

export default App;
