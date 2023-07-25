import React from "react";
import { PokeContext, useContext } from "../store/context";
import PokeThumbnail from "./PokeThumbnail";

export default function PokeLayer() {
  const { pokeData, allPokes } = useContext(PokeContext);

  return (
    <div className="app-container">
      <h1>Pokemons</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {pokeData.poke.map((poke, index) => (
            <PokeThumbnail
              id={poke.id}
              name={poke.name}
              image={poke.sprites.other.dream_world.front_default}
              type={poke.types[0].type.name}
              key={index}
            />
          ))}
        </div>
        <button
          className="load-more"
          onClick={() => {
            allPokes();
          }}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
