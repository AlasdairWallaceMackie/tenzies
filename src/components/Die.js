export default function Die(props){
    return (
        <div className="die shadow border bg-white text-center mx-1 my-4">
            <h1 className="die--value mt-2">{props.value}</h1>
        </div>
    )
}