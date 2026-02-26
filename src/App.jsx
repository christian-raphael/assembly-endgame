import React from "react"
import { languages } from "./languages"
import { clsx } from "clsx"

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react")
  const [guessedLetters, setGuessedLetters] = React.useState([])

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageElements = languages.map(lang => {
    const styles={
      backgroundColor: lang.backgroundColor, 
      color: lang.color
    }
    return (<span key={lang.name} className="chip" style={styles}>{lang.name}</span>)
  })

  const letterElements = currentWord.split('').map((letter, index) => (
    <span key={index}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ))

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button 
        key={letter} 
        onClick={() => {addGuessedLetter(letter)}}
        className={className}
      >
          {letter.toUpperCase()}
      </button>
    )
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h2>You Win!</h2>
        <p>Well done! 🎉</p>
      </section>

      <section className="language-chips">
        {languageElements}
      </section>
      
      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>
    </main>
  )
}