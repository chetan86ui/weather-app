import {useState} from 'react';
import "./Weather.scss";

const Weather = () => {
	let today = new Date();
	let date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
	const [input, setInput] = useState("");
	const [weather, setWeather] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const [tdate] = useState(date);

	const api = {
		url: "http://api.openweathermap.org/data/2.5/",
		key: "f688fe42e37946d84006b20a4c8fc358"
	};

	const iconURL = "http://openweathermap.org/img/w/";

	const getInput = (e) => {
		setInput(e.target.value)
	};

	const getWeatherData = (e) => {
		if(e.key === "Enter" && input === "") {
			setErrorMsg("Input cannot be empty");
			setError(true);
		}
		if(e.key === "Enter" && input !== "") {
			setIsLoading(true);
			setError(true);
			fetch(`${api.url}weather?q=${input}&units=metric&appid=${api.key}`)
			.then((response) => {
				if(!response.ok) {
					throw Error("Failed to Fetch Data");
				}
				return response.json();
			})
			.then ((data) => {
				console.log(data);
				setWeather(data);
				setIsLoading(false);
				setInput("");
				setError(false);
			})
			.catch((err) => {
				setError(true);
				setErrorMsg(err.message);
				setIsLoading(false);
				console.log(err.message);
			})
		}
	};

	return (
		<section className="--100vh --center-all">
			<div className="container weather --flex-center">
				<div className="weather-app --text-light">
					<h1>Weather App</h1>
					<p>Date: {tdate}</p>
					<div className="--form-control --my2">
						<input type="text" onChange={getInput} value={input} onKeyPress={getWeatherData} placeholder="Search City Name"/>
					</div>
					{error ? (
						<p className={errorMsg !== "" ? "error" : ""}>{errorMsg}</p>
					) : (
						<div className="result --card --my2">
							<h2>{weather.name}, {weather.sys.country}</h2>
							<div className="icon">
								<img src={iconURL + weather.weather[0].icon + ".png"} alt={weather.weather[0].main} />
							</div>
							<p>Temp: {Math.round(weather.main.temp)}°C / {Math.round(weather.main.temp * 9/5 + 32)} °F</p>
							<p>Weather: {weather.weather[0].main}</p>
							<p>Temp Range: {Math.round(weather.main.temp_min )}°C / {Math.round(weather.main.temp_max )}°C</p>
						</div>
					)}
					{isLoading && <h3>Loading...</h3>}
				</div>
			</div>
		</section>
	)
}

export default Weather
