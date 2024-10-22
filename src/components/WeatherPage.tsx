import FetchingFunction, { Weather } from "../lib/FetchingFunction"
import { FaRegHeart } from "react-icons/fa";
import RenderWeatherData from "./WeatherData";
import { ElementRef, useEffect, useRef, useState } from "react"

export default function WeatherPage(){
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
    const [searchText, setSearchText] = useState("Berlin")
	const language = "de";
	const inputRef = useRef<ElementRef<"input">>(null)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") { 
          fetchWeather();
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
		setSearchText("");
	}

    const fetchWeather  = async () => {
        const searchText = inputRef.current?.value
        if(searchText){
            setWeatherData(await FetchingFunction(searchText, language));
            inputRef.current!.value = ""
        }
    }

	useEffect(() => {
		fetchWeather();
	}, []);

    return(
        <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-blue-100"> 
			<div className="m-5">
				{buttonsLovedCitiesArray?.map((el: string) => {
  				return (
    				<button key={el}
					className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg m-5"
					onClick={()=> {setSearchText(el); fetchWeather();}
					}
					>{el}
					</button>
  				);
				})}
			</div>
			<div className="bg-white p-6 rounded-lg shadow-md">
          		<div className="mb-4">
            		<button className="mr-4 text-2xl" onClick={() => {safeCityQuerys(searchText); fetchWeather()}}><FaRegHeart /></button>
            		<input 
              				type="text" 
              				aria-label="Eingabefeld für Stadt" 
              				placeholder="Stadt"
							ref={inputRef}
              				className="border border-gray-400 px-3 py-2 rounded-lg mr-2"
              				onChange={(event) => setSearchText(event.target.value)}
			  				onKeyDown={handleKeyDown}
					/>
            		<button 
             				className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
              				onClick={() => fetchWeather()}
            		>
              		Suche
            		</button>
          		</div>
				{ weatherData?(
					<RenderWeatherData {...weatherData} />
				) : (<p>Beginne mit der Suche!</p>)
				}
      		</div>
		</div>
	)}