import { useState, useRef } from 'react';
import './App.css'
import { shuffle } from './helperFunctions'
import TimerButtons from './TimerButtons';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [targetNumber, setTargetNumber] = useState(1);
  const [evensArr, setEvensArr] = useState([]);
  const [oddsArr, setOddsArr] = useState([]);
  const [oddClicks, setOddClicks] = useState(0);
  const [evenClicks, setEvenClicks] = useState(0);

  const timerId = useRef();


  const startTimer = () => {
    timerId.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000)
    console.log('started timer')
  }

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    console.log('stopped timer')
  }

  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      setSeconds(0);
    }
    console.log('reset timer')
  }

  const odds = [];
  for(let i = 1; i <= 25; i+=2) {
    odds.push(i);
  }
  const evens = [];
  for(let i = 2; i <= 24; i+=2) {
    evens.push(i);
  }

  const startGame = () => {
    if(isGameRunning === false){
      startTimer();
    }
    if(isGameRunning === true){
      resetTimer();
      startTimer();
    }
    setEvenClicks(0);
    setOddClicks(0);
    setEvensArr(shuffle(evens))
    setOddsArr(shuffle(odds))
    setTargetNumber(1);
    setIsGameRunning(true);
    }
  

  const clickFunction = (event) => {
    if (event.target.value == targetNumber) {
      setTargetNumber(targetNumber + 1)
      if (event.target.value % 2 === 0) {
        setEvenClicks(evenClicks + 1)
      } if (event.target.value % 2 !== 0) {
        setOddClicks(oddClicks + 1)
      }
    } else {
      if (event.target.value % 2 === 0) {
        setEvensArr(shuffle(evens))
        setEvenClicks(evenClicks + 1)
      } if (event.target.value % 2 !== 0) {
        setOddsArr(shuffle(odds))
        setOddClicks(oddClicks + 1)
      }
    } 
  }

  const winMessage = () => {
    if (targetNumber > 25) {
      stopTimer();
      return(
        <div>
          <h1>WINNER</h1>
          <p>your score: 25 / {oddClicks + evenClicks} = {25/(oddClicks + evenClicks) * 100}%</p>
          <p>TIME: {seconds} seconds</p> 
        </div>
      )
    }
  }


const evensRender = evensArr.map((n) =>
  <button className='nb' key={n} value={n} onClick={clickFunction} disabled={n < targetNumber} >{n}</button>
);

const oddsRender = oddsArr.map((n) =>
  <button className='nb' key={n} value={n} onClick={clickFunction} disabled={n < targetNumber} >{n}</button>
);


  return (
    <main className="App">
        {/* <p>timer buttons:</p>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
        <br /><br /> */}
        <TimerButtons 
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
        />
        <button onClick={startGame}>START GAME</button>
        <br /><br />

        <div className='container1'>{isGameRunning && oddsRender}</div>

        <br /><br /><hr /><br />

        <div className='container2'>{isGameRunning && evensRender}</div>

      <br /><br />
      <p>Seconds: {seconds}</p>

      {winMessage()}

    </main>
  );
}

export default App;

