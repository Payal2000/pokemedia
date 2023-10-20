// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';
// import './App.css';

// function App() {
//   const [pokemons, setPokemons] = useState([]);

//   useEffect(() => {
//     fetch("https://raw.githubusercontent.com/Payal2000/Pokemon-Analysis/main/pokemon.csv")
//       .then(response => response.text())
//       .then(data => {
//         Papa.parse(data, {
//           header: true,
//           complete: (result) => {
//             const parsedData = result.data.map(entry => ({
//               index: entry["number"],
//               name: entry.pokemon_name,
//               url: entry.pic_url
//             }));
//             setPokemons(parsedData);
//           }
//         });
//       });
//   }, []);

//   return (
//     <div className="app">
//       <h1 className="header">Pokemedia</h1>
//       <div className="grid">
//         {pokemons.map(pokemon => (
//           <Pokemon key={pokemon.index} {...pokemon} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // function Pokemon({ index, name, url }) {
// //   return (
// //     <div className="pokemon">
// //       <img src={url} alt={name} />
// //       <div className="details">
// //         <span className="index">#{index}</span>
// //         <span className="name">{name}</span>
// //       </div>
// //     </div>
// //   );
// // }

// function Pokemon({ index, name, url }) {
//   return (
//     <div className="pokemon">
//       <div className="card">
//         <div className="card-front">
//           <img src={url} alt={name} />
//           <div className="details">
//             <span className="index">{index}</span>
//             <span className="name">{name}</span>
//           </div>
//         </div>
//         <div className="card-back">
//           {/* Add whatever you'd like on the back here, or just leave blank */}
//           <p>Back of card</p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState('All');
  const [filterValue, setFilterValue] = useState('All');

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
              url: entry.pic_url,
              attack: entry.attack,
              defense: entry.defense,
              stamina: entry.stamina,
              cpRange: entry.cp_range,
              hpRange: entry.hp_range,
              mainType: entry.main_type, // Assuming these fields exist
              secondaryType: entry.secondary_type,
              region: entry.region,
              category: entry.category
            }));
            setPokemons(parsedData);
          }
        });
      });
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => {
    if (filterValue === 'All') return true;
    return pokemon[filter] === filterValue;
  });

  return (
    <div className="app">
      <h1 className="header">Pokemedia</h1>
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="mainType">Main Type</option>
          <option value="secondaryType">Secondary Type</option>
          <option value="region">Region</option>
          <option value="category">Category</option>
        </select>
        <select onChange={(e) => setFilterValue(e.target.value)}>
          <option value="All">All</option>
          {/* Dynamically generate options based on filter */}
          {[...new Set(pokemons.map(pokemon => pokemon[filter]))].map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className="grid">
        {filteredPokemons.map(pokemon => (
          <Pokemon key={pokemon.index} {...pokemon} />
        ))}
      </div>
    </div>
  );
}

function Pokemon({ index, name, url, attack, defense, stamina, cpRange, hpRange }) {
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
          <div className="stat">Attack: {attack}</div>
          <div className="stat">Defense: {defense}</div>
          <div className="stat">Stamina: {stamina}</div>
          <div className="stat">CP Range: {cpRange}</div>
          <div className="stat">HP Range: {hpRange}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
