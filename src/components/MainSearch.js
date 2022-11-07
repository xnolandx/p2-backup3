
import React, {useEffect, useState, useContext} from "react";
import {Link} from 'react-router-dom'
import CharacterContext from './CharacterContext'
import "./MainSearch.css"



const MainSearch =() => {
    const[characterData, setCharacterData] =useState()
    const [characterSearchTerm, setCharacterSearchTerm] = useState('')
    const {setCharacterCon} = useContext(CharacterContext)



    function characterFetch() {
        fetch(`http://0.0.0.0:8080/https://superheroapi.com/api/101087216157325/search/${characterSearchTerm}`)
        .then(res => res.json())
        .then(character => setCharacterData(character.results))
        .catch(err => console.log(err))
       }
     
return ( 

    <>
            <div className="search-container">
                <input 
                className="text-search-bar" 
                type='text' 
                placeholder="Search Enhanced Individuals" 
                onChange={(event) => {
                    setCharacterSearchTerm(event.target.value);
                }}
                /> 
                
                <button className="search-button" onClick={() => {
                    characterFetch()
                }}>Search
                </button>
            </div>



        <div className="characters-container">
            <div className="character-list">{
                (characterData === undefined ? <div> </div> : 
                    characterData.map((character, index) => (
                        <Link to={`/characters/${character.id}`} key={character.id} onClick={() => {
                            setCharacterCon(character)
                        }} className='link-text'>
                            
                            <div className='card' key={character.id}>
                                <img src={character.image.url} alt='' className='thumbnail'/>
                                <div className="character-text">
                                <h2>{character.name}</h2> *** 
                                </div>
                            </div>
                        </Link>
                    )))
            }</div>
        </div>
        
    </>
      
)}

export default MainSearch;






{/* <Link to={`/characters/${characterData.id}`} key={characterData.id} onClick={() => {
    setCharacterCon(characterData)
}} className='link-text'>
    
    <div className='card' key={characterData.id}>
        <img src={characterData.image.url} alt='' className='thumbnail'/>
        <div className="character-text">
        <h2>{characterData.name}</h2> *** 
        </div>
    </div>
</Link> */}