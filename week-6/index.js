const API_KEY = "SECRET";

let weatherButton = document.getElementById("weather-button");

weatherButton.addEventListener("click", () => {
  let formInputText = document.getElementById("location").value;
  let endpoint = getEndpoint(formInputText);
  fetch(endpoint)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      let temp = calculateTempInF(myJson.main.temp);
      let weatherTraits = getWeatherTraits(myJson.weather);
      let weatherDesc = `The weather in ${myJson.name} is currently ${temp} degrees with ${weatherTraits}`;

      document.getElementById("weather-info__description").textContent = weatherDesc;
    });
});

let inputButton = document.getElementById("bin-input-button");

inputButton.addEventListener("click", () => {
  const httpBinURI = "http://httpbin.org/post";
  let binInputText = document.getElementById("bin-input").value;
  fetch(httpBinURI, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(binInputText)}
  )
  .then((res) => {
    return res.json();
  })
  .then((myJson) => {
    document.getElementById("bin-info__description").textContent = JSON.stringify(myJson);
  })

});


function isZipCode(input) {
  return input.length == 5 && !(isNaN(input))
}

function getEndpoint(input) {
  let weatherURL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
  weatherURL += isZipCode(input) ? `&zip=${input},us` : `&q=${input}`;
  return weatherURL;
}

function calculateTempInF(temp) {
  return Math.round(temp * (9/5) - 459.67);
}

function getWeatherTraits(weather) {
  let sentence = "";
  weather.forEach((obj, idx, weatherArray) => {
    if (idx == 0) {
      sentence += `${obj.description}`
      if (weatherArray.length == 1) {
        sentence += "!";
      } else {
        sentence += ",";
      }
    } else if (idx == weatherArray.length - 1) {
      sentence += ` and ${obj.description}!`;
    } else {
      sentence += ` ${obj.description},`;
    }
  });

  return sentence;
}