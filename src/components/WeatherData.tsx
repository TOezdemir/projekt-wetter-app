import { Weather } from "../lib/FetchingFunction";
import { WiCloudy, WiDaySunny, WiRain } from "react-icons/wi";

export default function RenderWeatherData(props: Weather){
	
	return <div className="flex flex-col items-center">
	<div className="text-6xl mb-4">
		{props.weather[0].main === "Clear" && <WiDaySunny/>}
		{props.weather[0].main === "Clouds" && <WiCloudy/>}
		{props.weather[0].main === "Rain" && <WiRain/>}
	</div>
  <p className="text-xl font-semibold mb-2">
	{props.name}
  </p>
  <p className="text-lg">Aktuell: {props.main.temp}°C</p>
  <p className="text-lg">Windgeschwindigkeit: {props.wind.speed} m/std</p>
</div>
}