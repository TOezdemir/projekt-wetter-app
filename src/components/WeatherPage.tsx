import { useEffect, useState } from "react"
import FetchingFunction, { Weather } from "../lib/FetchingFunction"
import { WiCloudy, WiDaySunny, WiRain } from "react-icons/wi";
import { FaRegHeart } from "react-icons/fa";

export default function WeatherPage(){
	const [weatherData, setWeatherData] = useState<Weather>();
    const [searchText, setSearchText] = useState("Berlin")
    const [checkSubmit, setSubmit] = useState(false)
	const language = "de";
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") { 
          setSubmit(!checkSubmit);
        }
    }

	const buttonsLoved = localStorage.getItem("lovedCities");
	const buttonsLovedCitiesArray = JSON.parse(buttonsLoved!);
 
	function safeCityQuerys(lovedCity: string) {
		const cities = localStorage.getItem("lovedCities");
		if (cities) {
		  const cityArray: string[] = JSON.parse(cities);
		  if (!cityArray.includes(lovedCity))
		  	cityArray.push(lovedCity);
		  localStorage.setItem("lovedCities", JSON.stringify(cityArray));
		} else {
		  localStorage.setItem("lovedCities", JSON.stringify([lovedCity]));
		}
	}

	useEffect(() => {
		const fetchWeather  = async () => setWeatherData(await FetchingFunction(searchText, language));
		fetchWeather();
	}, [checkSubmit]);

	const temperature = weatherData?.main.temp
    const description = weatherData?.weather[0].description
    const windSpeed = weatherData?.wind.speed
    const name = weatherData?.name
    return(
        <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-blue-100"> 
		<div className="m-5">
		{buttonsLovedCitiesArray?.map((el: string) => {
  			return (
    			<button key={el}
				className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg m-5"
				onClick={()=> {
						setSearchText(el);
						setSubmit(!checkSubmit);
					}}
				>{el}
				</button>
  			);
		})}
		</div>
		<div className="bg-white p-6 rounded-lg shadow-md">
			<button
			onClick={() => {safeCityQuerys(searchText); setSubmit(!checkSubmit)}}
            ><FaRegHeart />
			</button>
          <div className="mb-4">
            <input 
              type="text" 
              aria-label="Eingabefeld für Stadt" 
              placeholder="Stadt"
			  id="input" 
              className="border border-gray-400 px-3 py-2 rounded-lg mr-2"
              onChange={(event) => {
					setSearchText(event.target.value);
				}
			  } 
              value={searchText}
			  onKeyDown={handleKeyDown}
            />
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
              onClick={() => {setSubmit(!checkSubmit)
			  }
			}
            >
              Suche
            </button>
          </div>
          {weatherData && (
            <div className="flex flex-col items-center">
                <div className="text-6xl mb-4">
                    {weatherData.weather[0].main === "Clear" && <WiDaySunny/>}
                    {weatherData.weather[0].main === "Clouds" && <WiCloudy/>}
                    {weatherData.weather[0].main === "Rain" && <WiRain/>}
                </div>
              <p className="text-xl font-semibold mb-2">
                {description} in {name}
              </p>
              <p className="text-lg">Aktuell: {temperature}°C</p>
              <p className="text-lg">Windgeschwindigkeit: {windSpeed} m/std</p>
            </div>
          )}
        </div>
      </div>
    )}