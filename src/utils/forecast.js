const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=36e51fbe2ea3a26769c2a6a5ebc02bb1&query=${lattitude.toString()},${longitude.toString()}&units=f`;

  request({ url, json:true }, (error, { body } = res) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);

    } else if (body.error ) {
      callback('Unable to get forecast, try another search.');
      
    } else {
      // callback(undefined, {
      //   weatherDescription: res.body.current.weather_descriptions,
      //   locationName: res.body.location.name,
      //   temperature: res.body.current.temperature,
      //   feelsLikeTemperature: res.body.current.feelslike,
      // });

      callback(undefined, `${body.current.weather_descriptions}.  It is currently ${body.current.temperature} out, but it feels like ${body.current.feelslike}.`);

    }
  });
}

module.exports = forecast;