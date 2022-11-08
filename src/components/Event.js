import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import './Event.css'
import CharacterContext from './CharacterContext'


function Event(event, character) {
  let eventCharactersURL = event.event.characters.collectionURI
  const[eventCharacters, setEventCharacters] =useState([]);
  const[eventCharacterFetchStatus, setEventCharacterFetchStatus] =useState('')
  const[EventCharacter, setEventCharacter] =useState('');
  const {setCharacterCon} = useContext(CharacterContext)

  // 100 characters associated with the given event come from here on mount
  useEffect(() => {
    fetch(`${eventCharactersURL}?limit=100&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventCharacters(data.data.results))
  }, [])

  function eventCharacterFetch(eventCharacterName) {
    fetch(`https://www.superheroapi.com/api.php/101087216157325/search/${eventCharacterName}`)
    .then(res => res.json())
    .then(data => setEventCharacterFetchStatus(data.response))
   }
   
  // useEffect(() => {
  //   eventCharacterFetch(EventCharacter)
  // }, [EventCharacter])




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
            <div className='event-assosciated-characters'>{
              (eventCharacters.length === 0 ? <div>Loading...</div> : 
              eventCharacters.map(eventCharacter => {
                
                
              })


              
            )}
            
            </div>
        </div>
      </div>
    </div>
  )
}

export default Event

// eventCharacterFetchStatus === 'success' ?
// console.log('yup') :
// console.log('nope')

{/* <Link to={`/characters/${character.id}`} key={character.id} onClick={() => {
setCharacterCon(EventCharacter)
}}> </Link>  */}