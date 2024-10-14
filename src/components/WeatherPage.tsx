import { useEffect, useState } from "react"
import FetchingFunction, { Weather } from "../lib/FetchingFunction"

export default function WeatherPage(){
	const [weatherData, setWeatherData] = useState<Weather>();

	const query = "Berlin";
	const language = "de";
    
	useEffect(() => {
		const fetchWeather  = async () => setWeatherData(await FetchingFunction(query, language));
		fetchWeather();
	}, []);

	const check = weatherData?.wind.speed;
    return(
        <div>
        <div>
            <input type="text" aria-label="Eingabefeld für Stadt" placeholder="Stadt" />
            <button>Suche</button>
			<p>{check}</p>
        </div>

        </div>

    )
}