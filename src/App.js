import React from "react"
import Die from "./components/Die"

export default function App(){

    function allNewDice(){
        const newDice = []
        for (var i=1; i<=10; i++){
            newDice.push(
                {
                    id: i,
                    value: Math.ceil(Math.random() * 6 ),  //Random value from 1 to 6
                    isHeld: false,
                }
            )
        }
        return newDice
    }

    function toggleHold(diceId){
        return setDice(prevState => {
            return prevState.map(die => die.id===diceId ? {...die, isHeld: !die.isHeld} : {...die})
        })
    }

    const [dice, setDice] = React.useState(allNewDice())
    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            onClick={() => toggleHold(die.id)}
        />
    ))

    function reRoll(){
        setDice(prevDice => {
            return prevDice.map(
                die => die.isHeld ? {...die} : {...die, value: Math.ceil(Math.random() * 6 )}
            )
        })
    }


    return (
        <main className="m-5 p-5 rounded-3">
            <h1 className="text-center">Tenzies</h1>
            <div id="dice-grid" className="d-flex justify-content-evenly flex-wrap mb-5">
                {diceElements}
            </div>
            <div className="d-flex justify-content-center">
                <button id="roll-button" className="btn btn-lg btn-success shadow-lg px-5" onClick={reRoll}>Roll</button>
            </div>
        </main>
    )
}