import { React, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Header from "./Header"


import Character from "./Character"
import Event from "./Event"

import CharacterContext from "./CharacterContext";
import EventContext from "./EventContext"

import './App.css';
import MainSearch from './MainSearch';


function App() {
  const[characterCon, setCharacterCon] = useState([]);
  const value = {characterCon, setCharacterCon};
  const[eventCon, setEventCon] = useState([]);
  const value2 = {eventCon, setEventCon};

  return (
    <>
    <Router>
     <Header/>
     <CharacterContext.Provider value={value}>
      <EventContext.Provider value={value2}>
        
          <Routes>
            <Route path="/" element={<MainSearch character={characterCon}/>}/>
            <Route path="/characters/:characterid" element={<Character character={characterCon}/>}/>
            <Route path="/events/:eventid" element={<Event event={eventCon}/>}></Route>
          </Routes>
        
        </EventContext.Provider>
      </CharacterContext.Provider>
      </Router>
     </>
  );
}

export default App;
