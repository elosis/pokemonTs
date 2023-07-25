import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

interface PokeData {
  poke: Pokemon[];
  setPoke: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  load: string;
  setLoad: React.Dispatch<React.SetStateAction<string>>;
  allPokes: () => Promise<void>;
}

interface ContextValue {
  pokeData: PokeData;
  allPokes: () => Promise<void>;
}

const defaultValue: PokeData = {
  poke: [],
  setPoke: () => {},
  load: "",
  setLoad: () => {},
  allPokes: async () => {},
};

const PokeContext = createContext<ContextValue>({
  pokeData: defaultValue,
  allPokes: async () => {},
});

const PokeProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [poke, setPoke] = useState<Pokemon[]>([]);
  const [load, setLoad] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const allPokes = async () => {
    try {
      const res = await axios.get(load);
      const data = res.data;
      console.log(res);
      console.log(data);

      setLoad(data.next);

      const pokeObject = async (result: { name: string }[]) => {
        await Promise.all(
          result.map(async (pokemon) => {
            const res = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const data: Pokemon = res.data;

            setPoke((cur) => [...cur, data]);
          })
        );
      };

      await pokeObject(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    allPokes();
  }, []);

  const pokeData: PokeData = {
    poke,
    load,
    setPoke,
    setLoad,
    allPokes,
  };

  const data: ContextValue = {
    pokeData,
    allPokes,
  };

  return (
    <PokeContext.Provider value={data}>{props.children}</PokeContext.Provider>
  );
};

export { PokeProvider, PokeContext, useContext };
