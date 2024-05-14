import React, { useState, useReducer } from 'react'
import friendlyWords from 'friendly-words'
import "./App.css"

let backgrounds = [
  'Noble',
  'Urchin',
  'Folk Hero',
  'Acolyte',
  'Criminal',
  'Hermit',
  'Guild Artisan',
  'Sage',
]

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

function randomName() {
  let array = friendlyWords.predicates
  let string = array[Math.floor(Math.random() * array.length)]
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export default function App() {
  
  let [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "SET_BACKGROUND": {
        return { ...state, background: action.value, error: null }
      }
      case "NONEXISTENT_BACKGROUND": {
        return { ...state, error: 'This background does NOT exist.' }
      }
      case "TOGGLE_DARK_MODE": {
        return { ...state, darkMode: !state.darkMode }
      }
      case "INPUT_NAME": {
        return { ...state, name: action.value }
      }
      case "NAME_TOO_LONG": {
        return { ...state, error: 'Name is WAY too long, bucko' }
      }
      case "DISMISS_ERROR": {
        return { ...state, error: null }
      }
      case "RANDOMIZE_VALS": {
        return { ...state, name: randomName(), background: randomBackground() }
      }
    }
  }, {
    darkMode: false,
    name: '',
    background: '',
    error: null
  })
  
  let { darkMode, name, background, error } = state

  function handleBackgroundSelect(event) {
    let value = event.target.value
    dispatch({ type: "SET_BACKGROUND", value })
    if (!backgrounds.includes(value)) {
      dispatch({ type: "NONEXISTENT_BACKGROUND" })
    }
  }

  return (
    <>
      <div className={`App ${darkMode ? 'darkmode' : ''}`}>
        <button
          onClick={() => {
            dispatch({ type: "TOGGLE_DARK_MODE" })
          }}
        >
          Dark Mode {darkMode ? 'ON' : 'OFF'}
        </button>{' '}
        <br />
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(event) => {
            dispatch({ type: "INPUT_NAME", value: event.target.value })
            if (event.target.value.length > 15) {
              dispatch({ type: "NAME_TOO_LONG" })
            }
          }}
        />
        <select value={background} onChange={handleBackgroundSelect}>
          {backgrounds.map((b) => {
            return <option key={`bg-${b}`}>{b}</option>
          })}
        </select>
        {error && (
          <div className="error">
            {error}
            <button
              onClick={() => {
                dispatch({ type: "DISMISS_ERROR" })
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="sheet">
          <h3>Name: {name}</h3>
          <h3>Background: {background}</h3>
        </div>
        <button
          onClick={() => {
            dispatch({ type: "RANDOMIZE_VALS" })
          }}
        >
          Do it all for me instead
        </button>
      </div>
    </>
  )
}
