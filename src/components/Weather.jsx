import { useState, useEffect } from "react";
import {getWeatherData} from '../service/WeatherService'

const Weather = () => {
    const [city, setCity] = useState("surat");
    const [message, setMessage] = useState("");
    const [weather, setWeather] = useState(null);

console.log(weather)

    useEffect(() => {
        const fetchWeatherData = async () => {
            const searchCity = city.trim() === "" ? "surat" : city;
            try {
                setMessage("");
                const response = await getWeatherData(searchCity);
                setWeather(response);
                
            } catch (err) {
                    setMessage(err.response?.data?.message || "Failed to get Weather data. Try again.");
                
            }
        }
        fetchWeatherData();
    }, [city])


    const handleChange = (e) => {
        e.preventDefault();
        setCity(e.target.value);
    }
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
          
          {/* Main Card Container with 'relative' class added */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 transition-all duration-300">
            
            {/* Smooth Floating Top Error Bar */}
            <div 
              className={`absolute left-0 right-0 -top-14 z-50 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium flex items-center space-x-2 transition-all duration-300 pointer-events-none shadow-md
                ${message ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'}`}
            >
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{message}</span>
            </div>

            {/* Header & City Search Input */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Weather Insights</h1>
                <p className="text-xs text-slate-400 mt-0.5">Real-time regional updates</p>
              </div>
              <div className="relative">
                <input 
                  type="search" 
                  name="city" 
                  value={city} 
                  onChange={handleChange} 
                  placeholder="Search city..."
                  className="w-full sm:w-48 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
      
            {/* Main Content Area */}
            {!weather ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-slate-400 tracking-wide">Fetching data...</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Primary View: City & Temperature */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      Location
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2 capitalize">{weather.city}</h2>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-inner">
                      <img 
                        className="w-16 h-16 object-contain filter drop-shadow-sm" 
                        src={weather.iconUrl} 
                        alt={weather.description || "weather logo"} 
                      />
                    </div>
                    <div className="flex items-start">
                      <span className="text-4xl font-black text-slate-900 tracking-tight">
                        {Math.round(weather.temperature)}
                      </span>
                      <span className="text-xl font-bold text-blue-500 ml-0.5">°C</span>
                    </div>
                  </div>
                </div>
      
                {/* Secondary Details Breakdown */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  
                  {/* Condition Info */}
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Condition</span>
                    <span className="text-sm font-semibold text-slate-700 mt-1 capitalize truncate">
                      {weather.description}
                    </span>
                  </div>
        
                  {/* Humidity Info */}
                  <div className="flex flex-col border-l border-slate-200 pl-4">
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Humidity</span>
                    <span className="text-sm font-semibold text-slate-700 mt-1">
                      {weather.humidity}%
                    </span>
                  </div>
        
                </div>
      
              </div>
            )}
          </div>
        </div>
    );
}
export default Weather;