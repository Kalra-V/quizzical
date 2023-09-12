import React from 'react';
import ReactDOM from 'react-dom/client';
import { nanoid } from 'nanoid'
import Questions from './components/Questions';
import Buttons from './components/Buttons';
import './App.css';



function App() {
  const [playingGame, setPlayingGame] = React.useState(true)
  const [quizData, setQuizData] = React.useState([]);
  const [isHeld, setIsHeld] = React.useState();
  const he = require("he")

  // CORRECT ANSWERS ARRAY, TO MATCH CORRECT ANSWERS
  const correctAnswers = [];
  for (let i = 0; i < quizData.length; i++) {
    correctAnswers.push(quizData[i].correct_answer)
  }
  console.log(correctAnswers)
  // FETCHING DATA
  const fetchQues = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
      .then(response => response.json())
      .then(data => {
        setQuizData(data.results);
      });
  };

  React.useEffect(() => {
    fetchQues();
  }, []);
  // Function to shuffle options
  function shuffleOptions(quizItem) {
    const options = [...quizItem.incorrect_answers, quizItem.correct_answer];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }

  function buttonClicked(value) {
    if (correctAnswers.includes(value)) {
      alert("CORRECT ANSWER!")
    } else {
      alert("WRONG ANSWER!")
    }
  }
  // MAIN RENDER RETURN
  return (
    // playingGame
    //   ?
    //   <div>
    //     <p>Quizzical App</p>
    //     <button onClick={() => setPlayingGame(false)}>Start Game</button>
    //   </div>
    //   :
    <div className='main-container'>
      {quizData.map((quizItem, index) => (
        <div key={index}>
          <div>
            {/* FIXED &#039 instead of '  */}
            <h2>{he.decode(quizItem.question)}</h2>
          </div>
          <div>
            {shuffleOptions(quizItem).map((eachOpt, j) => (
              <button onClick={() => buttonClicked(eachOpt)} className="btn btn-outline-dark" key={j}>{he.decode(eachOpt)}</button>
            ))}
          </div>
          <hr></hr>
        </div>
      ))}
      <button>Submit</button>
    </div>
  );
}



export default App;
