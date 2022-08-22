import React from "react"
import Die from "./components/Die"

export default function App(){

    function allNewDice(){
        const randValues = []
        for (var i=1; i<=10; i++){
            randValues.push( Math.ceil(Math.random() * 6 ) ) //Random value from 1 to 6
        }
        return randValues
    }

    const [dice, setDice] = React.useState(allNewDice())
    const diceElements = dice.map(val => (<Die value={val}/>))

    function resetDice(){
        setDice(prevDice => prevDice = allNewDice())
    }

    return (
        <main className="m-5 p-5 rounded-3">
            <h1 className="text-center">Tenzies</h1>
            <div id="dice-grid" className="d-flex justify-content-evenly flex-wrap mb-5">
                {diceElements}
            </div>
            <div className="d-flex justify-content-center">
                <button id="roll-button" className="btn btn-lg btn-success shadow" onClick={resetDice}>Roll</button>
            </div>
        </main>
    )
}