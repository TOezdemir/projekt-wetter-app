import { useEffect, useState } from "react"
import FetchingFunction, { Weather } from "../lib/FetchingFunction"

export default function WeatherPage(){
	const [weatherData, setWeatherData] = useState<Weather>();
    const [searchText, setSearchText] = useState("")
    const [checkSubmit, setSubmit] = useState(false)

	const query = "Berlin";
	const language = "de";
    
	useEffect(() => {
		const fetchWeather  = async () => setWeatherData(await FetchingFunction(query, language));
		fetchWeather();
	}, [query, ]);

	const check = weatherData?.main.temp
    return(
        <div>
        <div>
            <input onChange={(event)=>{
                setSearchText(event.target.value)}} value={searchText}
            type="text" aria-label="Eingabefeld für Stadt" placeholder="Stadt" />
            <button>Suche</button>
			<p>{check}</p>
        </div>

        </div>

    )
}