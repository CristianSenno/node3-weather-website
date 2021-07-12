const request = require("request");

const forecast = (longitude, latitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=febf5538c03e6134247ebe0c7d4b9fdd&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude); 

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect weather services!", undefined);
        } else if( body.error){
            callback("Unable to find location for weather forecast. Try another one.", undefined);
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + ". There are: " + body.current.temperature + " degrees, but it feels like: " + body.current.feelslike + " .There is " + body.current.humidity + "% of humidity out there!");
        } 
    });
};

module.exports = {
    forecast: forecast
};


/*const url = "http://api.weatherstack.com/current?access_key=febf5538c03e6134247ebe0c7d4b9fdd&query=-75.7088,44.1545&units=m";

request({ url: url, json: true }, (error, response) => {
     const data = JSON.parse(response.body);
    console.log(data.current); 
    //console.log(response.body.current);

    if(error){
        console.log("Unable to connect weather Service!");
    } else if(response.body.error){
        console.log("Unable to find location!");
    } else {
        console.log(response.body.current.weather_descriptions[0] + ". There are: " + response.body.current.temperature + " degrees, but it feels like: " + response.body.current.feelslike);
    }
   
});

 */