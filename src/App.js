import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Payal2000/Pokemon-Analysis/main/pokemon.csv")
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          complete: (result) => {
            const parsedData = result.data.map(entry => ({
              index: entry["number"],
              name: entry.pokemon_name,
              url: entry.pic_url
            }));
            setPokemons(parsedData);
          }
        });
      });
  }, []);

  return (
    <div className="app">
      <h1 className="header">Pokemedia</h1>
      <div className="grid">
        {pokemons.map(pokemon => (
          <Pokemon key={pokemon.index} {...pokemon} />
        ))}
      </div>
    </div>
  );
}

// function Pokemon({ index, name, url }) {
//   return (
//     <div className="pokemon">
//       <img src={url} alt={name} />
//       <div className="details">
//         <span className="index">#{index}</span>
//         <span className="name">{name}</span>
//       </div>
//     </div>
//   );
// }

function Pokemon({ index, name, url }) {
  return (
    <div className="pokemon">
      <div className="card">
        <div className="card-front">
          <img src={url} alt={name} />
          <div className="details">
            <span className="index">{index}</span>
            <span className="name">{name}</span>
          </div>
        </div>
        <div className="card-back">
          {/* Add whatever you'd like on the back here, or just leave blank */}
          <p>Back of card</p>
        </div>
      </div>
    </div>
  );
}


export default App;