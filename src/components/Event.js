import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import './Event.css'
import CharacterContext from './CharacterContext'


function Event(event) {
  let eventCharactersURL = event.event.characters.collectionURI
  const[eventCharacters, setEventCharacters] =useState([]);
  const[eventCharacter, setEventCharacter] =useState('');
  const[characterData, setCharacterData] =useState()
  const [characterSearchTerm, setCharacterSearchTerm] = useState('')
  const {setCharacterCon} = useContext(CharacterContext)

  useEffect(() => {
    fetch(`${eventCharactersURL}?limit=100&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventCharacters(data.data.results))
  }, [])

  function eventCharacterFetch() {
    fetch(`http://0.0.0.0:8080/https://superheroapi.com/api/101087216157325/search/${characterSearchTerm}`)
    .then(res => res.json())
    .then(character => setCharacterData(character.results))
    .catch(err => console.log(err))
   }

console.log(eventCharacters)

  return (
    <div className='event-container'>

      <h1 className='title'>{event.event.title}</h1>
      <div className='image'>
            <img className='image' src={event.event.thumbnail.path +'.'+ event.event.thumbnail.extension} alt=''/>
      </div>
      <h2 className='event-id-num'>Event Identification Number: {event.event.id} </h2>

      <ul className='event-description'>
        Description:
        <li> {event.event.description}</li>
      </ul>

      <div className='event-info-container'>

        <ul className='event-timeline'>
          Event Timeline:
          <li>Start: {event.event.start}</li>
          <li>End: {event.event.end}</li>
        </ul>

        <ul className='event-assosciated-characters'>
          Assosciated Characters:
          <li> Not sure how team wants to handle this. </li>
        </ul>


        <div className='assosciated-characters-container'> 
        Associated Characters:
            <ul className='event-assosciated-characters'>{
                (eventCharacters.length === 0 ? <div>Loading...</div> : 
                    eventCharacters.map((character, index) => (

                      // <Link to={`/characters/${character.id}`} key={character.id} onClick={() => {
                      //   setCharacterSearchTerm(character)
                      
                      // }} className='link-text'>
                        
                      //   <div className='card' key={character.id}>
                      //       <img src={character.image.url} alt='' className='thumbnail'/>
                      //       <div className="character-text">
                      //       <h2>{character.name}</h2> *** 
                      //       </div>
                      //   </div>
                      // </Link> 
                      <li key={character.id}>{character.name}</li>
                    )))
            }
              
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Event


//gutted link from within map:

{/* <Link to={`/characters/${character.id}`} key={character.id} onClick={() => {
  setCharacterCon(character)
}} className='link-text'>
  
  <div className='card' key={character.id}>
      <img src={character.image.url} alt='' className='thumbnail'/>
      <div className="character-text">
      <h2>{character.name}</h2> *** 
      </div>
  </div>
</Link>  */}