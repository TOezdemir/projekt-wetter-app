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
        <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-blue-100"> 
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <input 
              type="text" 
              aria-label="Eingabefeld für Stadt" 
              placeholder="Stadt" 
              className="border border-gray-400 px-3 py-2 rounded-lg mr-2"
              onChange={(event) => setSearchText(event.target.value)} 
              value={searchText} 
            />
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
              onClick={() => setSubmit(!checkSubmit)}
            >
              Suche
            </button>
          </div>
          {weatherData && ( // Bedingtes Rendern der Wetterdaten
            <div>
              <p className="text-xl font-semibold mb-2">
                {description} in {searchText}
              </p>
              <p className="text-lg">Aktuell: {temperature}°C</p>
              <p className="text-lg">Windgeschwindigkeit: {windSpeed} m/std</p>
            </div>
          )}
        </div>
      </div>
    )}