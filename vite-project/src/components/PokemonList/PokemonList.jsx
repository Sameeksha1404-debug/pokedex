import axios from 'axios'
 import {useEffect, useState} from 'react'
 import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'
function PokemonList(){
   

const [pokemonList,setPokemonList]=useState([])
const [isLoading,setLoading]=useState([true])

const [pokedexUrl,setPokedexUrl]=useState("https://pokeapi.co/api/v2/pokemon" );

const [nextUrl,setNextUrl]=useState('');

const [prevUrl,setPrevUrl]=useState('');

async function downloadedPokemon(){
    const response=await axios.get(pokedexUrl)//this download thelist of 20 pokemons
    console.log(response);

const pokeResults = response.data.results;//weget the array of pokemons from result
console.log(pokeResults)//array of object 20 pokemon

console.log(response.data)
setNextUrl(response.data.next)
setPrevUrl(response.data.previous)


//iterating over the array of pokemons,and using their url,to create an array of promises
//that will download those 20 pokemons
const pokemonResultPromise= pokeResults.map((pokemon)=>{ return axios.get(pokemon.url)}//return the url of every pokemon
   //every pokemon url  console.log(pokemon.url)//retutn the array of promises of 20 pokemon
)
console.log(pokemonResultPromise)
const pokemonData=await axios.all(pokemonResultPromise);//array of 20 pokemon on deatailed data
console.log(pokemonData)


//
 const pokeListResult=pokemonData.map((pokeData)=>{
     const pokemon= pokeData.data;
    console.log(pokemon);
    return {
        id:pokemon.id,
        name:pokemon.name,
        image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
        types:pokemon.types
    }
})
 
    console.log(pokeListResult);//print all the 20 pokemon list wit id , name,image

setPokemonList(pokeListResult)//pushing th each pokemon object in the user state array i.e pokemon list
setLoading(false);
 }
 useEffect(()=>{
    downloadedPokemon();
},[pokedexUrl])



return(
    <div className='pokemon-list-wrapper'>
     <div></div>
       <div className='pokemon-wrapper'>
      
      
         {(isLoading)?'Loading':pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
       </div>
       <div className='controls'>
        <button disabled={prevUrl===null} onClick={ ()=> setPokedexUrl(prevUrl)} > prev</button>
       
        <button disabled ={nextUrl===null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
       </div>



    </div>

);
}


export default PokemonList