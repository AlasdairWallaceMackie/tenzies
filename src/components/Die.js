export default function Die(props){
    const classes = "die shadow border text-center mx-1 my-4 " 
        + (props.isHeld ? "bg-success text-white" : "bg-white text-black")

    return (
        <div id={`die-${props.id}`} className={classes} onClick={props.onClick}>
            <h1 className="die--value mt-2">{props.value}</h1>
        </div>
    )
}