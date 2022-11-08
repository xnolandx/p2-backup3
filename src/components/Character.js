import { React, useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import EventContext from "./EventContext"
import './Character.css'
import BarChart from './BarChart'




  

function Character({character}) {

  const[eventURL, setEventURL] = useState('');
  const[eventData, setEventData] =useState([])
  const {setEventCon} = useContext(EventContext)

  const [powerData, setPowerData] = useState({
    labels: ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat'],
    datasets: [{
      label: "Power Level",
      data: [
        character.powerstats.intelligence, 
        character.powerstats.strength, 
        character.powerstats.speed,
        character.powerstats.durability,
        character.powerstats.power,
        character.powerstats.combat
      ], 
      backgroundColor: [
        'rgba(10,175,101, 0.3)'
      ], 
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(245, 66, 66)',
      borderWidth: 1,
      borderColor: 'grey', 
      rAxisID: 'r',
    }, 
    {
      label: "Power Level",
      data: [
        character.powerstats.intelligence, 
        character.powerstats.strength, 
        character.powerstats.speed,
        character.powerstats.durability,
        character.powerstats.power,
        character.powerstats.combat
      ], 
      backgroundColor: [
        'rgba(10,175,101, 0.3)'
      ], 
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(245, 66, 66)',
      borderWidth: 1,
      borderColor: 'grey', 
      rAxisID: 'r',
    }]
    
  })

  

  








  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  

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
      
          <h1 className='title'>{character.name}  </h1>
          <h2 className='alignment'>Alignment: {character.biography.alignment} </h2>
          <div className='image'>
            <img className='image' src={character.image.url} alt=''/>
          </div>
          <h2 className='alignment'>Identification Number: {character.id} </h2>

      <div className='character-info-container'>
        <ul key='a' className='character-bio'>
          Biographical Data:
              <li key='a'>Full Name: {character.biography['full-name']}</li>
              <li key='b'>Base(s) of Operation: {character.work.base}</li>
              <li key='c'>Occupation: {character.work.occupation}</li>
              <li key='d'>Place of Birth: {character.biography['place-of-birth']}</li>
              <li key='e'>Alter Egos: {character.biography['alter-egos']}</li>
              <li key='f'>Aliases:             
                {character.biography.aliases.map((alias, index) => (
                <> /{alias}/</>
              ))}  
              </li>
          </ul>

          <ul key='b' className='character-appearance'>
            Appearance: 
            <li key='g'>Species: {character.appearance.race} {character.appearance.gender} </li>
            <li key='h'>Height: {character.appearance.height[0]} </li>
            <li key='i'>Weight: {character.appearance.weight[0]} </li>
            <li key='j'>Eye Color: {character.appearance['eye-color']}</li>
            <li key='k'>Hair Color: {character.appearance['hair-color']}</li>
          </ul>

        <ul key='c'className='character-stats'>
          Stats: 
            <li key='l'>Intelligence: {character.powerstats.intelligence}</li>
            <li key='m'>Strength: {character.powerstats.strength}</li>
            <li key='n'>Speed: {character.powerstats.speed}</li>
            <li key='o'>Durability: {character.powerstats.durability}</li>
            <li key='p'>Power: {character.powerstats.power}</li>
            <li key='q'>Combat: {character.powerstats.combat}</li>
        </ul>

        <div className='chart-container'>
          <BarChart chartData={powerData}  />
        </div>







        <ul key='d' className='character-connections'>
          Connections:
          <li key='r'> Group-Affiliation: {character.connections['group-affiliation']} </li>
          <li key='s'> Relatives: {character.connections.relatives} </li>
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