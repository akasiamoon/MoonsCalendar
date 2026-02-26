import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = '88f3e35af62ba59bad38a3d346e0ca84';

  useEffect(() => {
    // This fetches the weather for your area
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Adamsville,TN&units=imperial&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => setWeather(data));
  }, []);

  if (!weather) return <div className="animate-pulse text-gold-500">Consulting the Stars...</div>;

  return (
    <div className="glass-panel gold-border p-4 flex items-center gap-4">
      <div className="text-4xl magic-glow">
        {weather.main.temp.toFixed(0)}°F
      </div>
      <div>
        <p className="uppercase tracking-widest text-xs opacity-70">Current Skies</p>
        <p className="font-bold text-[#D4AF37]">{weather.weather[0].description}</p>
      </div>
      {/* This adds a little animation if it's raining or clear */}
      <div className="text-3xl">
        {weather.weather[0].main === 'Rain' ? '🌧️' : '☀️'}
      </div>
    </div>
  );
};

export default WeatherWidget;
