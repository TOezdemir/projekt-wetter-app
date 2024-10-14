import { useEffect, useState } from "react"
import FetchingFunction, { Weather } from "../lib/FetchingFunction"

export default function WeatherPage(){
	const [weatherData, setWeatherData] = useState<Weather>();
    const [searchText, setSearchText] = useState("Berlin")
    const [checkSubmit, setSubmit] = useState(false)

	// const query = "Berlin";
	const language = "de";
    
	useEffect(() => {
		const fetchWeather  = async () => setWeatherData(await FetchingFunction(searchText, language));
		fetchWeather();
	}, [checkSubmit]);

	const temperature = weatherData?.main.temp
    const description = weatherData?.weather[0].description
    const windSpeed = weatherData?.wind.speed
    return(
        <div>
        <div>
            <input onChange={(event)=>{
                setSearchText(event.target.value)}} value={searchText}
            type="text" aria-label="Eingabefeld für Stadt" placeholder="Stadt" />
            <button onClick={()=>{setSubmit(!checkSubmit)}}>Suche</button>
			<p>{description} in {searchText}</p>
        </div>
        <p>Aktuell: {temperature}°C</p>
        <p>Windgeschwindigkeit: {windSpeed} m/std</p>
        </div>

    )
}