import React from "react"
import Die from "./components/Die"

export default function App(){

    function getDiceNumber(){
        return Math.ceil(Math.random() * 6)
    }

    function allNewDice(){
        const newDice = []
        for (var i=1; i<=10; i++){
            newDice.push(
                {
                    id: i,
                    value: getDiceNumber(),  //Random value from 1 to 6
                    isHeld: false,
                }
            )
        }
        return newDice
    }

    function toggleHold(diceId){
        setDice(prevState => {
            return prevState.map(die => die.id===diceId ? {...die, isHeld: !die.isHeld} : {...die})
        })
    }

    const [tenzies, setTenzies] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())
    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            onClick={() => toggleHold(die.id)}
        />
    ))

    function WinModal(){
        return (
            <div id="win-modal" className="rounded-3 shadow-lg border bg-white position-absolute top-50 start-50 translate-middle text-center pt-5">
                <h1 className="display-3 mb-4">You Win!</h1>
                <button className="btn btn-lg btn-primary shadow" onClick={reRoll}>Play Again?</button>
            </div>
        )
    }

    function reRoll(){
        if (tenzies){
            setTenzies(prevState => prevState=false)
            setDice(prevDice => prevDice.map(die => ({...die, isHeld: false})))
        }

        setDice(prevDice => {
            return prevDice.map(
                die => die.isHeld ? {...die} : {...die, value: getDiceNumber()}
            )
        })
    }

    React.useEffect(() => {
        let hasWon = true

        if (dice[0].isHeld){
            let winningValue = dice[0].value

            for (var i=1; i<dice.length; i++){
                if ( !dice[i].isHeld || dice[i].value !== winningValue )
                    hasWon = false
            }

            setTenzies(prevState => prevState = hasWon)
        }
    }, [dice])

    const mainClasses = "m-5 p-5 rounded-3 "
        + (tenzies ? "disabled" : "")

    return (
        <>
            <main 
                className={mainClasses}
            >
                <h1 className="text-center">Tenzies</h1>
    
                <p className="text-center text-muted fs-4">Roll until all dice are the same value. Click each die to hold its value between rolls.</p>
    
                <div id="dice-grid" className="d-flex justify-content-evenly flex-wrap mb-4">
                    {diceElements}
                </div>
                
                <div className="d-flex justify-content-center">
                    <button id="roll-button" className="btn btn-lg btn-success shadow-lg px-5" onClick={reRoll}>Roll</button>
                </div>
    
            </main>
            {tenzies && <WinModal/>}
        </>
    )
}