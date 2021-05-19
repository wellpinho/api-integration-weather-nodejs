require('dotenv').config()
const express = require('express')
const request = require('request')
const app = express()
const cors = require('cors')

app.use(cors())

const city = 'Florianopolis'
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
let data = ''

request(apiUrl, (err, res, body) => {
  if (err) {
    console.log('Error: ', err)
  }

  let weather = JSON.parse(body)

  data = `
    Dados Metereológicos para ${city}:
    -Temperatura: ${weather.main.temp}ºc
    -Velocidade vento:  ${weather.wind.speed}~
    -Temp Máxima: ${weather.main.temp_max}ºC
    -Temp Minima: ${weather.main.temp_min}ºC
    -Humidade: ${weather.main.humidity}%
  `

  return data
})

const http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200,{'Content-Type':'text/json, charset=utf-8'});
  res.write(data);
  res.end();
});server.listen(4000, () =>{
  console.log("Server is running on http://localhost:8001");
});