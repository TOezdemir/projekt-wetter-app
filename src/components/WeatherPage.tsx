import { useEffect } from "react"
import FetchingFunction, { Weather } from "../lib/FetchingFunction"

export default function WeatherPage(){
    useEffect(()=>{
        const weatherData: Weather = ()=>{
            FetchingFunction("Berlin", "de")
        })
    })
    return(
        <div>
        <div>
            <input type="text" aria-label="Eingabefeld für Stadt" placeholder="Stadt" />
            <button>Suche</button>
        </div>

        </div>

    )
}