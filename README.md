# 🌦️ WeatherApp — React Native (Expo)
WeatherApp is a modern and intuitive weather application built using React Native and Expo.
The app provides real-time weather data, hourly forecasts, 5-day forecasts, dynamic backgrounds, multilingual support, and city management — all in a clean, smooth user experience.

----

## ✨ Features
📍 Automatic Location Detection
   * On app launch, WeatherApp immediately requests access to the user’s current location.
   * Displays current weather, hourly forecast, and 5-day forecast based on the detected location.

## 🌈 Dynamic Backgrounds
Beautiful background images that change depending on:
* Current weather conditions (sunny, cloudy, rainy, snow, etc.)
* Time of day (day / night)

## 📊 Weather Information
* Current Weather: Temperature, condition, humidity, wind, and more.
* Hourly Forecast: Weather predictions for the next 24 hours.
* 5-Day Forecast: Daily summaries with icons and temperatures.

## ⚙️ Settings Drawer
 Accessible via a right-side drawer menu. Allows users to:
* Change language
* Change temperature units (°C / °F)

## 🏙️ City Management
Navigate to the City Management screen from the settings.
Features include:
* City search input
* List of previously searched cities
* Swipe left/right to delete a city
* Tap a city to view its detailed weather info

City Detail View shows:
* Current weather of selected city
* Hourly + 5-day forecasts

## 📱 Built With Expo
* Uses Expo for seamless development, testing, and deployment.
* Supports Android, iOS, and web (optional).

---

## 🧪 Technologies Used

* React Native
* Expo
* React Navigation (for drawer and screen navigation)
* Expo Location API (for location access)
* Weather API of your choice (OpenWeatherMap, WeatherAPI, etc.)
* AsyncStorage (for city list persistence)
* Reanimated & Gesture Handler (for swipe gestures)

  ---

  ## ⚙️ Installation & Setup

```bash

# Clone the repository
git clone https://github.com/bgshettigar95/weather-app.git

# Navigate into the folder
cd weather-app

# Install dependencies
npm install

# Start the development server
expo start

```

## 🔧 Configuration
Environment Variables
Create a .env file for your API key:

API_KEY=your_api_key_here

----

📸 Preview
---
<img src="https://github.com/user-attachments/assets/997b0df0-96fe-4567-9b36-bddb6c75b21e" width="240" />
<img src="https://github.com/user-attachments/assets/1c783f15-5140-410e-adf4-40f34eeccf8b" width="240" />
<img src="https://github.com/user-attachments/assets/4c940fd0-777a-4e2b-a61e-a5b3d71c49f0" width="240" />
<img src="https://github.com/user-attachments/assets/1a6cfd56-56f7-4dff-8b7e-7675ee7bc1aa" width="240" />




