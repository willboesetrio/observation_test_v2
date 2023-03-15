function TimerButtons (props) {
    return(
        <>
        <p>Timer buttons:</p>
        <button onClick={props.startTimer}>Start</button>
        <button onClick={props.stopTimer}>Stop</button>
        <button onClick={props.resetTimer}>Reset</button>
        <br /><br />
        </>
    )
}
export default TimerButtons