import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import './Event.css'
import CharacterContext from './CharacterContext'





 function EventCharacterSearch(event, character) {
  let eventCharactersURL = event.event.characters.collectionURI
  const[eventCharacters, setEventCharacters] =useState([]);
  const {setCharacterCon} = useContext(CharacterContext)
  // const[namesArray, setNamesArray] = useState([]);
  const[fetchResults, setFetchResults] = useState([]);
  // const[matchingResults, setMatchingResults] = useState([]);
  



  // 100 characters associated with the given event come from here on mount
  useEffect(() => {
    fetch(`${eventCharactersURL}?limit=100&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventCharacters(data.data.results))
  }, [])

  let namesArray = [] 

  let matchingResults = []



useEffect(() => {
  eventCharacters.map((event) => {
    namesArray.push(event.name)
  })

  Promise.all(
      namesArray.map(name => 
        fetch(`https://www.superheroapi.com/api.php/101087216157325/search/${name}`)
        .then(res => res.json())
        .catch(err => console.log(err))
        )
    ).then(data => setFetchResults(data))
    console.log('fetch results: ', fetchResults)
}, [])


  fetchResults.map(result => {
    if (result.response === 'success'){
      matchingResults.push(result)
      console.log('match results: ', matchingResults)
    }})






  return (
<>


          Assosciated Characters:
          <div className="event-characters-container">
            <div className="event-character-list">{
                (matchingResults.length === 0 ? <div>Loading... </div> : 
                    matchingResults.map((character, index) => (
                        <Link to={`/characters/${character.results[0].id}`} key={character.results[0].id} onClick={() => {
                            setCharacterCon(character.results[0])
                        }} className='link-text'>
                            <ul className='card' key={character.results[0].id}>
                                <li>{character.results[0].name}</li> *** 
                            </ul>
                        </Link>
                    )))
            }</div>
        </div>
          
        


        </>
  )

}

export default EventCharacterSearch;

