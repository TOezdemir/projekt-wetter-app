
const appid = "f533ff7ec8fcde5cbf6bb9fd15401a98"

export interface Weather{
    weather: [
        {
            main: string,
            description: string
        }
    ]
    main: {
        temp: number
    },
    wind: {
        speed: number
    }
    name: string
} 

export default async function FetchingFunction(query: string, lang: string): Promise<Weather | undefined> {
    try{    
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}&units=metric&lang=${lang}`)
        const data = await response.json() as Weather
        console.log(data)
        if(!data.main.temp){
            throw new Error("Kapuuuutt")
        }
        return data
    } catch(err){
        console.error(err)
    }
}

