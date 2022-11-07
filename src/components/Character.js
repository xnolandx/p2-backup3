import { React, useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import EventContext from "./EventContext"
import './Character.css'

function Character({character}) {

  const[eventURL, setEventURL] = useState('');
  const[eventData, setEventData] =useState([])
  const[imageURL, setImageURL] =useState('');
  const {setEventCon} = useContext(EventContext)

  useEffect(() => {
    fetch(`https://gateway.marvel.com/v1/public/characters?name=${character.name}&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventURL(data.data.results[0].events.collectionURI))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch(`${eventURL}?limit=100&ts=1&apikey=7e83ac0b463a8a08dd9a9d134ac0130a&hash=6576dc02e0ffad166dad1d8a3e0febfc`)
    .then(res => res.json())
    .then(data => setEventData(data.data.results))
    .catch(err => console.log(err))
  }, [eventURL])

  return (
    <>
     <div className="character-container">
      
          <h1 className='title'>{character.name} - ({character.biography['full-name']}) </h1>
          <h2 className='alignment'>Alignment: {character.biography.alignment} </h2>
          <div className='image'>
            <img className='image' src={character.image.url} alt=''/>
          </div>
          <h2 className='alignment'>Identification Number: {character.id} </h2>

      <div className='character-info-container'>
        <ul  className='character-bio'>
          Biographical Data:
              <li>Full Name: {character.biography['full-name']}</li>
              <li>Base(s) of Operation: {character.work.base}</li>
              <li>Occupation: {character.work.occupation}</li>
              <li>Place of Birth: {character.biography['place-of-birth']}</li>
              <li>Alter Egos: {character.biography['alter-egos']}</li>
              <li>Aliases:             
                {character.biography.aliases.map((alias, index) => (
                <> /{alias}/</>
              ))}  
              </li>
          </ul>

          <ul className='character-appearance'>
            Appearance: 
            <li>Species: {character.appearance.race} {character.appearance.gender} </li>
            <li>Height: {character.appearance.height[0]} </li>
            <li>Weight: {character.appearance.weight[0]} </li>
            <li>Eye Color: {character.appearance['eye-color']}</li>
            <li>Hair Color: {character.appearance['hair-color']}</li>
          </ul>

        <ul className='character-stats'>
          Stats: 
            <li>Intelligence: {character.powerstats.intelligence}</li>
            <li>Strength: {character.powerstats.strength}</li>
            <li>Speed: {character.powerstats.speed}</li>
            <li>Durability: {character.powerstats.durability}</li>
            <li>Power: {character.powerstats.power}</li>
            <li>Combat: {character.powerstats.combat}</li>
        </ul>

        <div className='character-stats-chart'>
        Characters stats charts/graphs would go here
        </div>

        <ul className='character-connections'>
          Connections:
          <li> Group-Affiliation: {character.connections['group-affiliation']} </li>
          <li> Relatives: {character.connections.relatives} </li>
        </ul>

        <div className='events-container'> 
        Events:
            <div className='character-events'>{
                (eventURL === '' ? <div>No known event data.</div> : 
                    eventData.map((event, index) => (
                        <Link to={`/events/${event.id}`} key={event.id} onClick={() => {
                            setEventCon(event)
                        }} className='event-link-text'>
                            
                            <div className='event-card' key={event.id}>
                                <h2>{event.title}</h2>
                                <img src={event.thumbnail.path +'.'+ event.thumbnail.extension} alt='' className='events-thumbnail'/>
                                <div className="event-text">
                                
                                </div>
                            </div>
                        </Link>
                    )))
            }
              
            </div>
        </div>
          
      </div>
    </div>
    </>
  )
}

export default Character